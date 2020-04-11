from client.models import Client, HomePageIntroEmail


def getClientFromClientId(clientId):
    return Client.objects.filter(uid=clientId)

def checkPresenceOfClientByClientEmailId(clientEmailId):
    if Client.objects.filter(email=clientEmailId):
        return True
    else:
        return False


#TODO: return .first here instead of querry set array ,also remove .frst() eslewhere in views
def getClientByClientEmailId(clientEmailId):
    return Client.objects.filter(email=clientEmailId)

def deleteClientUsingClientId(clientId):
    return Client.objects.filter(uid=clientId).delete()

def getAllHomePageIntroEmail():
    return HomePageIntroEmail.objects.all();

def getClientInfoByEmail():
    return Client.objects.filter(email=email)
    
def getClientIdByClientEmailId(clientEmailId):
    return getattr(list(getClientByClientEmailId(clientEmailId))[0], 'uid')

def updateClientRating(clientEmailId, rating):
    client = getClientByClientEmailId(clientEmailId).first()
    currentRating= getattr(client, 'rating')  # getattr(x, 'y') is equivalent to x.y.
    if currentRating is None:
        client.rating = float(rating)
    else:
        client.rating= (float(rating)+currentRating)/2
    client.save()
