from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.views import generic
from django.views.generic import CreateView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from influencer.models import Influencer, ClientMapping

from django.urls import reverse_lazy
from .serializers import ClientMappingSerializer, InfluencerSerializer
from .service import getAllClientOfAnInfluencer, getInfluencerFromInfluencerId, deleteInfluencerUsingInfluencerId

# Create your views here.

@login_required
def home(request):
    return render(request,'influencer/home.html')

@api_view(['GET'])
def getClientsBasedOnInfluencers(request, influencerId):
    clients = getAllClientOfAnInfluencer(influencerId)
    return Response(ClientMappingSerializer(clients, many=True).data)

@api_view(['GET'])
def getInfluencerDetails(request, influencerId):
    influencer = getInfluencerFromInfluencerId(influencerId)
    return Response(InfluencerSerializer(influencer, many=True).data)
        

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


class CreateInfluencerView(CreateView):
     model = Influencer
     fields = ('name', 'email', 'handle', 'dob','gender','city','country')
     template_name = 'influencer/influencer_form.html'



class SignUp(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('influencer_login')
    template_name = 'influencer/influencer_signup_form.html'

