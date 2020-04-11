from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Client, HomePageIntroEmail


class ClientSerializer(ModelSerializer):

    # def create(self, validated_data):
    #     print(validated_data)
    #     return Client.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.uid = validated_data.get('uid', instance.uid)
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.city = validated_data.get('city', instance.city)
    #     instance.country = validated_data.get('country', instance.country)
    #     instance.companyName = validated_data.get('companyName', instance.companyName)
    #     instance.phoneNumber = validated_data.get('phoneNumber', instance.phoneNumber)
    #     instance.designation = validated_data.get('designation', instance.designation)
    #     instance.companyURL = validated_data.get('companyURL', instance.companyURL)
    #     instance.industry = validated_data.get('industry', instance.industry)

    #     instance.save()
    #     return instance

    class Meta:
        model = Client
        fields = (
            'uid',
            'name',
            'email',
            'city',
            'country',
            'companyName',
            'phoneNumber',
            'designation',
            'companyURL',
            'industry',
            'updatePassPhrase',
            'rating'
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
