from django.db import models
from django.db.transaction import atomic
from django.db.models import PROTECT, OneToOneField, QuerySet, Model



# Create your models here.
class MessagesQuerySet(QuerySet):

    @atomic
    def create_message_object(self, influencerUsername, clientId, timestamp):

        messages = Messages()

        messages.influencerUsername = influencerUsername
        messages.clientId = clientId
        messages.timestamp = timestamp
        messages.save()

        return messages


class Messages(models.Model):
    objects = MessagesQuerySet.as_manager()

    influencerUsername = models.CharField(max_length=50, default='')
    clientId = models.IntegerField()
    message = models.TextField()
    timestamp = models.DateTimeField()

