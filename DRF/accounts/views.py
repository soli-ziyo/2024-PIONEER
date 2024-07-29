from django.shortcuts import render, get_object_or_404
from .models import User
from rest_framework import views, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

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

class UserlistView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class FamilyListView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, familycode, format=None):
        family = get_object_or_404(Family, familycode=familycode)  # familycode로 Family 객체를 찾음
        users = family.users.all()  # 해당 Family에 속한 모든 사용자를 가져옴
        serializer = UserSerializer(users, many=True)  # 사용자 목록을 직렬화
        return Response(serializer.data)  # 직렬화된 사용자 데이터를 응답
    
class FamilyCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        familycode = request.data.get('familycode')

        if user.families.exists():
            return Response({"message": "이미 가족에 속해있습니다."}, status=status.HTTP_400_BAD_REQUEST)

        if Family.objects.filter(familycode=familycode).exists():  #입력된 패밀리코드가 이미 존재한다면 
            family = Family.objects.get(familycode=familycode) # 동일 패밀리코드 구성원을 가져옴 (get)
        else:
            family = Family.objects.create(familycode=familycode) #패밀리를 새로 구성함

        # Add user to the family
        family.users.add(user) #패밀리에 속하게 함
        user.familycode = familycode

        serializer = FamilySerializer(family)
        return Response({"message": "가족구성원 추가 성공", "data": serializer.data})
    
class FamilyDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        families = user.families.all()
        if families.exists():
            family = families.first() 
            serializer = FamilySerializer(family) #여러개의 가족으로 이루어지므로 many=True
            return Response({"message": "포함된 가족코드 불러오기 성공", "data": serializer.data})
        else:
            return Response({"message": "실패(포함된 가족이 없음)"})


class UserUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "프로필 업데이트 성공", "data": serializer.data})
        return Response({"message": "프로필 업데이트 실패", "errors": serializer.errors})
        
class FamilyCodeGenerateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        families = user.families.all()
        if families.exists():
            family = families.first()
            return Response({"message": "패밀리코드가 이미 존재합니다.", "familycode": family.familycode})

        familycode = generate_familycode()
        family = Family.objects.create(familycode=familycode)
        family.users.add(user)

        serializer = FamilySerializer(family)
        return Response({"message": "패밀리 코드 생성 성공", "data": serializer.data})