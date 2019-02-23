from influencer.models import Influencer, ClientMapping

def getAllClientOfAnInfluencer(influencerId):
    return ClientMapping.objects.filter(influencerId=influencerId)

    
def getInfluencerFromInfluencerId(influencerId):
    return Influencer.objects.filter(uid=influencerId)

def deleteInfluencerUsingInfluencerId(influencerId):
    return Influencer.objects.filter(uid=influencerId).delete()
