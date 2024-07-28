from django.urls import path
from state.views import *
from home.views import *
from django.conf import settings

app_name = 'home'

urlpatterns=[
    path('main/', HomeListView.as_view(), name='main'),
    path('hashtag/', HashTagView.as_view(), name='hashtag')
]