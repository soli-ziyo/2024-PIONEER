from django.urls import path
from state.views import *
from interest.views import *
from django.conf import settings

app_name = 'interest'

urlpatterns=[
    path('detail/<int:pk>/', InterestView.as_view(), name='interest'),
    path('list/<int:tag_id>/', InterestListView.as_view(), name='interestList')
]