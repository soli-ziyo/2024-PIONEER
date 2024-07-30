from rest_framework import serializers
from .models import *

class AlarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alarm
        fields = ['change_interest', 'family_interest_update', 'family_hashtag_update', 'family_comment']