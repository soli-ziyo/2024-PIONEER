from django.shortcuts import render, get_object_or_404
from rest_framework import views, generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from accounts.models import *
from .serializers import *
from accounts.serializers import UserProfileSerializer
from datetime import datetime, timedelta
from django.utils import timezone
from django.db.models import Count

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

class InterestDeleteView(views.APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, interest_id, format=None):
        interest=get_object_or_404(Interest, pk=interest_id)
        if not interest:
            return Response({'message': 'interest 게시글이 없습니다'}, status=status.HTTP_404_NOT_FOUND)
        interest.delete()
        return Response({"message":"interest 삭제 성공"}, status=status.HTTP_200_OK)

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
        
        if familycodes:
            family_users = User.objects.filter(families__familycode__in=familycodes).distinct()
        else:
            family_users = User.objects.filter(id=user.id)  # 패밀리 코드가 없을 때 현재 사용자만 반환
        
        user_serializer = UserProfileSerializer(family_users, many=True)

        latest_week_hashtags = WeekHashTag.objects.filter(user=user).order_by('-created_at', '-id').first()
        hashtag_serializer = WeekHashTagInterestSerializer(latest_week_hashtags)
        if not latest_week_hashtags:
            return Response({'message': 'No hashtags found for this user'}, status=status.HTTP_404_NOT_FOUND)
        
        interests = Interest.objects.filter(tag=latest_week_hashtags).select_related('user')
        interest_serializer = InterestSerializer(interests, many=True)

        return Response({
            'message': 'InterestList get 성공', 
            'data': {
                'family_users': user_serializer.data,
                'hashtags': hashtag_serializer.data,
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
    
    def get(self, request, user_id, format=None):
        user = get_object_or_404(User, id=user_id)
        user_families = Family.objects.filter(users=user)
        familycodes = user_families.values_list('familycode', flat=True)
        
        if familycodes:
            family_users = User.objects.filter(families__familycode__in=familycodes).distinct()
        else:
            family_users = User.objects.filter(id=user.id)

        user_serializer = UserProfileSerializer(family_users, many=True)
        
        user_hashtags = WeekHashTag.objects.filter(user=user).distinct()
        hashtag_serializer = ReportHashTagSerializer(user_hashtags, many=True)
        
        response_data = {
            "message": "가족 레포트 불러오기 성공",
            "family_users": user_serializer.data,
            "user_hashtags": hashtag_serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)

'''
class ReportView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        family_codes = user.families.values_list('familycode', flat=True)
        family_users = User.objects.filter(families__familycode__in=family_codes)
        # 요청 보낸 사용자의 해시태그 가져오기
        user_hashtags = WeekHashTag.objects.filter(tag_interests__user=user).distinct()
        hashtag_serializer = ReportHashTagSerializer(user_hashtags, many=True)
        # 응답 데이터 생성
        response_data = {
            "message": "가족 레포트 불러오기 성공",
            "family": [{"nickname": u.nickname, "profile": u.profile.url if u.profile else None} for u in family_users],
            "user_hashtags": hashtag_serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)
'''


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

def get_total_interest(request):
    today = datetime.now()
    year = today.year
    month = today.month

    start_date = timezone.make_aware(datetime(year, month, 1))
    if month == 12:
        end_date = timezone.make_aware(datetime(year + 1, 1, 1))
    else:
        end_date = timezone.make_aware(datetime(year, month + 1, 1))
        
    total_interest = Interest.objects.filter(
        created_at__gte=start_date,
        created_at__lt=end_date
    )

    return total_interest

class CalendarView(views.APIView):
    def get(self, request, familycode):
        try:
            family = Family.objects.get(familycode=familycode)
        except Family.DoesNotExist:
            family = request.user
            return Response({"message": "해당 familycode를 가진 가족이 없습니다."}, status=404)

        users = family.users.all()
        total_users = users.count()

        # 월별 게시글 개수
        today = datetime.today()
        start_date = today - timedelta(days=30)

        interests=[]
        total_interest = get_total_interest(request=request)
        total_interests = 0

        # 유저가 월별 올린 게시글 수
        interest_perUser = []
        for user in users:
            user_interests = total_interest.filter(user=user).count()
            total_interests += user_interests
            interest_perUser.append({
                "user":UserProfileSerializer(user).data,
                "user_interests":user_interests
        })
            
        if total_users == 0:
            stew_temp = 0
        else:
            stew_temp = int(total_interests / total_users)

        if stew_temp < 25:
            stew = "차가운 스튜"
        elif stew_temp < 50:
            stew = "미지근한 스튜"
        elif stew_temp < 75:
            stew = "따뜻한 스튜"
        else:
            stew = "뜨거운 스튜"

        interests.append({ "총 게시물 수": total_interests })
        interests.append({ "stew_temp": stew_temp })
        interests.append({ "stew": stew })

        # 날짜별 글을 올린 유저 수
        interest_data = Interest.objects.filter(
            user__in=users,
            created_at__gte=start_date
        ).extra({'date': 'DATE(created_at)'}).values('date').annotate(user_count=Count('user', distinct=True))

        calendar = []
        for item in interest_data:
            date_str = item['date']
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            percentage = round((item['user_count'] / total_users) * 100) if total_users > 0 else 0
            calendar.append({
                "date": date_obj.strftime('%Y-%m-%d'),
                "user_count": item['user_count'],
                "percentage": percentage
            })

        return Response({
            "message": "달력 데이터를 성공적으로 불러왔습니다.",
            "interests": interests,
            "calendar": calendar,
            "interest_perUser": interest_perUser
        })
