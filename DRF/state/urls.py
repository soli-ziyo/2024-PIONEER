from django.urls import path
from .views import *

app_name = 'state'

urlpatterns = [
    path('', StateList.as_view()),
    path('edit/', StateList.as_view()),
    path('<int:pk>/', StateDetail.as_view()),
]