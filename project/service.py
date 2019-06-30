from project.models import Project

def getProjectsByClientId(clientId):
    return Project.objects.filter(clientId=clientId)

def getProjectsByInfluencerUserName(influencerUserName):
    return Project.objects.filter(influencerUserName=influencerUserName)

def getProjectsByInfluencerUserNameAndClientId(influencerUserName, clientId):
    return Project.objects.filter(influencerUserName=influencerId, clientId=clientId)
