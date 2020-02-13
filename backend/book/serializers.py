from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    CharField,
    ImageField,
    SlugField
)

from accounts.serializers import UserSerializer

from book.models import Book


class BookCreateUpdateSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Book
        fields = [
            'id',
            'image',
            'price',
            'price',
            'user',

        ]


class BookDetailSerializer(ModelSerializer):

    user = UserSerializer(read_only=True)
    image = SerializerMethodField()

    user_image = ImageField(source='user.profile.image', read_only=True)

    class Meta:
        model = Book
        fields = [
            'id',
            'user_image',
            'image',
            'title',
            'price',
            'user',
        ]

    def get_image(self, obj):
        try:
            image = obj.image.url
        except:
            image = None
        return image


class BookListSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    first_name = CharField(source="user.first_name", read_only=True)
    profile_slug = CharField(source="user.profile.slug", read_only=True)

    class Meta:
        model = Book
        fields = [
            'id',
            'image',
            'title',
            'first_name',
            'profile_slug',
            'price',
            'user',

        ]
