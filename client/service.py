from client.models import Client, HomePageIntroEmail


def getClientFromClientId(clientId):
    return Client.objects.filter(id=clientId)

def deleteClientUsingClientId(clientId):
    return Client.objects.filter(uid=clientId).delete()

def getAllHomePageIntroEmail():
    return HomePageIntroEmail.objects.all();