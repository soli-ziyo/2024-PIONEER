from django.shortcuts import render, get_object_or_404
from rest_framework import views
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import OuterRef, Subquery
from django.http import Http404
from .models import *
from .serializers import *
from accounts.models import User

# Create your views here.
class StateList(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        #모든 StateEdit 객체를 가져와서 json 형태로 응답
        state = StateEdit.objects.all()
        serializer = StateEditSerializer(state, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        #클라이언트로부터 받은 데이터를 기반으로 새 StateEdit 객체 생성 및 저장
        #데이터 유효하면 생성된 객체 반환, 아니면 오류메세지를 반환
        serializer = StateEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  
            return Response({"message": "상태 저장 성공", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"message": "상태 저장 실패", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class StateDetail(views.APIView):
    permission_classes = [IsAuthenticated]

    #APIView를 상속받아 조회, 업데이트 삭제 기능 제공
    def get_object(self, pk):
        #주어진 pk 값에 해당하는 StateEdit 반환, x면 404
        try:
            return StateEdit.objects.get(pk=pk)
        except StateEdit.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None):
        #단일 StateEdit 객체를 가져와서 json 형태로 응답함
        state  = self.get_object(pk)
        serializer = StateEditSerializer(state)
        return Response(serializer.data)
   
    def put(self, request, pk, format=None):
        #주어진 pk 값에 해당하는 StateEdit 업데이트
        state =get_object_or_404(StateEdit, pk=pk)
        serializer=StateEditSerializer(state, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "상태 업데이트 성공", "data": serializer.data})
        return Response({"message": "상태 업데이트 실패", "errors": serializer.errors})

    def delete(self, request, pk, format=None):
        #주어진 pk에 해당하는 StateEdit 삭제
        state =get_object_or_404(StateEdit, pk=pk)
        state .delete()
        return Response({"message":"상태 삭제 성공"})
    
    #get == 반환
    #put == 업데이트
    #delete == 삭제

# Create your views here.
class HomeListView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        family_codes = user.families.values_list('familycode', flat=True)
        family_users = User.objects.filter(families__familycode__in=family_codes)
        
        # 각 사용자별로 가장 최근에 업데이트된 StateEdit만 가져옴
        latest_states = StateEdit.objects.filter(
            user=OuterRef('user')
        ).order_by('-updated_at')
        
        subquery = latest_states.values('id')[:1]
        
        states = StateEdit.objects.filter(
            id__in=Subquery(
                StateEdit.objects.filter(
                    user__in=family_users
                ).values('id').annotate(
                    latest_id=Subquery(subquery)
                ).values('latest_id')
            )
        )
        
        serializer = HomeSerializer(states, many=True)

        response_data = {
                "message": "홈 화면 구성 성공",
                "data": serializer.data
            }
        return Response(response_data)