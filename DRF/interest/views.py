from django.shortcuts import render, get_object_or_404
from rest_framework import views, generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from accounts.models import *
from .serializers import *

# Create your views here.
class InterestView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer=InterestSerializer(data=request.data)
        if serializer.is_valid():
            tag_id = request.data.get('tag')
            week_hashtag = get_object_or_404(WeekHashTag, id=tag_id)
            serializer.save(user=request.user, tag=week_hashtag)
            return Response({'message':'interest post 성공', 'data':serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'messange':'interest post 실패', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

'''
    def get(self, request, pk, format=None):
        interest=get_object_or_404(Interest, pk=pk)
        serializer=InterestSerializer(interest)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        interest=get_object_or_404(Interest, pk=pk)
        serializer=InterestSerializer(interest, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'interest put 성공', 'data':serializer.data})
        return Response({'messange':'interest put 실패', 'error':serializer.errors})

    def delete(self, request, pk, format=None):
        interest=get_object_or_404(Interest, pk=pk)
        interest.delete()
        return Response({"message":"interest 삭제 성공"})
'''
    
class InterestListView(views.APIView):
    def get(self, request, user_id, format=None):
        user = get_object_or_404(User, id=user_id)
        user_families = Family.objects.filter(users=user)
        familycodes = user_families.values_list('familycode', flat=True)
        family_users = User.objects.filter(families__familycode__in=familycodes).distinct()
        user_serializer = UserProfileSerializer(family_users, many=True)

        latest_week_hashtags = WeekHashTag.objects.filter(user=user).order_by('-created_at').first()
        
        if not latest_week_hashtags:
            return Response({'message': 'No hashtags found for this user'}, status=status.HTTP_404_NOT_FOUND)
        interests = Interest.objects.filter(tag=latest_week_hashtags).select_related('user')
        interest_serializer = InterestSerializer(interests, many=True)

        return Response({
            'message': 'InterestList get 성공', 
            'data': {
                'family_users': user_serializer.data,
                'interests': interest_serializer.data
                }
        })

class InterestEmojiView(views.APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, interest_id, format=None):
        user = request.user
        emoji = request.data.get('emoji')

        if not emoji:
            return Response({
                'message': '이모지 업데이트 실패', 
                'error': 'No emoji provided'
                }, status=status.HTTP_400_BAD_REQUEST)

        interest = get_object_or_404(Interest, id=interest_id)

        if interest.tag.user != user:
            return Response({
                'message': '이모지 업데이트 실패', 
                'error': 'Permission denied'
                }, status=status.HTTP_403_FORBIDDEN)

        interest.emoji = emoji
        interest.save()

        serializer = InterestSerializer(interest)
        return Response({
            'message': '이모지 업데이트 성공', 
            'data': serializer.data})
    

class ReportView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        family_codes = user.families.values_list('familycode', flat=True)
        family_users = User.objects.filter(families__familycode__in=family_codes)

        # 요청 보낸 사용자의 해시태그 가져오기
        user_hashtags = WeekHashTag.objects.filter(tag_interests__user=user).distinct()
        hashtag_serializer = WeekHashTagSerializer(user_hashtags, many=True)

        # 응답 데이터 생성
        response_data = {
            "message": "가족 레포트 불러오기 성공",
            "family": [{"nickname": u.nickname, "profile": u.profile.url if u.profile else None} for u in family_users],
            "user_hashtags": hashtag_serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)

class ReportDetailView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, tag_id, format=None):
        # 특정 해시태그를 기준으로 관련된 Interest를 가져옴
        week_hashtag = get_object_or_404(WeekHashTag, id=tag_id)
        interests = Interest.objects.filter(tag=week_hashtag, user=request.user).select_related('user')
        serializer = InterestSerializer(interests, many=True)
        
        response_data = {
            "message": "관심사 태그에 포함된 사용자의 글 불러오기 성공",
            "data": serializer.data
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
