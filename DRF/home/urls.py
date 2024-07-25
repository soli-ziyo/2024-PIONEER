from django.urls import path
from state.views import HomeListView
from django.conf import settings

app_name = 'home'

urlpatterns=[
    path('main/', HomeListView.as_view(), name='main'),
]