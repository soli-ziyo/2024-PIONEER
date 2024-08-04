from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

app_name = 'accounts'

urlpatterns=[
    path('signup/', SignupView.as_view(), name='signup'),
    #path('login/', LoginView.as_view(), name='login'),
    #path('logout/', LogoutView.as_view(), name='logout'),
    path('<int:pk>/', UserlistView.as_view(), name='userlist'),
    path('phonenum/sendCode/', sendCodeView.as_view(), name='sendCode'),
    path('phonenum/getCode/', getCodeView.as_view(), name='getCode'),
    path('phonenum/example/', phoneExView.as_view(), name='phoneExample')
]
