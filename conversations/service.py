from conversations.models import Messages
from django.db.transaction import atomic
from project.service import getProjectByProjectInitiationDate
from django.db.models import Count

from conversations.constants import SENTINIZER_URL
import requests
import json

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

def updateMessageStatus(projectInitiationDate):
    projectObject = getProjectByProjectInitiationDate(projectInitiationDate)
    messageObj = Messages.objects.all().filter(projectInitiationDate__in=projectObject).update(isRead = True)
    return True

# not used for now
def deleteAllMessagesBasedOnResponderAndReciverId(reciverId, responderId):
    return Messages.objects.filter(responderId=responderId, reciverId=reciverId).delete()


@atomic
def saveMessages(influencerUsername, clientId, timestamp, message, fromInfluencer, projectInitiationDate, isRead):
    projectObject = list(getProjectByProjectInitiationDate(projectInitiationDate))[0]
    projectObject.latestText=message
    projectObject.save()
    messages = Messages.objects.create_message_object(influencerUsername, clientId, timestamp, message, fromInfluencer,projectObject, isRead)
    return messages


def getAllUnreadMessagesCount(influencerUsername):
    print(influencerUsername)
    print(Messages.objects.all().values('projectInitiationDate').annotate(total=Count('projectInitiationDate')).filter(isRead=True, influencerUsername=influencerUsername))
    return Messages.objects.all().values('projectInitiationDate').annotate(total=Count('projectInitiationDate')).filter(isRead=False, influencerUsername=influencerUsername)

def analyzeConversationSentiment(projectInitiationDate):
    allMessageObjects=getMessagesByProjectInitiationDate(projectInitiationDate)
    messages= map(lambda x: getattr(x,'message'), allMessageObjects)
    string = ' '.join(messages)
    data={"text": string}
    r=requests.post(SENTINIZER_URL, json=data)
    return r.json()

