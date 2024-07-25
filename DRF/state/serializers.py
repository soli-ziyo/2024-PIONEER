from rest_framework import serializers
from .models import StateEdit

class StateEditSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    state_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = StateEdit
        fields= ['state_id','content', 'emoji', 'user_id']