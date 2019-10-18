from django.contrib.auth.models import User
from django.db import models
from django.conf import  settings
# Create your models here.
from django.db.models import PROTECT, OneToOneField, QuerySet, Model
from django.db.transaction import atomic
from django.contrib.postgres.fields import ArrayField
from enum import Enum




class InfluencerQuerySet(QuerySet):

    @atomic
    def create_influencer(self, name, email, username, dob, gender, city, country, followerCount, followingCount, dpUrl, industry, user):
        influencer = Influencer()
        influencer.user = user
        influencer.name = name
        influencer.email=email
        influencer.username = username
        influencer.dob = dob
        influencer.gender = gender
        influencer.city = city
        influencer.country = country
        influencer.followerCount = followerCount
        influencer.followingCount = followingCount
        influencer.dpUrl = dpUrl,
        influencer.industry = industry
        influencer.save()

        return influencer


class Influencer(Model):

    objects = InfluencerQuerySet.as_manager()

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField( null=True)
    username = models.CharField(max_length=50)
    dob = models.DateField(null=True)
    gender = models.CharField(max_length=10, null=True)
    city = models.CharField(max_length=50, null=True )
    country = models.CharField(max_length=50,  null=True)
    followerCount = models.IntegerField(default=0, blank=True, null=True)
    followingCount = models.IntegerField(default=0, blank=True, null=True)
    dpUrl = models.URLField(default=None, blank=True, null=True)
    industry = models.CharField(max_length=50, default=None, blank=True, null=True)
    user=OneToOneField(settings.AUTH_USER_MODEL, db_column='user_id', on_delete=PROTECT,null=True)
    sourceOfOnBoard=models.CharField(max_length=50, default="normal")
    # Other options are instagram, facebook, google
    # TODO: will be replaced by enums

class ClientMapping(models.Model):
    influencerUsername = models.CharField(max_length=100, default=None)
    clientId = models.BigIntegerField()

class InfluencerPublicProfileDetails(models.Model):
    referralLink= models.CharField(max_length=500)
    videoLink = models.CharField(max_length= 500)
    influencer = models.ForeignKey(Influencer, on_delete=models.CASCADE)

class InstagramAuthModel(models.Model):
    instagramUserId= models.BigIntegerField()
    influencer = models.ForeignKey(Influencer, on_delete=models.CASCADE)


# TODO: Add other social media auth models here depending upon the unique key


