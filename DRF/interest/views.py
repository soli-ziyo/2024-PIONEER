from django.shortcuts import render, get_object_or_404
from rest_framework import views, generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        interests = Interest.objects.filter(tag=week_hashtag).select_related('user')
        serializer = InterestSerializer(interests, many=True)
        return Response({'message': 'InterestList get 성공', 'data': serializer.data})