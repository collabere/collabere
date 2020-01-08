from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
import requests
from django.utils import timezone

from influencer.service import checkInstaramUserIdPresence, getInfluecerFromInstagramUserId
from influencer.serializers import CreateUserSerializer
from influencer.models import Influencer, InstagramAuthModel
from influencer.applicationConstants import INSTAGRAM

from django.contrib.auth.models import User
import datetime
from django.utils.timezone import utc
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import HttpResponse
import json
import random
import string


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
    token, created =  Token.objects.get_or_create(user=user)

    utc_now = timezone.now()
    if not created and token.created < utc_now - datetime.timedelta(hours=24):
        token.delete()
        token = Token.objects.create(user=user)
        token.created = datetime.datetime.utcnow()
        token.save()

    #return Response({'token': token.key})
    response_data = {'token': token.key,'username': user.username}
    return HttpResponse(json.dumps(response_data), content_type="application/json")
                    

@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def redirect(request):
    code = request.GET.get('code')
    data = {
        "client_id": "49f4a71ef28b448a864a7519a197ba0c",
        "client_secret": "db912bb77fd5472895e8e097191bb1a7",
        "grant_type": "authorization_code",
        "redirect_uri": "http://www.collabere.com/api/social_redirect",
        "code": code
    }
    r = requests.post(url="https://api.instagram.com/oauth/access_token", data=data)
    response = r.json()
    instagramUserId = response['user']['id']
    doesInstagramIdExistFlag = checkInstaramUserIdPresence(instagramUserId)
    response_data = {}
    if doesInstagramIdExistFlag:
        influencer = getInfluecerFromInstagramUserId(instagramUserId)
        user = influencer.user
        username = influencer.username
        token, _ = Token.objects.get_or_create(user=user)
        response_data = {'token': token.key,'username': user.username}
    # check username exists in db or not

    # if Not exist create django USer and redirect to login
    # 
    # else refer login view fun by fetching user details
    else:
        user_data = {}
        randomPasswordString = ''.join(
            random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(10))
        user_data["username"] = response['user']['username']
        user_data["password"] = randomPasswordString
        serializer = CreateUserSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
        influencer = Influencer()
        influencer.user = User.objects.get(username= response['user']['username'])
        influencer.username = response['user']['username']
        influencer.sourceOfOnBoard = INSTAGRAM
        influencer.save()
        instagramAuthModel = InstagramAuthModel.objects.create(instagramUserId=response['user']['id'], influencer=influencer)
        token, _ = Token.objects.get_or_create(user=influencer.user)
        response_data = {'token': token.key,'username': influencer.username}
    return HttpResponseRedirect("/clients/"+response['user']['username'])
