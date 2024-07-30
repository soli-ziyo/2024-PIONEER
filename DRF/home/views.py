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

class HashTagView(views.APIView):
    def get(self, request, format=None):
        all_hashtags = list(HashTag.objects.all())
        random_hashtags = random.sample(all_hashtags, min(len(all_hashtags), 10))
        serializer = HashTagSerializer(random_hashtags, many=True)
        return Response({'message': 'hashtag get 성공', 'data': serializer.data})

    def put(self, request, format=None):
        hashtag_data = request.data.get('hashtag')
        nickname = request.user.nickname
        
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

