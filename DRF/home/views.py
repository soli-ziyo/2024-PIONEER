from django.shortcuts import render, get_object_or_404
from rest_framework import views, generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from .models import *
from .serializers import *

# Create your views here.

class HomeListView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        #모든 StateEdit 객체를 가져와서 json 형태로 응답
        state = Home.objects.all()
        serializer = HomeSerializer(many=True)
        return Response(serializer.data)
    
