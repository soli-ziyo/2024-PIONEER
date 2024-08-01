from rest_framework import serializers
from .models import StateEdit

class StateEditSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    state_id = serializers.IntegerField(source='id', read_only=True)
    nickname = serializers.CharField(source='user.nickname', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    profile = serializers.ImageField(source='user.profile', read_only=True)
    phonenum = serializers.IntegerField(source='user.phonenum', read_only=True)

    class Meta:
        model = StateEdit
        fields= ['state_id','content', 'emoji', 'user_id', 'nickname', 'username', 'phonenum', 'profile']
    
    def validate(self, data):
        if 'content' not in data or data['content'] is None:
            raise serializers.ValidationError({"content": "상태 메세지가 비어있음"})
        return data

'''
class HomeSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    nickname = serializers.CharField(source='user.nickname', read_only=True)
    profile = serializers.ImageField(source='user.profile', read_only=True)
    phonenum = serializers.IntegerField(source='user.phonenum', read_only=True)

    class Meta:
        model = StateEdit
        fields = ['user_id', 'content', 'emoji', 'nickname', 'phonenum', 'profile']
'''
