from rest_framework import serializers
from state.models import StateEdit

class MainSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateEdit
        fields = ['state_id', 'content', 'emoji', 'user']