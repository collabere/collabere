import json
import logging
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from rest_framework.decorators import api_view
from inclyfy import settings
from django.core.mail import send_mail
from rest_framework.parsers import JSONParser

from client import serializers
from influencer.models import Influencer, InfluencerPublicProfileDetails, InfluencerAccessToken
from .serializers import ClientMappingSerializer, CreateUserSerializer, InfluencerSerializer, \
    InfluencerPublicProfileDetailsSerializer, AccessTokenSerializer
from django.contrib.auth import get_user_model

from .service import getAllClientOfAnInfluencer, validateUsername, getInfluencerFromInfluencerUsername, \
    deleteInfluencerUsingInfluencerId, influencer_signup, changePassword, getInfluencerFromInfluencerEmail, \
    getInfluencerPublicProfileDetailsFromInfuencerUsername, getAccessTokenBasedOnInfluencerId, getAccessTokenBasedOnInfluencerUserName
from .utils import handleEmptyAbsentKey, getCustomObjectFromQuerrySet
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from influencer.applicationConstants import *
from rest_framework.parsers import FileUploadParser
import os
from conversations.utils import uploadToAwsProfilePicBucket
from django.http import JsonResponse

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
@authentication_classes([])
@permission_classes([])
def getInfluencerPublicDetails(request):
    influencerUsername = request.GET.get('username')
    influencerPublicDetails = getInfluencerPublicProfileDetailsFromInfuencerUsername(influencerUsername)
    return Response(InfluencerPublicProfileDetailsSerializer(influencerPublicDetails).data)


@api_view(['PUT'])
@authentication_classes([])
@permission_classes([])
def updateInfluencerPublicDetails(request):
    data = JSONParser().parse(request)
    influencerUsername = data['username']
    try:
        influencerPublicDetails = getInfluencerPublicProfileDetailsFromInfuencerUsername(influencerUsername)
    except InfluencerPublicProfileDetails.DoesNotExist:
        influencer = getCustomObjectFromQuerrySet(getInfluencerFromInfluencerUsername(influencerUsername))
        influencerPublicDetails = InfluencerPublicProfileDetails()
        influencerPublicDetails.influencer = influencer
    serializer = InfluencerPublicProfileDetailsSerializer(influencerPublicDetails, data=data)
    if serializer.is_valid():
        serializer.save()
        serializer_dict = serializer.data
        serializer_dict["message"] = "Settings updated successfully."
        return Response(serializer_dict, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getInfluencerWithEmail(request):
    influencerEmail = request.GET.get('email')
    influencer = getInfluencerFromInfluencerEmail(influencerEmail)
    return Response(InfluencerSerializer(influencer, many=True).data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def usernameFetch(request):
    username = request.GET.get('username')
    return Response(validateUsername(username))

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getAccessToken(request):
    influencerUserName = request.GET.get('username')
    # accessTokenDetails = getAccessTokenBasedOnInfluencerId(influencerUserId)
    accessTokenDetails = getAccessTokenBasedOnInfluencerUserName(influencerUserName)
    return Response(AccessTokenSerializer(accessTokenDetails).data)


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
    data = JSONParser().parse(request)
    influencer = getInfluencerFromInfluencerUsername(data['username']).first()
    serializer = InfluencerSerializer(influencer, data=data)
    if serializer.is_valid():
        serializer.save()
        serializer_dict = serializer.data
        serializer_dict["message"] = "Settings updated successfully."
        return Response(serializer_dict, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def handleLogin(request):
    jsonResponse = json.loads(request.body)
    request.session['username'] = jsonResponse['username']
    request.session['password'] = jsonResponse['password']
    user = authenticate(username=jsonResponse['username'], password=jsonResponse['password'])

    if user is not None:
        return Response(request.session['username'])
    else:
        return Response(False)


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
        industry = handleEmptyAbsentKey('industry', jsonResponse)
        followerCount = handleEmptyAbsentKey('followerCount', jsonResponse)
        followingCount = handleEmptyAbsentKey('followingCount', jsonResponse)
        dpUrl = handleEmptyAbsentKey('dpUrl', jsonResponse)
        influencer= influencer_signup(name, email, username, dob, gender, city, country, followerCount, followingCount,
                          dpUrl, industry)
        headers = self.get_success_headers(serializer.data)
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}
        InfluencerPublicProfileDetails.objects.create(influencer=influencer,
                                                      profilePicUrl=None)
        InfluencerAccessToken.objects.update_or_create(instagramUserId=None,
                                                       influencerUserName=username,
                                                       accessToken=token)

        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


@api_view(['PUT'])
@authentication_classes([])
@permission_classes([])
def changePasswordInboundUsername(request, format=None):
    jsonResponse = json.loads(request.body.decode('utf-8'))
    username = jsonResponse[INFLUENCER_USERNAME]
    newPassword = jsonResponse[NEW_PASSWORD]
    changePassword(username, newPassword)
    return Response(status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([])
@permission_classes([])
def sendEmailToResetPassword(request):
    jsonResponse = json.loads(request.body.decode('utf-8'))
    influencerEmail = jsonResponse[INFLUENCER_EMAIL]
    try:
        influencer = getInfluencerFromInfluencerEmail(influencerEmail)
        influencerUsername = getattr(influencer[0], 'username')
        associatedDjangoUsername = getattr(influencer[0], 'user')
        user = User.objects.get(username=associatedDjangoUsername)
        token, _ = Token.objects.get_or_create(user=user)
        subject = EMAIL_SUBJECT
        message = EMAIL_MESSAGE_STRING + " " + COLLABERE_PASSWORD_RESET_URL + influencerUsername + SLASH + str(token)
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [influencerEmail]
        send_mail(subject, message, email_from, recipient_list)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class ProfilePictureUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        jsonResponse =  request.data
        file = request.FILES['file']
        influencerUsername = jsonResponse[INFLUENCER_USERNAME]
        try:
            open(file.name, 'wb+').write(file.read())
            fileObject = open(file.name, 'r')
            uploadToAwsProfilePicBucket(fileObject)
            os.remove(file.name)
            fileUrl = settings.PROFILE_PIC_FILE_URL_PREFIX + file.name
            try:
                influencerPublicDetails = getInfluencerPublicProfileDetailsFromInfuencerUsername(influencerUsername)
                influencerPublicDetails.profilePicUrl = fileUrl
                influencerPublicDetails.save()
            except InfluencerPublicProfileDetails.DoesNotExist:
                influencer = getCustomObjectFromQuerrySet(getInfluencerFromInfluencerUsername(influencerUsername))
                influencerPublicDetails = InfluencerPublicProfileDetails()
                influencerPublicDetails.influencer = influencer
                influencerPublicDetails.profilePicUrl = fileUrl
                influencerPublicDetails.save()

            return JsonResponse({'profilePicUrl': fileUrl, 'influencerUsername': influencerUsername},
                                status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
