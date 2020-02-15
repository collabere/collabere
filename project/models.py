from django.db import models
from client.models import Client
from datetime import datetime
from django.utils import timezone  

# Create your models here.
class Project(models.Model):
    clientId = models.ForeignKey(Client, on_delete=models.CASCADE)
    minBudget = models.IntegerField(default=None, blank=True, null=True)
    maxBudget = models.IntegerField(default=None, blank=True, null=True)
    introText = models.CharField(max_length=200, default=None, blank=True, null=True)
    latestText = models.CharField(max_length=200, default=None, blank=True, null=True)
    projectInitiationDate = models.DateTimeField(primary_key=True, default=timezone.now)
    influencerUserName = models.CharField(max_length=50)
    offeredBudget = models.IntegerField(default=None, blank=True, null=True)

