from django.shortcuts import render, get_object_or_404
from rest_framework import views, generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
import random

# Create your views here.

class HomeListView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        #모든 StateEdit 객체를 가져와서 json 형태로 응답
        state = Home.objects.all()
        serializer = HomeSerializer(many=True)
        return Response(serializer.data)

class InterestView(views.APIView):      
    def get(self, request, pk, format=None):
        interest=get_object_or_404(Interest, pk=pk)
        serializer=InterestSerializer(interest)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        interest=get_object_or_404(Interest, pk=pk)
        serializer=InterestSerializer(interest, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'interest post 성공', 'data':serializer.data})
        return Response({'messange':'interest post 실패', 'error':serializer.errors})

    def delete(self, request, pk, format=None):
        interest=get_object_or_404(Interest, pk=pk)
        interest.delete()
        return Response({"message":"interest 삭제 성공"})

class InterestListView(views.APIView):
    def get(self, request, tag_id, format=None):
        week_hashtag = get_object_or_404(WeekHashTag, id=tag_id)
        interests = Interest.objects.filter(tag=week_hashtag)
        serializer = InterestSerializer(interests, many=True)
        return Response({'message': 'InterestList get 성공', 'data': serializer.data})

class HashTagView(views.APIView):
    def get(self, request, format=None):
        all_hashtags = list(HashTag.objects.all())
        random_hashtags = random.sample(all_hashtags, min(len(all_hashtags), 10))
        serializer = HashTagSerializer(random_hashtags, many=True)
        return Response({'message': 'hashtag get 성공', 'data': serializer.data})

    def put(self, request, format=None):
        hashtag_data = request.data.get('hashtag')
        user_id = request.data.get('user_id')
        if not hashtag_data:
            return Response({'message': 'hashtag post 실패', 'error': 'No hashtag data provided'}, status=status.HTTP_400_BAD_REQUEST)
        if not user_id:
            return Response({'message': 'hashtag post 실패', 'error': 'No user ID provided'}, status=status.HTTP_400_BAD_REQUEST)

        # HashTag 객체 생성 또는 가져오기
        hashtag, created = HashTag.objects.get_or_create(hashtag=hashtag_data)

        # 사용자 객체 가져오기
        try:
            user = User.objects.get(username=user_id)
        except User.DoesNotExist:
            return Response({'message': 'hashtag post 실패', 'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # WeekHashTag 객체 생성
        week_hashtag = WeekHashTag.objects.create(user=user)
        week_hashtag.hashtag.add(hashtag)

        serializer = WeekHashTagSerializer(week_hashtag)
        return Response({'message': 'hashtag post 성공', 'data': serializer.data})
