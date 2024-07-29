from django.db import models
from django.contrib.auth.models import AbstractUser
import random
import string

# Create your models here.
# AbstractUser에 username(아이디), password(비밀번호) 포함
class User(AbstractUser):
    nickname = models.CharField(max_length=20)
    phonenum = models.IntegerField(blank=True, null=True, unique=True)
    profile = models.ImageField(upload_to='%Y%m%d/', blank=True, null=True)
    #familycode = models.TextField(blank=True, null=True)

    def __str__ (self):
        return self.nickname

def generate_familycode():
    while True:
        familycode = ''.join(random.choices(string.digits, k=4))
        if not Family.objects.filter(familycode=familycode).exists():
            return familycode

class Family(models.Model):
    familycode = models.CharField(max_length=4, unique=True, default=generate_familycode)
    users = models.ManyToManyField(User, related_name='families')

    def __str__(self):
        return f"{self.familycode}"