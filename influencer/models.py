from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db.models import PROTECT


class Influencer(models.Model):
    user=models.ForeignKey(User,blank=True,default='0000000',on_delete=PROTECT)
    uid = models.BigIntegerField(null=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    handle = models.CharField(max_length=50)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)

class ClientMapping(models.Model):
    influencerId = models.BigIntegerField()
    clientId = models.BigIntegerField()


