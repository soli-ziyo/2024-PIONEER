from django.db import models
from django.conf import settings

# Create your models here.
class Alarm(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='alarm')
    change_interest = models.BooleanField(default=True) #관심사(글) 변경 알림
    family_interest_update = models.BooleanField(default=True) #가족의 관심사(글) 업데이트 알림
    family_hashtag_update = models.BooleanField(default=True) #가족의 관심사(해시태그) 변경 알림
    family_comment = models.BooleanField(default=True) #나의 관심사에 가족이 게시글(댓글 느낌) 올렸을때 알림

    def __str__(self):
        return f"{self.user.username}'s Alarm settings"
    
