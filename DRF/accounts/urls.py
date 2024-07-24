from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

app_name = 'accounts'

urlpatterns=[
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]