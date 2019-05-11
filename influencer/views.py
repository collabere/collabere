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

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import  handleEmptyAbsentKey
import json

from influencer.models import Influencer, ClientMapping

from .serializers import ClientMappingSerializer, InfluencerSerializer
from .service import getAllClientOfAnInfluencer, validateUsername, getInfluencerFromInfluencerUsername, getInfluencerFromInfluencerId, deleteInfluencerUsingInfluencerId, influencer_signup
from client import serializers

# Create your views here.
_logger = logging.getLogger(__name__)
@login_required
def home(request):
    return render(request,'influencer/home.html')

@api_view(['GET'])
def getClientsBasedOnInfluencers(request, influencerId):
    clients = getAllClientOfAnInfluencer(influencerId)
    return Response(serializers.ClientSerializer(clients, many=True).data)

@api_view(['GET'])
def getInfluencerDetails(request, influencerId):
    influencer = getInfluencerFromInfluencerId(influencerId)
    return Response(InfluencerSerializer(influencer, many=True).data)

# @api_view(['GET'])
def getInfluencerDetailsByUsername(username):
    influencer = getInfluencerFromInfluencerUsername(username)
    return InfluencerSerializer(influencer, many=True).data
        

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
    influencerDetails = getInfluencerFromInfluencerUsername(request.session['username'], request.session['password'])
    print(influencerDetails.id)
    if influencerDetails:
        return Response(InfluencerSerializer(influencerDetails).data)
    else:
        return Response(InfluencerSerializer(influencerDetails).error)


@api_view(['POST'])
def handleRegisterInfluencer(request):
    jsonResponse= json.loads(request.body.decode('utf-8'))
    responseSerializer = InfluencerSerializer(data=jsonResponse)
    print(jsonResponse['name'])
    name = jsonResponse['name']
    password = jsonResponse['password']
    email = handleEmptyAbsentKey('email', jsonResponse)
    username = handleEmptyAbsentKey('username', jsonResponse)
    dob = handleEmptyAbsentKey('dob', jsonResponse)
    gender = handleEmptyAbsentKey('gender', jsonResponse)
    city = handleEmptyAbsentKey('city', jsonResponse)
    country = handleEmptyAbsentKey('country', jsonResponse)
    industry= handleEmptyAbsentKey('industry', jsonResponse)
    followerCount= handleEmptyAbsentKey('followerCount', jsonResponse)
    followingCount= handleEmptyAbsentKey('followingCount', jsonResponse)
    dpUrl=  handleEmptyAbsentKey('dpUrl', jsonResponse)
    influencer_signup(name,email,username,dob,gender,city,country, followerCount, followingCount,dpUrl,industry,password)

    if responseSerializer.is_valid():
        return Response(responseSerializer.data, status=status.HTTP_201_CREATED)

    else:
        return Response(responseSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def usernameFetch(request):
    username = request.GET.get('username')
    return Response(validateUsername(username))

