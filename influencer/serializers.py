from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import ClientMapping, Influencer, InfluencerPublicProfileDetails, InstagramAuthModel
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


class InfluencerPublicProfileDetailsSerializer(ModelSerializer):
    class Meta:
        model = InfluencerPublicProfileDetails
        fields = (
            'referralLink',
            'videoLink',
        )
        # read_only_fields = ('referralLink', 'videoLink')

class InstagramAuthModelSerializer(ModelSerializer):
    class Meta:
        model = InstagramAuthModel
        fields = (
            'instagramUserId',
        )

class ClientMappingSerializer(serializers.Serializer):
    influencerUsername = serializers.CharField()
    clientId = serializers.IntegerField()

    def create(self, validated_data):
        return ClientMapping.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.influencerUsername = validated_data.get('influencerUsername', instance.influencerId)
        instance.clientId = validated_data.get('clientId', instance.clientId)
        instance.save()
        return instance

    class Meta:
        model = ClientMapping
        fields = (
            'influencerUsername',
            'clientId',
        )


class InfluencerSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100, required=False)
    email = serializers.EmailField(required=False)
    username = serializers.CharField(max_length=50)
    dob = serializers.DateField(required=False)
    gender = serializers.CharField(max_length=10, required=False)
    city = serializers.CharField(max_length=50, required=False)
    country = serializers.CharField(max_length=50, required=False)
    followerCount = serializers.IntegerField( required=False)
    followingCount = serializers.IntegerField(required=False)
    dpUrl = serializers.URLField(required=False)
    industry = serializers.CharField(max_length=50, required=False)

    def create(self, validated_data):
        return Influencer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.dob = validated_data.get('dob', instance.dob)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.city = validated_data.get('city', instance.city)
        instance.country = validated_data.get('country', instance.country)
        instance.followerCount = validated_data.get('followerCount', instance.followerCount)
        instance.followingCount = validated_data.get('followingCount', instance.followingCount)
        instance.dpUrl = validated_data.get('dpUrl', instance.dpUrl)
        instance.industry = validated_data.get('industry', instance.industry)
        instance.save()
        return instance

    class Meta:
        model = Influencer
        fields = (
            'name',
            'email',
            'username',
            'dob',
            'gender',
            'city',
            'country',
            'followerCount',
            'followingCount',
            'dpUrl',
            'industry'
        )
      
class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'})

    class Meta:
        model = get_user_model()
        fields = ('username', 'password')
        write_only_fields = ('password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active',)

    def create(self, validated_data):
        user = super(CreateUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user