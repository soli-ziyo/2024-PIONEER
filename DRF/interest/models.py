from django.db import models
from django.conf import settings
from state.models import StateEdit
from accounts.models import User
from home.models import *

# Create your models here.
#관심사 별 게시글
class Interest(models.Model):
    tag = models.ForeignKey(WeekHashTag, on_delete=models.CASCADE, related_name='tag_interests')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_interests')
    created_at = models.DateTimeField('date published', auto_now_add=True)
    description = models.TextField(blank=True, null=True)
    img = models.ImageField(upload_to='%Y%m%d/', blank=True, null=True)
    emoji = models.TextField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.description