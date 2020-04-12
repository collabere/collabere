from datetime import datetime

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from conversations.service import saveMessages
from project.models import Project
from .serializers import ProjectSerializer
from client.service import *
from .service import getProjectsByClientId, getProjectsByInfluencerUserName, getProjectsByInfluencerUserNameAndClientId, getProjectByProjectInitiationDate, toggleProjectCompletetionStatus
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny



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
        client=getClientFromClientId(clientId).first()
        projectDetail["clientName"]=getattr(client, 'name')
        projectDetail["clientRating"]= getattr(client, 'rating')
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
    print(request.data['influencerUserName'])
    clientId= getattr(list(getClientByClientEmailId(request.data['email']))[0], 'uid')
    serializer.initial_data['clientId'] = clientId
    if serializer.is_valid():
        serializer.save()
        serializer_dict = serializer.data
        serializer_dict["message"] = "Project Inserted"
        saveMessages(serializer_dict['influencerUserName'], clientId, datetime.now(), request.data['introText'], False, serializer_dict['projectInitiationDate'])
        return Response(serializer_dict, status=200)
    else:
        return Response(serializer.errors, status=400)



@api_view(['GET'])
def deleteProject(request):
    project = getProjectByProjectInitiationDate(request.GET['project_initiation_date'])
    project.delete()
    return Response({"message": "Successfully Deleted"}, status=204)

class HandleProjectCompletedStatus(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        projectInitiationDate=request.GET.get('projectInitiationDate')
        try:
            toggleProjectCompletetionStatus(projectInitiationDate)
            return Response(status=200)
        except:
            return Response(status=400)



