from django.db import models
from django.conf import settings
from state.models import StateEdit

# Create your models here.

class Home(models.Model):
    states = models.ManyToManyField(StateEdit, related_name='homes')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE
                             , related_name='homes')
    def __str__(self):
        return f"Home for {self.user.nickname}"

