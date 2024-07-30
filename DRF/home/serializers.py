from rest_framework import serializers
from .models import *
from state.serializers import StateEditSerializer
from accounts.serializers import UserSerializer, FamilySerializer

class HomeSerializer(serializers.ModelSerializer):
    states = StateEditSerializer(many=True, read_only=True)
    nickname = UserSerializer(source='user.nickname', read_only=True)
    user_id = UserSerializer(source='user.id', read_only=True)
    familycode = FamilySerializer(source='user.families.first.familycode', read_only=True)
    
    class Meta:
        model = Home
        fields = ['states', 'nickname', 'user_id', 'familycode']

class HashTagSerializer(serializers.ModelSerializer):
    hashtag_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = HashTag
        fields = ['hashtag_id','hashtag']

class WeekHashTagSerializer(serializers.ModelSerializer):
    hashtag = HashTagSerializer(many=True, read_only=True)
    nickname = serializers.CharField(source='user.nickname', read_only=True)

    class Meta:
        model = WeekHashTag
        fields = ['id', 'nickname', 'hashtag', 'created_at']

    def create(self, validated_data):
        hashtags_data = validated_data.pop('hashtag')
        week_hashtag = WeekHashTag.objects.create(**validated_data)
        for hashtag_data in hashtags_data:
            hashtag, created = HashTag.objects.get_or_create(hashtag=hashtag_data['hashtag'])
            week_hashtag.hashtag.add(hashtag)
        return week_hashtag
