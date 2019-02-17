from django.db import models

# Create your models here.

class Messages(models.Model):
    uid = models.BigIntegerField()
    responderId = models.IntegerField()
    recieverId = models.IntegerField()
    message = models.TextField()
    timestamp = models.DateTimeField()