from django.db import models
from django.conf import settings

# Create your models here.
class StateEdit(models.Model):
    state_id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=50)
    emoji = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.content}, {self.emoji}"