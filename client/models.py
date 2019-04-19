from django.db import models

# Create your models here.


class Client(models.Model):
    uid = models.BigIntegerField()
    name = models.CharField(max_length=100)
    email = models.EmailField()
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    companyName = models.CharField(max_length=50, default=None, blank=True, null=True)
    pointOfContact = models.CharField(max_length=50, default=None, blank=True, null=True)
    pocPhnNum = models.CharField(max_length=20, default=None, blank=True, null=True)
    pocEmailId = models.EmailField(default=None, blank=True, null=True)
    pocDesignation = models.CharField(max_length=50, default=None, blank=True, null=True)
    companyURL = models.URLField(default=None, blank=True, null=True)
    industry = models.CharField(max_length=50, default=None, blank=True, null=True)
    maxBudget = models.IntegerField(default=None, blank=True, null=True)
    introText = models.CharField(max_length=200, default=None, blank=True, null=True)