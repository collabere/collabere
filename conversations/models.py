from django.db import models

# Create your models here.

class Messages(models.Model):
    uid = models.IntegerField()
    responderId = models.IntegerField()
    recieverId = models.IntegerField()
    message = models.TextField()
    timestamp = models.DateTimeField()