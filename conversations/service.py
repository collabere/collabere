from conversations.models import Messages
from django.db.transaction import atomic


# not used for now
def getMessagesByInfluencerUsername(influencerUsername):
    return Messages.objects.filter(influencerUsername=influencerUsername)


def getMessagesByInfluencerusernameAndClientId(influencerUsername, clientId):
    return Messages.objects.all().filter(influencerUsername=influencerUsername, clientId=clientId)


def getAllMessages():
    return Messages.objects.all()


# not used for now
def deleteAllMessagesBasedOnResponderAndReciverId(reciverId, responderId):
    return Messages.objects.filter(responderId=responderId, reciverId=reciverId).delete()


@atomic
def saveMessages(influencerUsername, clientId, timestamp):
    messages = Messages.objects.create_message_object(influencerUsername, clientId, timestamp)
    return messages
