from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from client.models import Client
from influencer.serializers import ClientMappingSerializer
from .serializers import ClientSerializer, HomePageIntroEmailSerializer
from .service import getClientFromClientId, deleteClientUsingClientId, getAllHomePageIntroEmail, \
    checkPresenceOfClientByClientEmailId


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
        clientMapping = {}
        clientMapping["clientId"] = serializer_dict["uid"]
        clientMapping["influencerUsername"] = request.data["influencerUsername"]
        clientMappingSerializer = ClientMappingSerializer(data=clientMapping)
        if clientMappingSerializer.is_valid():
            clientMappingSerializer.save()
            clientMappingSerializer_dict = clientMappingSerializer.data
        serializer_dict["clientInfluencerMapping"] = clientMappingSerializer_dict
        print(serializer_dict)
        return Response(serializer_dict, status=200)
    else:
        return Response(serializer.errors, status=400)


@api_view(['POST'])
def insertHomePageIntoEmail(request):
    serializer = HomePageIntroEmailSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        serializer_dict = serializer.data
        serializer_dict["message"] = "Email Inserted Successfully."
        return Response(serializer_dict, status=200)
    else:
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def getAllHomePageIntroEmails(request):
    homePageIntroEmails = getAllHomePageIntroEmail()
    return Response(HomePageIntroEmailSerializer(homePageIntroEmails, many=True).data)


@api_view(['GET'])
def checkExistenceOfClient(request):
    clientEmail = request.GET.get('clientEmail')
    print(clientEmail)
    return Response(checkPresenceOfClientByClientEmailId(clientEmail))
