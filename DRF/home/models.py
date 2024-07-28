from django.db import models
from django.conf import settings
from state.models import StateEdit
from accounts.models import User

# Create your models here.
class Home(models.Model):
    states = models.ManyToManyField(StateEdit, related_name='homes')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE
                             , related_name='homes')
    
    def __str__(self):
        return f"Home for {self.user.nickname}"
    
#관심사
class HashTag(models.Model):
    hashtag = models.TextField(unique=True)

    def __str__(self):
        return self.hashtag

#매주관심사
class WeekHashTag(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='hashtags', on_delete=models.CASCADE)
    hashtag = models.ManyToManyField(HashTag, related_name='weekHashTag')
    created_at = models.DateField('date published', auto_now_add=True)

    def __str__(self):
        return ', '.join([tag.hashtag for tag in self.hashtag.all()])