from django.db import models
from django.db.transaction import atomic
from django.db.models import PROTECT, OneToOneField, QuerySet, Model
from project.models import Project
from datetime import datetime
from django.utils import timezone

class MessagesQuerySet(QuerySet):

    @atomic
    def create_message_object(self, influencerUsername, clientId, timestamp, message,fromInfluencer, projectObject):
        messages = Messages()

        messages.influencerUsername = influencerUsername
        messages.clientId = clientId
        messages.timestamp = timestamp
        messages.message = message
        messages.fromInfluencer=fromInfluencer
        messages.projectInitiationDate=projectObject
        messages.save()
        return messages


class Messages(models.Model):
    objects = MessagesQuerySet.as_manager()

    influencerUsername = models.CharField(max_length=50, default='')
    clientId = models.IntegerField(null = True)
    message = models.TextField(null =True)
    fromInfluencer = models.BooleanField(default=True)
    timestamp = models.DateTimeField(primary_key=True, default=timezone.now)
    projectInitiationDate = models.ForeignKey(Project, on_delete=models.CASCADE)



class File(models.Model):
    file = models.FileField(blank=False, null=False)
    def __str__(self):
        return self.file.name 