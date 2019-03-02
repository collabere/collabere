from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from conversations.models import Messages
from conversations.serializers import MessageSerializer
from .service import  getMessagesByResponderAndReciverId,getAllMessages, deleteAllMessagesBasedOnResponderAndReciverId
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

@api_view(['PUT'])
def insertMessages(request):
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        serializer_dict = serializer.data
        serializer_dict["message"] = "Settings updated successfully."
        return Response(serializer_dict, status=200)
    else:
        return Response(serializer.errors,status=400)