from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.id}: {self.name}"

    def fetch_categories():
        return Category.objects.all()

class Perfume(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Category, blank=True, null=True, on_delete=models.SET_NULL, related_name="perfumes")
    image = models.URLField(max_length=200, blank=True)
    price = models.FloatField()

    def __str__(self):
        return f"{self.id}: {self.name} ${self.price}"
    

class Stock(models.Model):
    perfume = models.ForeignKey(Perfume, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return f"{self.perfume.name} QTE: {self.quantity}"

class Order_statu(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    name = models.CharField(max_length=255)
    address = models.TextField()
    city = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.ForeignKey(Order_statu, default=1, on_delete=models.SET_NULL, null=True, related_name="orders")

    def __str__(self):
        return f"Order #{self.id} by {self.user.username}"

    def deliver_order(self):
        """ Updates the stock quantities when the order is marked as delivered. """
        if self.status.name == "Delivered":
            for order_item in self.order_items.all():
                stock_item = order_item.perfume.stock
                stock_item.update_quantity(order_item.quantity)
            self.save()
            
class Order_item(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")
    perfume = models.ForeignKey(Perfume, on_delete=models.SET_NULL, null=True, related_name="orders")
    quantity = models.IntegerField()
    total = models.FloatField()
    def __str__(self):
        return f"Item #{self.id} in Order #{self.order.id}"
