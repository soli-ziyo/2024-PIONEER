from django.contrib import admin
from django.urls import path, include

from accounts.views import FamilyListView, FamilyCopyView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('state/', include('state.urls')),
    path('home/', include('home.urls')),
    path('interest/', include('interest.urls')),
    path('family/<str:familycode>/', FamilyListView.as_view()),
    path('family/copy/', FamilyCopyView.as_view()),
]