from client.models import Client

def getClientFromClientId(clientId):
    return Client.objects.filter(id=clientId)