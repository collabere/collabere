import random
from rest_framework.decorators import api_view
from rest_framework.response import Response
from client.models import Client
from influencer.serializers import ClientMappingSerializer
from .serializers import ClientSerializer, HomePageIntroEmailSerializer
from .service import getClientFromClientId, deleteClientUsingClientId, getAllHomePageIntroEmail, \
    checkPresenceOfClientByClientEmailId, getClientInfoByEmail, getClientByClientEmailId
from rest_framework.decorators import authentication_classes, permission_classes
from conversations.views import sendEmailAsMessage
import string
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


# Create your views here.

@api_view(['GET'])
def getClientInfoFromClientId(request, clientId):
    clientInfo = getClientFromClientId(clientId)
    return Response(ClientSerializer(clientInfo, many=True).data)


@api_view(['DELETE'])
def deleteClientInfo(request, clientId):
    try:
        delCount = deleteClientUsingClientId(clientId)
        if delCount[0] > 0:
            return Response(True)
        else:
            return Response(False)
    except Client.DoesNotExist:
        return Response(False)


@api_view(['PUT'])
@authentication_classes([])
@permission_classes([])
def insertClient(request):
    randomUpdatePassPhrase = ''.join(
        random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(10))
    serializer = ClientSerializer(data=request.data)
    if serializer.is_valid():
        try:
            subject = 'Welcome to collabere!'
            message = "Thanks for registering as a client ,your password to update details in future is " + randomUpdatePassPhrase
            clientEmail = request.data['email']
            sendEmailAsMessage(subject, message, clientEmail)
        except:
            return Response(serializer.errors, status=400)
        serializer.save(updatePassPhrase=randomUpdatePassPhrase)
        serializer_dict = serializer.data
        serializer_dict["message"] = "Settings updated successfully."
        clientMapping = {}
        clientMapping["clientId"] = serializer_dict["uid"]
        clientMapping["influencerUsername"] = request.data["influencerUsername"]
        clientMappingSerializer = ClientMappingSerializer(data=clientMapping)
        if clientMappingSerializer.is_valid():
            clientMappingSerializer.save()
            clientMappingSerializer_dict = clientMappingSerializer.data
        else:
            return Response(clientMappingSerializer.errors, status=400)
        serializer_dict["clientInfluencerMapping"] = clientMappingSerializer_dict
        return Response(serializer_dict, status=200)
    else:
        return Response(serializer.errors, status=400)


class ValidatePassPhrase(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        jsonResponse = request.data
        updatePassPhrase = jsonResponse['updatePassPhrase']
        clientPassPhrase = getattr(list(getClientByClientEmailId(jsonResponse['email']))[0], 'updatePassPhrase')
        if clientPassPhrase == updatePassPhrase:
            return Response(True, status=200)
        else:
            return Response(False, status=400)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def insertHomePageIntoEmail(request):
    serializer = HomePageIntroEmailSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        serializer_dict = serializer.data
        serializer_dict["message"] = "Email Inserted Successfully."
        return Response(serializer_dict, status=200)
    else:
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def getAllHomePageIntroEmails(request):
    homePageIntroEmails = getAllHomePageIntroEmail()
    return Response(HomePageIntroEmailSerializer(homePageIntroEmails, many=True).data)


@api_view(['GET'])
def getClientByEmail(request, email):
    clientInfo = getClientInfoByEmail(email)
    return Response(ClientSerializer(clientInfo, many=True).data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def checkExistenceOfClient(request):
    clientEmail = request.GET.get('clientEmail')
    print(clientEmail)
    return Response(checkPresenceOfClientByClientEmailId(clientEmail))
