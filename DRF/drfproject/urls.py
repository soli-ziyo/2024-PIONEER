from django.contrib import admin
from django.urls import path, include

from accounts.views import FamilyListView, FamilyUpdateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('state/', include('state.urls')),
    path('home/', include('home.urls')),
    path('interest/', include('interest.urls')),
    path('family/<str:familycode>/', FamilyListView.as_view()),
    path('family/update/', FamilyUpdateView.as_view()),
]