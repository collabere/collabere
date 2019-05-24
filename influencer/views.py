from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.db.transaction import atomic
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.views import generic
from django.views.generic import CreateView
import logging
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from braces.views import CsrfExemptMixin
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import  handleEmptyAbsentKey
import json
from django.views.decorators.csrf import csrf_exempt
from influencer.models import Influencer, ClientMapping

from .serializers import ClientMappingSerializer, InfluencerSerializer
from .service import getAllClientOfAnInfluencer, validateUsername, getInfluencerFromInfluencerUsername, getInfluencerFromInfluencerId, deleteInfluencerUsingInfluencerId, influencer_signup
from client import serializers

# Create your views here.
_logger = logging.getLogger(__name__)

@api_view(['GET'])
def getClientsBasedOnInfluencers(request):
    influencerUsername = request.GET.get('username')
    clients = getAllClientOfAnInfluencer(influencerUsername)
    return Response(serializers.ClientSerializer(clients, many=True).data)

@api_view(['GET'])
def getInfluencerDetails(request):
    influencerUsername = request.GET.get('username')
    influencer = getInfluencerFromInfluencerUsername(influencerUsername)
    return Response(InfluencerSerializer(influencer, many=True).data)

@api_view(['GET'])
def usernameFetch(request):
    username = request.GET.get('username')
    return Response(validateUsername(username))

@api_view(['DELETE'])
def deleteInfluencer(request, influencerId):
    try:
        delCount = deleteInfluencerUsingInfluencerId(influencerId)
        if delCount[0] > 0:
            return Response(True)
        else:
            return Response(False)
    except Influencer.DoesNotExist:
        return Response(False)

@api_view(['PUT'])
def putInfluencer(request):
    serializer = InfluencerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        serializer_dict = serializer.data
        serializer_dict["message"] = "Settings updated successfully."
        return Response(serializer_dict, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def handleLogin(request):
    jsonResponse = json.loads(request.body)
    request.session['username'] = jsonResponse['username']
    request.session['password'] = jsonResponse['password']
    user = authenticate(username=jsonResponse['username'], password=jsonResponse['password'])

    if user is not None:
        return Response(request.session['username'])
    else:
        return  Response(False)


@api_view(['POST'])
def handleRegisterInfluencer(request):
    jsonResponse= json.loads(request.body.decode('utf-8'))
    username = jsonResponse['username']
    password = jsonResponse['password']
    email = handleEmptyAbsentKey('email', jsonResponse)
    name = handleEmptyAbsentKey('name', jsonResponse)
    dob = handleEmptyAbsentKey('dob', jsonResponse)
    gender = handleEmptyAbsentKey('gender', jsonResponse)
    city = handleEmptyAbsentKey('city', jsonResponse)
    country = handleEmptyAbsentKey('country', jsonResponse)
    industry= handleEmptyAbsentKey('industry', jsonResponse)
    followerCount= handleEmptyAbsentKey('followerCount', jsonResponse)
    followingCount= handleEmptyAbsentKey('followingCount', jsonResponse)
    dpUrl=  handleEmptyAbsentKey('dpUrl', jsonResponse)

    influencer = influencer_signup(name,email,username,dob,gender,city,country, followerCount, followingCount,dpUrl,industry,password)

    if influencer is not None:
        return Response(True, status=status.HTTP_200_OK)
    else:
        return Response(False, status=status.HTTP_400_BAD_REQUEST)






