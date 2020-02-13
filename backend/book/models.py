from __future__ import unicode_literals

from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User
from django.db.models import Avg
from markdown_deux import markdown


class Buyer(models.Model):
    name = models.CharField(max_length=255, default='')
    email = models.CharField(max_length=100, default='', null=True, blank=True)
    tel = models.CharField(max_length=50, default='', null=True, blank=True)
    address = models.CharField(
        max_length=255, default='', null=True, blank=True)

    def __str__(self):
        return str(self.name)


class Seller(models.Model):
    name = models.CharField(max_length=255, default='')
    email = models.CharField(max_length=100, default='', null=True, blank=True)
    tel = models.CharField(max_length=50, default='', null=True, blank=True)
    address = models.CharField(
        max_length=255, default='', null=True, blank=True)

    def __str__(self):
        return str(self.name)


class Category(models.Model):
    title = models.CharField(max_length=255, default='')

    def __str__(self):
        return str(self.title)


class Type(models.Model):
    title = models.CharField(max_length=255, default='')

    def __str__(self):
        return str(self.title)


class Book(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    type = models.ForeignKey(Type, on_delete=models.CASCADE)
    data = models.DateField(auto_now=False, auto_now_add=False)
    price = models.FloatField(null=True, blank=True)

    image = models.ImageField(default='defhotel.jpg',
                              upload_to='books_pics')

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    buyer = models.ForeignKey(
        Buyer, null=True, blank=True, on_delete=models.CASCADE)
    seller = models.ForeignKey(
        Seller, null=True, blank=True, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __unicode__(self):
        return str(self.data)

    def __str__(self):
        return str(self.data)

    def get_absolute_url(self):
        return reverse("books:thread", kwargs={"slug": self.slug})

    def get_delete_url(self):
        return reverse("books:delete", kwargs={"id": self.id})
