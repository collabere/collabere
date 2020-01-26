from django.db import models
import uuid

# Create your models here.


class Client(models.Model):
    uid = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=100,default=None, blank=True, null=True)
    email = models.EmailField()
    city = models.CharField(max_length=50, default=None, blank=True, null=True)
    country = models.CharField(max_length=50, default=None, blank=True, null=True)
    companyName = models.CharField(max_length=50, default=None, blank=True, null=True)
    phoneNumber = models.CharField(max_length=20, default=None, blank=True, null=True)
    designation = models.CharField(max_length=50, default=None, blank=True, null=True)
    companyURL = models.URLField(default=None, blank=True, null=True)
    industry = models.CharField(max_length=50, default=None, blank=True, null=True)
    updatePassPhrase= models.CharField(max_length=50, default=None,blank=True, null=True)

class HomePageIntroEmail(models.Model):
    email=models.CharField(max_length=100)


