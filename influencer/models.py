from django.contrib.auth.models import User
from django.db import models
from django.conf import  settings
# Create your models here.
from django.db.models import PROTECT, OneToOneField, QuerySet, Model
from django.db.transaction import atomic



class InfluencerQuerySet(QuerySet):

    @atomic
    def create_influencer(self, name,email,username,dob,gender,city,country,password):
        user = User.objects.create_user(username, email=email, password=password)
        user.save()

        influencer = Influencer()
        influencer.user = user
        influencer.name = name
        influencer.handle = username
        influencer.dob = dob
        influencer.gender = gender
        influencer.city = city
        influencer.country = country
        influencer.save()

        return influencer


class Influencer(Model):
    objects = InfluencerQuerySet.as_manager()


    name = models.CharField(max_length=100)
    email = models.EmailField()
    handle = models.CharField(max_length=50)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    user=OneToOneField(settings.AUTH_USER_MODEL, db_column='user_id', on_delete=PROTECT,null=True)



class ClientMapping(models.Model):
    influencerId = models.BigIntegerField()
    clientId = models.BigIntegerField()


