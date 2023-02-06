from django.db import models

# Create your models here.
class Task(models.Model):
    label = models.CharField(max_length=200)
    isCompleted = models.BooleanField(default=False, blank=True, null=True)
    objects = models.Manager()

    def __str__(self):
        return self.label