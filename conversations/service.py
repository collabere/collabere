from conversations.models import Messages
from django.db.transaction import atomic
from project.service import getProjectByProjectInitiationDate


# not used for now
def getMessagesByInfluencerUsername(influencerUsername):
    return Messages.objects.filter(influencerUsername=influencerUsername)


#not used for now
def getMessagesByInfluencerusernameAndClientId(influencerUsername, clientId):
    return Messages.objects.all().filter(influencerUsername=influencerUsername, clientId=clientId)

def getMessagesByProjectInitiationDate(projectInitiationDate):
    projectObject = getProjectByProjectInitiationDate(projectInitiationDate)
    return Messages.objects.all().filter(projectInitiationDate__in=projectObject)

def getMessagesByProjectInitiationDateForClientSide(projectInitiationDate):
    projectObject = getProjectByProjectInitiationDate(projectInitiationDate)
    return Messages.objects.all().filter(projectInitiationDate__in=projectObject,fromInfluencer=False)

def getAllMessages():
    return Messages.objects.all()


# not used for now
def deleteAllMessagesBasedOnResponderAndReciverId(reciverId, responderId):
    return Messages.objects.filter(responderId=responderId, reciverId=reciverId).delete()


@atomic
def saveMessages(influencerUsername, clientId, timestamp, message, fromInfluencer, projectInitiationDate):
    projectObject = list(getProjectByProjectInitiationDate(projectInitiationDate))[0]
    projectObject.latestText=message
    projectObject.save()
    messages = Messages.objects.create_message_object(influencerUsername, clientId, timestamp, message, fromInfluencer,projectObject)
    return messages
