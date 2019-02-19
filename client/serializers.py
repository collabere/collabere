from rest_framework.serializers import ModelSerializer
from  .models import  Client

class ClientSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = (
            'uid',
            'name',
            'email',
            'city',
            'country',
        )
        read_only_fields = fields