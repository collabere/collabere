from django.db import models

# Create your models here.

class Messages(models.Model):
    uid = models.BigIntegerField()
    influencerUsername = models.CharField(max_length=50, default='')
    clientId = models.IntegerField()
    message = models.TextField()
    timestamp = models.DateTimeField()