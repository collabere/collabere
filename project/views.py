from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from project.models import Project
from .serializers import ProjectSerializer
from client.service import *
from .service import getProjectsByClientId, getProjectsByInfluencerUserName, getProjectsByInfluencerUserNameAndClientId, getProjectByProjectInitiationDate
from rest_framework.decorators import authentication_classes, permission_classes


@api_view(['GET'])
def getAllProjectsByClientId(request, clientId):
    projectDetails = getProjectsByClientId(clientId)
    print(projectDetails)
    return Response(ProjectSerializer(projectDetails, many=True).data)

@api_view(['GET'])
def getAllProjectsByInfluencerUserName(request, influencerUserName):
    projectDetails = getProjectsByInfluencerUserName(influencerUserName)
    projectSerializerData=ProjectSerializer(projectDetails, many=True).data
    for projectDetail in projectSerializerData:
        clientId=projectDetail['clientId']
        projectDetail["clientName"]=getattr(list(getClientFromClientId(clientId))[0], 'name')
    return Response(projectSerializerData)

@api_view(['GET'])
def getAllProjectsByClientIdAndInfluencerUserName(request, clientId, influencerUserName):
    projectDetails = getProjectsByInfluencerUserNameAndClientId(influencerUserName, clientId)
    return Response(ProjectSerializer(projectDetails, many=True).data)

@api_view(['PUT'])
@authentication_classes([])
@permission_classes([])
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



@api_view(['GET'])
def deleteProject(request):
    project = getProjectByProjectInitiationDate(request.GET['project_initiation_date'])
    project.delete()
    return Response({"message": "Successfully Deleted"}, status=204)

