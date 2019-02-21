from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render
from django.views import generic
from django.views.generic import CreateView
from rest_framework.decorators import api_view
from rest_framework.response import Response

from influencer.models import Influencer, ClientMapping
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

@api_view(['GET', 'DELETE'])
def getInfluencerDetails(request, influencerId):
    if request.method == 'GET':
        influencer = getInfluencerFromInfluencerId(influencerId)
        return Response(InfluencerSerializer(influencer, many=True).data)
    elif request.method == 'DELETE':
        try:
            delCount = deleteInfluencerUsingInfluencerId(influencerId)
            if delCount > 0:
                return True
            else:
                return False
        except Influencer.DoesNotExist:
            return False


class CreateInfluencerView(CreateView):

     model = Influencer
     fields = ('name', 'email', 'handle', 'dob','gender','city','country')
     template_name = 'influencer/influencer_form.html'



