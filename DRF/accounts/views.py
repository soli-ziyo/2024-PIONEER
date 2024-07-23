from django.shortcuts import render
from rest_framework import views
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.http import Http404
from .models import *
from .serializers import *

# Create your views here.
class SignupView(views.APIView):
    serializer_class = AccountSerializer
    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "회원가입 성공", "data": serializer.data})
        return Response({"message": "회원가입 실패", "error": serializer.errors})

class LoginView(views.APIView):
    serializer_class = AccountLoginSerializer
    def post(self, request):
        serializer=AccountLoginSerializer(data=request.data)

        if serializer.is_valid():
            return Response({"message":'로그인 성공','data':serializer.validated_data})
        return Response({"message":'로그인 실패','error':serializer.errors})
    
class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response({"message": "로그아웃 성공"})
        except Token.DoesNotExist:
            return Response({"message": "로그아웃 실패", "error": "토큰이 존재하지 않습니다."})