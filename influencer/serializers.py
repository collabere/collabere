from rest_framework.serializers import ModelSerializer
from  .models import  ClientMapping, Influencer

class ClientMappingSerializer(ModelSerializer):
    class Meta:
        model = ClientMapping
        fields = (
            'influencerId',
            'clientId',
        )
        read_only_fields = fields

class InfluencerSerializer(ModelSerializer):
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
        read_only_fields = fields