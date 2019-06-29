from django.db import models
from django.db.transaction import atomic
from django.db.models import PROTECT, OneToOneField, QuerySet, Model
from project.models import Project
from datetime import datetime
from django.utils import timezone

# Create your models here.
class MessagesQuerySet(QuerySet):

    @atomic
    def create_message_object(self, influencerUsername, clientId, timestamp, message):
        messages = Messages()

        messages.influencerUsername = influencerUsername
        messages.clientId = clientId
        messages.timestamp = timestamp
        messages.message = message
        messages.save()

        return messages


class Messages(models.Model):
    objects = MessagesQuerySet.as_manager()

    influencerUsername = models.CharField(max_length=50, default='')
    clientId = models.IntegerField()
    message = models.TextField()
    fromInfluencer = models.BooleanField(default=True)
    timestamp = models.DateTimeField()
    projectInitiationDate = models.ForeignKey(Project, on_delete=models.CASCADE, default=timezone.now)