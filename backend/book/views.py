from django.db.models import Q
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView

from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView
)
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.serializers import ValidationError

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from django_filters import rest_framework as filters
from book.models import Book

from .serializers import (
    BookCreateUpdateSerializer,
    BookDetailSerializer,
    BookListSerializer,
)


import django_filters
from django.db.models import Q


def infinite_filter(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    return Book.objects.all()[int(offset): int(offset) + int(limit)]


def is_there_more_data(request):
    offset = request.GET.get('offset')
    if int(offset) > Book.objects.all().count():
        return False
    return True


class BookFilter(filters.FilterSet):
    multi_name_fields = django_filters.CharFilter(
        method='filter_by_all_name_fields')

    class Meta:
        model = Book
        fields = []

    def filter_by_all_name_fields(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) | Q(description__icontains=value) | Q(
                authors__icontains=value)
        )


class BookCreateAPIView(CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookDetailAPIView(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    permission_classes = [AllowAny]
    #lookup_url_kwarg = "abc"


class BookUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookCreateUpdateSerializer
    # permission_classes = [IsOwnerOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
        # email send_email


class BookDeleteAPIView(DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    lookup_field = 'id'
    # permission_classes = [IsOwnerOrReadOnly]


class BookListAPIView(ListAPIView):
    pagination_class = LimitOffsetPagination
    serializer_class = BookListSerializer
    # filter_backends = [SearchFilter, OrderingFilter]
    filterset_class = BookFilter
    permission_classes = [AllowAny]
    # search_fields = ['title', 'content', 'user__first_name']

    def get_queryset(self, *args, **kwargs):

        queryset_list = Book.objects.all()  # filter(user=self.request.user)
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(authors__icontains=query)
            ).distinct()
        return queryset_list
