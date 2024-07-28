from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from random import randint

# Create your models here.
# AbstractUser에 username(아이디), password(비밀번호) 포함
class User(AbstractUser):
    nickname = models.CharField(max_length=20)
    phonenum = models.IntegerField(blank=True, null=True, unique=True)
    profile = models.ImageField(upload_to='%Y%m%d/', blank=True, null=True)
    familycode = models.TextField(blank=True, null=True)

    def __str__ (self):
        return self.nickname
