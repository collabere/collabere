from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from conversations.models import Messages
from conversations.serializers import MessageSerializer
from .service import  getMessagesByResponderAndReciverId,getAllMessages
# Create your views here.



@api_view(['GET' ])
def getMessagesByResponderIdAndReciverId(request, reciver_id, responder_id):
    messages = getMessagesByResponderAndReciverId(reciver_id,responder_id)
    print(responder_id)
    print("sjbfhhjebf")
    return Response(MessageSerializer(messages, many=True).data)

@api_view(['GET' ])
def getAll(request):
    messages=getAllMessages()
    print(messages)
    return Response(MessageSerializer(messages,many=True).data)