from rest_framework import serializers
from .models import StateEdit

class StateEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateEdit
        fields= ['state_id', 'content', 'emoji'
                 'userid']
        extra_kwargs = {'user_id': {'read_only': True}}  # user_id 필드를 읽기 전용으로 설정