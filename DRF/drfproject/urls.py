from django.contrib import admin
from django.urls import path, include

from accounts.views import FamilyListView, FamilyCreateView, FamilyDetailView, UserUpdateView, FamilyCodeGenerateView
from interest.views import ReportView, HashtagInterestView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('state/', include('state.urls')),
    path('home/', include('home.urls')),
    path('interest/', include('interest.urls')),
    path('family/code/', FamilyCodeGenerateView.as_view(), name='family_code_generate'),
    path('family/create/', FamilyCreateView.as_view(), name='create-family'),
    path('family/', FamilyDetailView.as_view(), name='list-families'),
    path('family/<str:familycode>/', FamilyListView.as_view(), name='user-list-by-familycode'),
    path('settings/profile/', UserUpdateView.as_view(), name='profile_settings'),
    path('report/family/', ReportView.as_view(), name='report_view'),
    path('report/<int:tag_id>/', HashtagInterestView.as_view(), name='hashtag_interest_view'),
]
