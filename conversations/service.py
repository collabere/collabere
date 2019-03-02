from conversations.models import Messages


def getMessagesByResponderAndReciverId(reciverId,responderId):
    return Messages.objects.filter(responderId=responderId,reciverId=reciverId)

def getAllMessages():
    return Messages.objects.all()

def deleteAllMessagesBasedOnResponderAndReciverId(reciverId, responderId):
    return Messages.objects.filter(responderId=responderId,reciverId=reciverId).delete()
