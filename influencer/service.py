from django.db.transaction import atomic
from django.contrib.auth.models import User

from influencer.models import Influencer, ClientMapping, InfluencerPublicProfileDetails, InstagramAuthModel, InfluencerAccessToken
from client import service

def getAllClientOfAnInfluencer(influencerUsername):
    clients=[]
    client_mappings=ClientMapping.objects.filter(influencerUsername=influencerUsername)
    for client_mapping in client_mappings:
        clients.extend(service.getClientFromClientId(client_mapping.clientId))
    return clients

def getInfluencerFromInfluencerEmail(email):
    return Influencer.objects.all().filter(email=email)

def getInfluencerFromInfluencerUsername(username):
    return Influencer.objects.all().filter(username=username)

def validateUsername(username):
    print(username)
    if Influencer.objects.all().filter(username=username):
        return True
    else:
        return False

def getInfluencerFromInfluencerId(influencerUsername):
    return Influencer.objects.filter(username=influencerUsername)

def deleteInfluencerUsingInfluencerId(influencerId):
    return Influencer.objects.filter(uid=influencerId).delete()

def getInfluencerPublicProfileDetailsFromInfuencerUsername(influencerUsername):
    influencer = getInfluencerFromInfluencerUsername(influencerUsername)
    print('Printing name here',influencer[0].username)
    return InfluencerPublicProfileDetails.objects.get(influencer=influencer[0])

@atomic
def influencer_signup(name,email,username,dob,gender,city,country, followerCount, followingCount,dpUrl,industry):
    user = User.objects.get(username=username)
    influencer = Influencer.objects.create_influencer(name,email,username,dob,gender,city,country, followerCount, followingCount,dpUrl,industry,user)
    return influencer

@atomic
def changePassword(username , newPassword):
     user = User.objects.get(username=username)
     user.set_password(newPassword)
     user.save()

def checkInstaramUserIdPresence(userId):
    try:
      instagramAuthModel= InstagramAuthModel.objects.get(instagramUserId=userId)
      return True
    except InstagramAuthModel.DoesNotExist:
      return False

def getInfluecerFromInstagramUserId(userId):
    return InstagramAuthModel.objects.get(instagramUserId=userId).influencer


def getAccessTokenBasedOnInfluencerId(userId):
    return InfluencerAccessToken.objects.get(instagramUserId=userId)

def getAccessTokenBasedOnInfluencerUserName(userName):
    return InfluencerAccessToken.objects.get(influencerUserName=userName)
