from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Project

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'clientId',
            'minBudget',
            'maxBudget',
            'introText',
            'projectInitiationDate',
            'influencerUserName',
            'offeredBudget'
        )
        