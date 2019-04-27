from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Client, HomePageIntroEmail


class ClientSerializer(serializers.Serializer):
    uid = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    city = serializers.CharField(max_length=50)
    country = serializers.CharField(max_length=50)

    def create(self, validated_data):
        return Client.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.uid = validated_data.get('uid', instance.uid)
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.city = validated_data.get('city', instance.city)
        instance.country = validated_data.get('country', instance.country)
        instance.save()
        return instance

    class Meta:
        model = Client
        fields = (
            'uid',
            'name',
            'email',
            'city',
            'country',
        )
        # read_only_fields = fields

class HomePageIntroEmailSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=100)

    def create(self, validated_data):
        return HomePageIntroEmail.objects.create(**validated_data)
    class Meta:
        model = HomePageIntroEmail
        fields = (
            'email'
        )
