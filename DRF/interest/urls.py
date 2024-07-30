from django.urls import path
from state.views import *
from interest.views import *
from django.conf import settings

app_name = 'interest'

urlpatterns=[
    path('new/', InterestView.as_view(), name='newinterest'),
    path('detail/<int:pk>/', InterestView.as_view(), name='interest'),
    path('list/<int:user_id>/', InterestListView.as_view(), name='interestList'),
    path('list/<int:interest_id>/emoji/', InterestEmojiView.as_view(), name='interestemoji')
]