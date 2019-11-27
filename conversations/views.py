import json
from datetime import datetime
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework import status
from django.core.mail import send_mail
from client.emailReadService import read_email_from_gmail
from client.service import *
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser

from conversations.models import Messages
from conversations.serializers import MessageSerializer, FileSerializer
from inclyfy import settings
from .service import  getMessagesByInfluencerusernameAndClientId,getAllMessages, deleteAllMessagesBasedOnResponderAndReciverId, saveMessages,getMessagesByProjectInitiationDate, getMessagesByProjectInitiationDateForClientSide



def sendeEmailAsMessage(subject, message,clientEmail):
    subject = subject
    message = message
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [clientEmail]
    print(clientEmail)
    send_mail(subject, message, email_from, recipient_list )

class FileUploadView(APIView):
    parser_class = (FileUploadParser,)
    def post(self, request, *args, **kwargs):
      file_serializer = FileSerializer(data=request.data)
      if file_serializer.is_valid():
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)     

@api_view(['GET' ])
def getAllMessagesByInfluencerUsernameAndClientId(request):
    influencer_username=request.GET.get('influencer_username')
    client_id = request.GET.get('client_id')
    print(influencer_username)
    print(client_id)
    messages = getMessagesByInfluencerusernameAndClientId(influencer_username,client_id)
    return Response(MessageSerializer(messages, many=True).data)

@api_view(['GET' ])
def getAll(request):
    messages=getAllMessages()
    return Response(MessageSerializer(messages,many=True).data)

@api_view(['GET' ])
def getMessagesPertainingToAProject(request):
    messages =  getMessagesByProjectInitiationDate(request.GET.get("projectInitiationDate"))
    print(messages)
    return Response(MessageSerializer(messages,many=True).data)

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
    jsonResponse= json.loads(request.body.decode('utf-8'))
    influencerUsername = jsonResponse['influencerUsername']
    clientId = jsonResponse['clientId']
    timestamp= datetime.now()
    message = jsonResponse['message']
    projectInitiationDate=jsonResponse['projectInitiationDate']
    fromInfluencer=jsonResponse['fromInfluencer']
    messages = saveMessages(influencerUsername, clientId,timestamp, message,fromInfluencer, projectInitiationDate)

    if messages is not None:
        clientEmail = getattr(list(getClientFromClientId(clientId))[0], 'email')
        subject = 'Message from ' + influencerUsername + " for the project started on " + projectInitiationDate + ' on Collabere'
        sendeEmailAsMessage(subject, message, clientEmail)
        return Response(True, status=status.HTTP_200_OK)
    else:
        return Response(False, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def insertMessageFromClientEamil(request):
    projectInitiationDate = request.GET.get('projectInitiationDate')
    if read_email_from_gmail(projectInitiationDate)==False:
       return Response(False, status=status.HTTP_200_OK)
    else:
        influencerUsername,clientEmailId,message,emailArrivalDateTime=read_email_from_gmail(projectInitiationDate)
        messages=getMessagesByProjectInitiationDateForClientSide(projectInitiationDate)

        if(len(messages)>0):
            lastMessageTimeStamp = messages[len(messages) - 1].timestamp
        else:
            lastMessageTimeStamp=None
        if lastMessageTimeStamp!=emailArrivalDateTime:
            message=saveMessages(influencerUsername,getClientIdByClientEmailId(clientEmailId),emailArrivalDateTime,message,False,projectInitiationDate)
            if message is not None:
                return Response(True, status=status.HTTP_200_OK)
            else:
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(False, status=status.HTTP_200_OK)
