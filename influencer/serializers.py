from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from  .models import  ClientMapping, Influencer

class ClientMappingSerializer(serializers.Serializer):
    influencerId = serializers.IntegerField()
    clientId = serializers.IntegerField()

    def create(self, validated_data):
        return Messages.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.influencerId = validated_data.get('influencerId', instance.influencerId)
        instance.clientId = validated_data.get('clientId', instance.clientId)
        instance.save()
        return instance

    class Meta:
        model = ClientMapping
        fields = (
            'influencerId',
            'clientId',
        )
        # read_only_fields = fields

class InfluencerSerializer(serializers.Serializer):
    uid = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    handle = serializers.CharField(max_length=50)
    dob = serializers.DateField()
    gender = serializers.CharField(max_length=10)
    city = serializers.CharField(max_length=50)
    country = serializers.CharField(max_length=50)

    def create(self, validated_data):
        return Messages.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.uid = validated_data.get('uid', instance.uid)
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.handle = validated_data.get('handle', instance.handle)
        instance.dob = validated_data.get('dob', instance.dob)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.city = validated_data.get('city', instance.city)
        instance.country = validated_data.get('country', instance.country)
        instance.save()
        return instance
    class Meta:
        model = Influencer
        fields = (
            'uid',
            'name',
            'email',
            'handle',
            'dob',
            'gender',
            'city',
            'country'
        )
        # read_only_fields = fields