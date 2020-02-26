from django.conf.urls import url
from django.contrib import admin

from .views import (
    BookCreateAPIView,
    BookDeleteAPIView,
    BookDetailAPIView,
    BookListAPIView,
    BookUpdateAPIView,
    get_resumo_mes
)

urlpatterns = [
    url(r'^$', BookListAPIView.as_view(), name='list'),
    url(r'^create/$', BookCreateAPIView.as_view(), name='create'),
    url(r'^resumo-mes/$', get_resumo_mes, name='resumo'),
    url(r'^(?P<id>[\w-]+)/$', BookDetailAPIView.as_view(), name='detail'),
    url(r'^(?P<id>[\w-]+)/edit/$',
        BookUpdateAPIView.as_view(), name='update'),
    url(r'^(?P<id>[\w-]+)/delete/$',
        BookDeleteAPIView.as_view(), name='delete'),


]
