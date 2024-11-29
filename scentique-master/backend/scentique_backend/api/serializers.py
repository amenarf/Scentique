from rest_framework import serializers
from django.contrib.auth.models import User
from database.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "image"]

class PerfumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = ["id", "name", "category", "description", "image", "price"]

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'name', 'address', 'city', 'phone', 'total', 'status', 'created_at', 'updated_at']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_item
        fields = ['id', 'order', 'perfume', 'quantity', 'total']

class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_statu
        fields = ["name"]