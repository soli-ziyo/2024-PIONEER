from rest_framework import serializers
from .models import *
from accounts.serializers import *
from home.serializers import *

class InterestSerializer(serializers.ModelSerializer):
    #nickname = UserSerializer(source='user.nickname', read_only=True)
    #user_id = UserSerializer(source='user.id', read_only=True)
    #tag_id = WeekHashTagSerializer(source='tag.id', read_only=True)

    interest_id = serializers.IntegerField(source='id', read_only=True)
    user = UserProfileSerializer(read_only=True)
    tag = WeekHashTagSerializer(read_only=True)

    class Meta:
        model = Interest
        #fields = ['tag_id', 'user_id', 'nickname', 'description', 'img']
        fields = ['interest_id', 'tag', 'user', 'description', 'img', 'emoji', 'created_at']


class UserInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'profile']  # 필요한 필드만 포함

'''
class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeekHashTag
        fields = ['hashtag']  # 해시태그 모델의 필드를 정의

class CalendarSerializer(serializers.ModelSerializer):
    date = serializers.DateField(source='created_at', read_only=True)
    family_count = serializers.SerializerMethodField()
    percentage = serializers.SerializerMethodField()

    class Meta:
        model = Interest
        fields = ['date', 'family_count', 'percentage']

    def get_family_count(self, obj):
        date = obj.created_at.date()
        unique_users = Interest.objects.filter(created_at__date=date).values('user').distinct()
        return unique_users.count()

    def get_percentage(self, obj):
        date = obj.created_at.date()
        try:
            family = Family.objects.get(familycode=self.context['familycode'])
            total_users = family.users.count()
        except Family.DoesNotExist:
            total_users = 0

        family_count = self.get_family_count(obj)
        percentage = (family_count / total_users * 100) if total_users > 0 else 0

        return int(round(percentage))
'''