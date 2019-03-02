from django.db.transaction import atomic

from influencer.models import Influencer, ClientMapping
from client import  service

def getAllClientOfAnInfluencer(influencerId):
    clients=[]
    client_mappings=ClientMapping.objects.filter(influencerId=influencerId)
    for client_mapping in client_mappings:
        clients.extend(service.getClientFromClientId(client_mapping.clientId))
    return clients


    
def getInfluencerFromInfluencerId(influencerId):
    return Influencer.objects.filter(uid=influencerId)

def deleteInfluencerUsingInfluencerId(influencerId):
    return Influencer.objects.filter(uid=influencerId).delete()


@atomic
def influencer_signup(name,email,username,dob,gender,city,country,password):
    influencer = Influencer.objects.create_influencer(name,email,username,dob,gender,city,country,password)

    return influencer

