import json
import mimetypes
import os
from datetime import datetime
import random

from django.core.mail import EmailMultiAlternatives
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView

from client.emailReadService import read_email_from_gmail
from client.service import *
from conversations.models import Messages
from conversations.serializers import MessageSerializer, FileSerializer
from conversations.utils import uploadToAwsBucket
from inclyfy import settings
from .service import getMessagesByInfluencerusernameAndClientId, getAllMessages, \
    deleteAllMessagesBasedOnResponderAndReciverId, saveMessages, getMessagesByProjectInitiationDate, \
    getMessagesByProjectInitiationDateForClientSide, analyzeConversationSentiment, updateMessageStatus, getAllUnreadMessagesCount
from rest_framework.decorators import authentication_classes, permission_classes


def sendEmailAsMessage(subject, message, clientEmail):
    subject = subject
    message = message
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [clientEmail]
    print(clientEmail)
    send_mail(subject, message, email_from, recipient_list )

class FileUploadView(APIView):
    parser_class = (FileUploadParser,)
    def post(self, request, *args, **kwargs):
        jsonResponse = request.data
        influencerUsername = jsonResponse['influencerUsername']
        clientId = jsonResponse['clientId']
        timestamp = datetime.now()
        projectInitiationDate = jsonResponse['projectInitiationDate']
        email_from = settings.EMAIL_HOST_USER
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            clientEmail = getattr(list(getClientFromClientId(clientId))[0], 'email')
            subject = 'File from ' + influencerUsername + " for the project started on " + projectInitiationDate + ' on Collabere'
            msg = EmailMultiAlternatives(subject, 'Please find the below file ', email_from, [clientEmail])
            file = request.FILES['file']
            open(file.name, 'wb+').write(file.read())
            fileObject = open(file.name, 'r')
            uploadToAwsBucket(fileObject)
            os.remove(file.name)
            msg.attach(file.name, file.file.getvalue(), mimetypes.guess_type(file.name)[0])
            msg.send()
            fileUrl = settings.FILE_URL_PREFIX + file.name
            saveMessages(influencerUsername, getClientIdByClientEmailId(clientEmail), timestamp,
                                   fileUrl, True, projectInitiationDate, False)
            return Response({'file': file.name, 'timestamp': timestamp}, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getAllMessagesByInfluencerUsernameAndClientId(request):
    influencer_username = request.GET.get('influencer_username')
    client_id = request.GET.get('client_id')
    messages = getMessagesByInfluencerusernameAndClientId(influencer_username, client_id)
    return Response(MessageSerializer(messages, many=True).data)


@api_view(['GET'])
def getAll(request):
    messages = getAllMessages()
    return Response(MessageSerializer(messages, many=True).data)


@api_view(['GET'])
def getMessagesPertainingToAProject(request):
    messages = getMessagesByProjectInitiationDate(request.GET.get("projectInitiationDate"))
    return Response(MessageSerializer(messages, many=True).data)


@api_view(['DELETE'])
def deleteMessages(request, reciverId, responderId):
    try:
        delCount = deleteAllMessagesBasedOnResponderAndReciverId(reciverId, responderId)
        if delCount[0] > 0:
            return Response(True)
        else:
            return Response(False)
    except Messages.DoesNotExist:
        return Response(False)


@api_view(['POST'])
def insertMessages(request):
    jsonResponse = json.loads(request.body.decode('utf-8'))

    influencerUsername = jsonResponse['influencerUsername']
    clientId = jsonResponse['clientId']
    timestamp = datetime.now()
    message = jsonResponse['message']
    projectInitiationDate = jsonResponse['projectInitiationDate']
    fromInfluencer = jsonResponse['fromInfluencer']
    messages = saveMessages(influencerUsername, clientId, timestamp, message, fromInfluencer, projectInitiationDate, False)

    if messages is not None:
        clientEmail = getattr(list(getClientFromClientId(clientId))[0], 'email')
        subject = 'Message from ' + influencerUsername + " for the project started on " + projectInitiationDate + ' on Collabere'
        try:
            sendEmailAsMessage(subject, message, clientEmail)
            return Response({'inserted': True, 'timestamp': messages.timestamp}, status=status.HTTP_200_OK)
        except:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(False, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def insertMessageFromClientEamil(request):
    projectInitiationDate = request.GET.get('projectInitiationDate')
    if read_email_from_gmail(projectInitiationDate) == False:
        return Response(False, status=status.HTTP_200_OK)
    else:
        influencerUsername, clientEmailId, message, emailArrivalDateTime = read_email_from_gmail(projectInitiationDate)
        messages = getMessagesByProjectInitiationDateForClientSide(projectInitiationDate)

        if (len(messages) > 0):
            lastMessageTimeStamp = messages[len(messages) - 1].timestamp
        else:
            lastMessageTimeStamp = None
        if lastMessageTimeStamp != emailArrivalDateTime:
            message = saveMessages(influencerUsername, getClientIdByClientEmailId(clientEmailId), emailArrivalDateTime,
                                   message, False, projectInitiationDate, False)
            if message is not None:
                return Response(True, status=status.HTTP_200_OK)
            else:
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(False, status=status.HTTP_200_OK)


@api_view(['POST'])
def updateMessageState(request):
    jsonResponse = json.loads(request.body.decode('utf-8'))
    updateMessageStatus(jsonResponse['projectInitiationDate'])
    print(jsonResponse)
    return Response(False, status=status.HTTP_200_OK)

@api_view(['GET'])
def getAllUnreadMessagesByProjects(request):
    influencerUsername = request.GET.get('username')
    return Response(getAllUnreadMessagesCount(influencerUsername))

@api_view(['GET'])
def returnConversationSentiment(request):
    projectInitiationDate = request.GET.get('projectInitiationDate')
    try:
        response = analyzeConversationSentiment(projectInitiationDate)
        return Response(response, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
