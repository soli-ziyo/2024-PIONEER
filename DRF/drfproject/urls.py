from django.contrib import admin
from django.urls import path, include

from accounts.views import FamilyListView, FamilyCreateView, FamilyDetailView, UserUpdateView, FamilyCodeGenerateView, LoginView
from interest.views import ReportView, ReportDetailView, CalendarView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('myadmin/', admin.site.urls), #보안을 위해 어드민 주소를 바꿈
    path('', LoginView.as_view(), name='login'),
    path('accounts/', include('accounts.urls')),
    path('state/', include('state.urls')),
    path('home/', include('home.urls')),
    path('interest/', include('interest.urls')),
    path('family/code/', FamilyCodeGenerateView.as_view(), name='family_code_generate'),
    path('family/create/', FamilyCreateView.as_view(), name='create-family'),
    path('family/', FamilyDetailView.as_view(), name='list-families'),
    path('family/<str:familycode>/', FamilyListView.as_view(), name='user-list-by-familycode'),
    path('settings/profile/', UserUpdateView.as_view(), name='profile_settings'),
    #path('report/family/', ReportView.as_view(), name='report_view'),
    path('report/summary/<int:user_id>/', ReportView.as_view(), name='family_report'),
    path('report/<int:tag_id>/', ReportDetailView.as_view(), name='hashtag_interest_view'),
    path('report/calendar/<str:familycode>/', CalendarView.as_view(), name='calendar'),
] +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
