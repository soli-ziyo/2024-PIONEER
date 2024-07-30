from django.shortcuts import render
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Alarm
from .serializers import AlarmSerializer

# Create your views here.
class AlarmView(views.APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        try:
            alarm = Alarm.objects.get(user=user)
        except Alarm.DoesNotExist:
            alarm = Alarm.objects.create(user=user)  # 기본값으로 새로 생성
        
        serializer = AlarmSerializer(alarm, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "알림 설정 성공", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response({"message": "알림 설정 실패", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
