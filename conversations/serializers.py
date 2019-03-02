from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from  .models import  Messages

class MessageSerializer(serializers.Serializer):
    uid = serializers.IntegerField()
    responderId = serializers.IntegerField()
    reciverId = serializers.IntegerField()
    message = serializers.CharField()
    timestamp = serializers.DateTimeField()

    def create(self, validated_data):
        return Messages.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.uid = validated_data.get('uid', instance.uid)
        instance.responderId = validated_data.get('responderId', instance.responderId)
        instance.reciverId = validated_data.get('reciverId', instance.reciverId)
        instance.message = validated_data.get('message', instance.message)
        instance.timestamp = validated_data.get('timestamp', instance.timestamp)
        instance.save()
        return instance

    class Meta:
        model = Messages
        fields = (
            'uid',
            'responderId',
            'reciverId',
            'message',
            'timestamp',
        )
        # read_only_fields = fields