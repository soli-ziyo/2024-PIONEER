from rest_framework import serializers
from .models import Home
from state.serializers import StateEditSerializer
from accounts.serializers import UserSerializer

class HomeSerializer(serializers.ModelSerializer):
    states = StateEditSerializer(many=True, read_only=True)
    nickname = UserSerializer(source='user.nickname', read_only=True)
    user_id = UserSerializer(source='user.id', read_only=True)
    
    class Meta:
        model = Home
        fields = ['states', 'nickname', 'user_id']