from rest_framework import serializers
from .models import *
from accounts.serializers import *
from home.serializers import *

class InterestSerializer(serializers.ModelSerializer):
    #nickname = UserSerializer(source='user.nickname', read_only=True)
    #user_id = UserSerializer(source='user.id', read_only=True)
    #tag_id = WeekHashTagSerializer(source='tag.id', read_only=True)

    user = UserProfileSerializer(read_only=True)
    tag = WeekHashTagSerializer(read_only=True)

    class Meta:
        model = Interest
        #fields = ['tag_id', 'user_id', 'nickname', 'description', 'img']
        fields = ['tag', 'user', 'description', 'img', 'emoji', 'created_at']


class UserInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'profile']  # 필요한 필드만 포함

'''
class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeekHashTag
        fields = ['hashtag']  # 해시태그 모델의 필드를 정의
'''