from client.models import Client, HomePageIntroEmail


def getClientFromClientId(clientId):
    return Client.objects.filter(uid=clientId)

def checkPresenceOfClientByClientEmailId(clientEmailId):
    if Client.objects.filter(email=clientEmailId):
        return True
    else:
        return False
def getClientByClientEmailId(clientEmailId):
    return Client.objects.filter(email=clientEmailId)

def deleteClientUsingClientId(clientId):
    return Client.objects.filter(uid=clientId).delete()

def getAllHomePageIntroEmail():
    return HomePageIntroEmail.objects.all();

def getClientIdByClientEmailId(clientEmailId):
    return getattr(list(getClientByClientEmailId(clientEmailId))[0], 'uid')