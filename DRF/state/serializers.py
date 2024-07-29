from rest_framework import serializers
from .models import StateEdit

class StateEditSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    state_id = serializers.IntegerField(source='id', read_only=True)
    nickname = serializers.CharField(source='user.nickname', read_only=True)
    profile = serializers.ImageField(source='user.profile', read_only=True)

    class Meta:
        model = StateEdit
        fields= ['state_id','content', 'emoji', 'user_id', 'nickname', 'profile']

class HomeSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(source='user.nickname', read_only=True)
    profile = serializers.ImageField(source='user.profile', read_only=True)

    class Meta:
        model = StateEdit
        fields = ['content', 'emoji', 'nickname', 'profile']
