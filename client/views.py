from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from client.models import Client
from .serializers import ClientSerializer
from .service import getClientFromClientId, deleteClientUsingClientId
# Create your views here.

@api_view(['GET'])
def getClientInfoFromClientId(request, clientId):
    clientInfo = getClientFromClientId(clientId)
    return Response(ClientSerializer(clientInfo, many=True).data)

@api_view(['DELETE'])
def deleteClientInfo(request, clientId):
    try:
        delCount = deleteClientUsingClientId(clientId)
        if delCount[0] > 0:
            return Response(True)
        else:
            return Response(False)
    except Client.DoesNotExist:
        return Response(False)

@api_view(['PUT'])
def insertClient(request):
    serializer = ClientSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        serializer_dict = serializer.data
        serializer_dict["message"] = "Settings updated successfully."
        return Response(serializer_dict, status=200)
    else:
        return Response(serializer.errors,status=400)
