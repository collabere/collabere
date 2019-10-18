from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from influencer.applicationConstants import INSTAGRAM
from influencer.service import checkInstaramUserIdPresence, getInfluecerFromInstagramUserId
from influencer.serializers import CreateUserSerializer, InstagramAuthModelSerializer
from influencer.models import Influencer, InstagramAuthModel
from django.contrib.auth.models import User
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
import requests
import string
import random


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key,
                     'username': username},
                    status=HTTP_200_OK)


@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def redirect(request):
    code = request.GET.get('code');
    data = {
        "client_id": "49f4a71ef28b448a864a7519a197ba0c",
        "client_secret": "db912bb77fd5472895e8e097191bb1a7",
        "grant_type": "authorization_code",
        "redirect_uri": "http://localhost:8000/api/social_redirect",
        "code": code
    }
    r = requests.post(url="https://api.instagram.com/oauth/access_token", data=data)
    response = r.json()
    instagramUserId = response['user']['id']
    doesInstagramIdExistFlag = checkInstaramUserIdPresence(instagramUserId)
    if doesInstagramIdExistFlag:
        influencer = getInfluecerFromInstagramUserId(instagramUserId)
        user = influencer.user
        username = influencer.username
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key,
                         'username': username},
                        status=HTTP_200_OK)
    else:
        user_data = {}
        randomPasswordString = ''.join(
            random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(10))
        user_data["username"] = response['user']['username']
        user_data["password"] =randomPasswordString
        serializer = CreateUserSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
        influencer=Influencer()
        influencer.user=User.objects.get(username= response['user']['username'])
        influencer.username= response['user']['username']
        influencer.sourceOfOnBoard= INSTAGRAM
        influencer.save()
        instagramAuthModel= InstagramAuthModel.objects.create(instagramUserId=response['user']['id'], influencer=influencer)
        token, _ = Token.objects.get_or_create(user=influencer.user)
        return Response({'token': token.key,
                         'username':  response['user']['username']},
                        status=HTTP_200_OK)
    # return HttpResponseRedirect("/")
