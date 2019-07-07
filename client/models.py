from django.db import models

# Create your models here.


class Client(models.Model):
    uid = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    companyName = models.CharField(max_length=50, default=None, blank=True, null=True)
    phoneNumber = models.CharField(max_length=20, default=None, blank=True, null=True)
    designation = models.CharField(max_length=50, default=None, blank=True, null=True)
    companyURL = models.URLField(default=None, blank=True, null=True)
    industry = models.CharField(max_length=50, default=None, blank=True, null=True)

class HomePageIntroEmail(models.Model):
    email=models.CharField(max_length=100)


