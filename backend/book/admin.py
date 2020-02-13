
from django.contrib import admin

# Register your models here.
from .models import Book, Category, Seller, Buyer, Type
# Register your models here.
admin.site.register(Book)
admin.site.register(Category)
admin.site.register(Seller)
admin.site.register(Buyer)
admin.site.register(Type)
