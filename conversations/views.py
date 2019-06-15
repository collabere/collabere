import json
from datetime import datetime

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework import status
from django.core.mail import send_mail
from client.service import *



from conversations.models import Messages
from conversations.serializers import MessageSerializer
from inclyfy import settings
from .service import  getMessagesByInfluencerusernameAndClientId,getAllMessages, deleteAllMessagesBasedOnResponderAndReciverId, saveMessages



def sendeEmailAsMessage(subject, message,clientEmail):
    subject = subject
    message = message
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [clientEmail]
    send_mail(subject, message, email_from, recipient_list )

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
    messages = saveMessages(influencerUsername, clientId,timestamp, message)

    if messages is not None:
        clientEmail = getattr(list(getClientFromClientId(clientId))[0], 'email')
        subject = 'Message from ' + influencerUsername
        sendeEmailAsMessage(subject, message, clientEmail)
        return Response(True, status=status.HTTP_200_OK)
    else:
        return Response(False, status=status.HTTP_400_BAD_REQUEST)

#not used for now
# @api_view(['PUT'])
# def insertMessages(request):
#     serializer = MessageSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         serializer_dict = serializer.data
#         serializer_dict["message"] = "Settings updated successfully."
#         return Response(serializer_dict, status=200)
#     else:
#         return Response(serializer.errors,status=400)