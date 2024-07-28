from django.shortcuts import render, get_object_or_404
from .models import User
from rest_framework import views, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponseNotAllowed

# Create your views here.

class SignupView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'회원가입 성공', 'data':serializer.data})
        return Response({'messange':'회원가입 실패', 'error':serializer.errors})
    
class LoginView(views.APIView):
    serializer_class= UserLoginSerializer
    def post(self, request):
        serializer = UserLoginSerializer(data = request.data)

        if serializer.is_valid():
            return Response({'message':'로그인 성공', 'data':serializer.validated_data})
        return Response({'message':'로그인 실패', 'error':serializer.errors})
'''  
class LogoutView(views.APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "로그아웃 성공"})
        except KeyError:
            return Response({"message": "로그아웃 실패", "error": "토큰이 존재하지 않습니다."})
        except Exception as e:
            return Response({"message": "로그아웃 실패", "error": str(e)})
''' 

class UserlistView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class FamilyListView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, familycode, format=None):
        user = get_object_or_404(User, familycode=familycode)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class FamilyUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def dispatch(self, request, *args, **kwargs):
        if request.method.lower() not in ['put', 'patch']:
            return HttpResponseNotAllowed(['PUT', 'PATCH'])
        return super().dispatch(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = FamilySerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)
    