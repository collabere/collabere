from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import ClientMapping, Influencer
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


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
        # read_only_fields = fields


# class InfluencerSerializer(serializers.Serializer):
#     id = serializers.IntegerField()
#     name = serializers.CharField(max_length=100)
#     email = serializers.EmailField()
#     username = serializers.CharField(max_length=50)
#     dob = serializers.DateField()
#     gender = serializers.CharField(max_length=10)
#     city = serializers.CharField(max_length=50)
#     country = serializers.CharField(max_length=50)
#     followerCount = serializers.IntegerField()
#     followingCount = serializers.IntegerField()
#     dpUrl = serializers.URLField()
#     industry = serializers.CharField(max_length=50)
#
#     def create(self, validated_data):
#         return Influencer.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         instance.id = validated_data.get('id', instance.id)
#         instance.name = validated_data.get('name', instance.name)
#         instance.email = validated_data.get('email', instance.email)
#         instance.username = validated_data.get('handle', instance.handle)
#         instance.dob = validated_data.get('dob', instance.dob)
#         instance.gender = validated_data.get('gender', instance.gender)
#         instance.city = validated_data.get('city', instance.city)
#         instance.country = validated_data.get('country', instance.country)
#         instance.followerCount = validated_data.get('followerCount', instance.followerCount)
#         instance.followingCount = validated_data.get('followingCount', instance.followingCount)
#         instance.dpUrl = validated_data.get('dpUrl', instance.dpUrl)
#         instance.industry = validated_data.get('industry', instance.industry)
#         instance.save()
#         return instance
#
#     class Meta:
#         model = Influencer
#         fields = (
#             'id',
#             'name',
#             'email',
#             'username',
#             'dob',
#             'gender',
#             'city',
#             'country',
#             'followerCount',
#             'followingCount',
#             'dpUrl',
#             'industry'
#         )
#         # read_only_fields = fields

class InfluencerSerializer(ModelSerializer):
    user = User()
    class Meta:
        model = Influencer
        fields = (
            'id',
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
            'industry',
            'user'
        )
        read_only_fields = fields
#
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username')
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