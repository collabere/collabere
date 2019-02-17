from django.db import models

# Create your models here.

class Influencer(models.Model):
    uid = models.BigIntegerField()
    name = models.CharField(max_length=100)
    email = models.EmailField()
    handle = models.CharField(max_length=50)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
