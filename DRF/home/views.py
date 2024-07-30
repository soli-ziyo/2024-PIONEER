from django.shortcuts import render, get_object_or_404
from rest_framework import views, generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import OuterRef, Subquery
from .models import *
from .serializers import *
import random

# Create your views here.
class HomeListView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        family_codes = user.families.values_list('familycode', flat=True)
        family_users = User.objects.filter(families__familycode__in=family_codes)
        
        # 각 사용자별로 가장 최근에 업데이트된 StateEdit만 가져옴
        latest_states = StateEdit.objects.filter(
            user=OuterRef('user')
        ).order_by('-updated_at')
        
        subquery = latest_states.values('id')[:1]
        
        states = StateEdit.objects.filter(
            id__in=Subquery(
                StateEdit.objects.filter(
                    user__in=family_users
                ).values('id').annotate(
                    latest_id=Subquery(subquery)
                ).values('latest_id')
            )
        )
        
        serializer = StateEditSerializer(states, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class HashTagView(views.APIView):
    def get(self, request, format=None):
        all_hashtags = list(HashTag.objects.all())
        random_hashtags = random.sample(all_hashtags, min(len(all_hashtags), 10))
        serializer = HashTagSerializer(random_hashtags, many=True)
        return Response({'message': 'hashtag get 성공', 'data': serializer.data})

    def put(self, request, format=None):
        hashtag_data = request.data.get('hashtag')
        nickname = request.data.get('nickname')
        
        if not hashtag_data:
            return Response({'message': 'hashtag post 실패', 'error': 'No hashtag data provided'}, status=status.HTTP_400_BAD_REQUEST)
        if not nickname:
            return Response({'message': 'hashtag post 실패', 'error': 'No nickname provided'}, status=status.HTTP_400_BAD_REQUEST)

        hashtag, created = HashTag.objects.get_or_create(hashtag=hashtag_data)

        try:
            user = User.objects.get(nickname=nickname)
        except User.DoesNotExist:
            return Response({'message': 'hashtag post 실패', 'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        week_hashtag = WeekHashTag.objects.create(user=user)
        week_hashtag.hashtag.add(hashtag)

        serializer = WeekHashTagSerializer(week_hashtag)
        return Response({'message': 'hashtag post 성공', 'data': serializer.data})

