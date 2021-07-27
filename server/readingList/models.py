from django.db import models


# Create your models here.
class Article(models.Model):
    id = models.IntegerField
    title = models.CharField(max_length=1000, blank=True)
    date = models.CharField(max_length=100, blank=True)
    link = models.CharField(max_length=100, blank=True)
    journal = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.title