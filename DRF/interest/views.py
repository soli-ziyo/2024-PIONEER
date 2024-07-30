from django.shortcuts import render, get_object_or_404
from rest_framework import views, generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from accounts.models import *
from .serializers import *
import random

# Create your views here.
class InterestView(views.APIView):
    permission_classes = [IsAuthenticated]
 
    def get(self, request, pk, format=None):
        interest=get_object_or_404(Interest, pk=pk)
        serializer=InterestSerializer(interest)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer=InterestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'message':'interest post 성공', 'data':serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'messange':'interest post 실패', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

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