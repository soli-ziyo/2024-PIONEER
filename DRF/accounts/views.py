from django.shortcuts import render, get_object_or_404
from .models import User
from rest_framework import views, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Max
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

class FamilyCopyView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        familycode = request.data.get('familycode')

        # 4자리 familycode 검증
        if not familycode or len(familycode) != 4:
            return Response({'message': '4자리 패밀리 코드가 필요합니다'}, status=status.HTTP_400_BAD_REQUEST)

        # 현재 인증된 사용자 가져오기
        user = self.request.user
        
        serializer = UserSerializer(user, data={'familycode': familycode}, partial=True)

        if serializer.is_valid():
            existing_family = User.objects.filter(familycode=familycode)

            if existing_family.exists():
                user.familyid = existing_family.first().familyid
                serializer.save()
                return Response({"message": "유효한 패밀리 코드", 'user': serializer.data}, status=status.HTTP_200_OK)
            else:
                # 새로운 familycode가 입력되었을 경우 새로운 familyid를 생성합니다.
                new_family_id = User.objects.aggregate(max_id=Max('familyid'))['max_id']
                if new_family_id is None:
                    new_family_id = 1
                else:
                    new_family_id += 1
                user.familyid = new_family_id
                serializer.save()
                return Response({"message": "새로운 패밀리 코드가 생성되었습니다", 'user': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)