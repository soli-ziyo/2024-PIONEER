from django.contrib import admin
from django.urls import path, include

from accounts.views import FamilyListView, FamilyCreateView, FamilyDetailView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('state/', include('state.urls')),
    path('home/', include('home.urls')),
    path('interest/', include('interest.urls')),
    path('family/create/', FamilyCreateView.as_view(), name='create-family'),
    path('family/', FamilyDetailView.as_view(), name='list-families'),
]