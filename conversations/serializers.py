from rest_framework.serializers import ModelSerializer
from  .models import  Messages

class MessageSerializer(ModelSerializer):
    class Meta:
        model = Messages
        fields = (
            'uid',
            'responderId',
            'reciverId',
            'message',
            'timestamp',
        )
        read_only_fields = fields