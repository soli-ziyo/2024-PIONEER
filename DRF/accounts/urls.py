from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

app_name = 'account'

urlpatterns=[
    path('signup/',SignupView.as_view()),
    path('login/',LoginView.as_view()),
    path('logout/',LogoutView.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)