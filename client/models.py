from django.db import models

# Create your models here.


class Client(models.Model):
    uid = models.BigIntegerField()
    name = models.CharField(max_length=100)
    email = models.EmailField()
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)