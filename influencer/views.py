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
from django.views import View
from influencer import  forms
from rest_framework.decorators import api_view
from rest_framework.response import Response

from influencer.forms import InfluencerSignupForm
from influencer.models import Influencer, ClientMapping

from django.urls import reverse_lazy, reverse
from .serializers import ClientMappingSerializer, InfluencerSerializer
from .service import getAllClientOfAnInfluencer, getInfluencerFromInfluencerUsername, getInfluencerFromInfluencerId, deleteInfluencerUsingInfluencerId
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
    request.session['username'] = request.POST.get('username')
    influencerDetails = getInfluencerFromInfluencerUsername(request.session['username'])
    
    return Response('This is spartaa again!!!!')

class SignUp(View):
    __template = 'influencer/influencer_signup_form.html'
    # __agency_url = settings.FRONTEND_CONFIG["AGENCY"]["LOGIN_SUCCESS_REDIRECT_URL"]

    def get(self, request):
        _logger.debug("agency signup form requested")
        form = ()
        return render(request, self.__template, {'form': form})

    @atomic
    def post(self, request):
        _logger.debug("agency signup form submitted with username: >%s<", request.POST.get('username','<blank>'))
        form = InfluencerSignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            if user is not None:
                _logger.debug("user %s signed up successfully", user)
                print("ffffffffffffffdsjv")
                return redirect(reverse('signup_success'))
        _logger.debug("agency signup form invalid")
        return render(request, self.__template, {'form': form})


def signup_success(request):
    print("fffffqaz")
    return render(request, 'influencer/signup_success.html')


