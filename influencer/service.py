from django.db.transaction import atomic
from django.contrib.auth.models import User

from influencer.models import Influencer, ClientMapping
from client import  service

def getAllClientOfAnInfluencer(influencerUsername):
    clients=[]
    client_mappings=ClientMapping.objects.filter(influencerUsername=influencerUsername)
    for client_mapping in client_mappings:
        clients.extend(service.getClientFromClientId(client_mapping.clientId))
    return clients

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

