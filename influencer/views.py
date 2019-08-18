import json
import logging

from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from rest_framework.decorators import api_view


from client import serializers
from influencer.models import Influencer
from .serializers import ClientMappingSerializer,CreateUserSerializer
from django.contrib.auth import get_user_model

from .service import getAllClientOfAnInfluencer, validateUsername, getInfluencerFromInfluencerUsername, \
    deleteInfluencerUsingInfluencerId, influencer_signup
from .utils import handleEmptyAbsentKey
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView

from rest_framework.permissions import AllowAny


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

@api_view(['PUT'])
def saveClientMappingWithInfluencer(request):
    serializer = ClientMappingSerializer(data=request.data)
    print(request.data)
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

class CreateUserAPIView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        jsonResponse = json.loads(request.body.decode('utf-8'))
        user_data = {}
        user_data["username"] = jsonResponse['username']
        user_data["password"] = jsonResponse['password']
        serializer = self.get_serializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        username = jsonResponse['username']
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
        influencer_signup(name, email, username, dob, gender, city, country, followerCount, followingCount,
                                       dpUrl, industry)
        headers = self.get_success_headers(serializer.data)
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}
        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)








