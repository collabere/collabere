from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from project.models import Project
from .serializers import ProjectSerializer
from client.service import *
from .service import getProjectsByClientId, getProjectsByInfluencerUserName, getProjectsByInfluencerUserNameAndClientId

@api_view(['GET'])
def getAllProjectsByClientId(request, clientId):
    projectDetails = getProjectsByClientId(clientId)
    print(projectDetails)
    return Response(ProjectSerializer(projectDetails, many=True).data)

@api_view(['GET'])
def getAllProjectsByInfluencerUserName(request, influencerUserName):
    projectDetails = getProjectsByInfluencerUserName(influencerUserName)
    return Response(ProjectSerializer(projectDetails, many=True).data)

@api_view(['GET'])
def getAllProjectsByClientIdAndInfluencerUserName(request, clientId, influencerUserName):
    projectDetails = getProjectsByInfluencerUserNameAndClientId(influencerUserName, clientId)
    return Response(ProjectSerializer(projectDetails, many=True).data)

@api_view(['PUT'])
def insertProject(request):
    serializer = ProjectSerializer(data=request.data)
    clientId= getattr(list(getClientByClientEmailId(request.data['email']))[0], 'uid')
    serializer.initial_data['clientId'] = clientId
    if serializer.is_valid():
        serializer.save()
        serializer_dict = serializer.data
        serializer_dict["message"] = "Project Inserted"
        return Response(serializer_dict, status=200)
    else:
        return Response(serializer.errors, status=400)
