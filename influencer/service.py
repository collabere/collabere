from django.db.transaction import atomic

from influencer.models import Influencer, ClientMapping

def getAllClientOfAnInfluencer(influencerId):
    return ClientMapping.objects.filter(influencerId=influencerId)

    
def getInfluencerFromInfluencerId(influencerId):
    return Influencer.objects.filter(uid=influencerId)

def deleteInfluencerUsingInfluencerId(influencerId):
    return Influencer.objects.filter(uid=influencerId).delete()


@atomic
def influencer_signup(name,email,username,dob,gender,city,country,password):
    influencer = Influencer.objects.create_influencer(name,email,username,dob,gender,city,country,password)

    return influencer

