from django.contrib import admin
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *


@receiver(post_save, sender=Order)
def update_stock_on_delivery(sender, instance, created, **kwargs):
    # Only trigger if the order is updated and status is "Delivered"
    if not created and instance.status.name == "Delivered":
        instance.deliver_order()  # Call the method to update stock
        
# Category Admin Interface
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "image", "perfume_count")
    search_fields = ("name",)
    
    # Custom method to count how many perfumes belong to a category
    def perfume_count(self, obj):
        return obj.perfumes.count()
    perfume_count.short_description = "Perfumes Count"

admin.site.register(Category, CategoryAdmin)


# Perfume Admin Interface
class PerfumeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category", "price", "stock_quantity", "revenue")
    list_filter = ("category", "price")
    search_fields = ("name", "category__name")

    # Custom method to calculate the total revenue for the perfume
    def revenue(self, obj):
        delivered_orders = Order_item.objects.filter(perfume=obj, order__status__name="Delivered")  # Adjust the status name as needed
        total_revenue = sum([item.quantity * obj.price for item in delivered_orders])
        return total_revenue
    revenue.short_description = "Total Revenue"

    
    def stock_quantity(self, obj):
        stock = Stock.objects.filter(perfume=obj)
        return sum([s.quantity for s in stock])
    stock_quantity.short_description = "Stock Quantity"

admin.site.register(Perfume, PerfumeAdmin)


class StockAdmin(admin.ModelAdmin):
    list_display = ("perfume", "quantity")
    list_filter = ("perfume",)

admin.site.register(Stock, StockAdmin)


class OrderStatusAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)

admin.site.register(Order_statu, OrderStatusAdmin)


# Order Admin Interface
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "total", "status", "created_at", "item_count", "revenue")
    list_filter = ("status", "created_at")
    search_fields = ("user__username", "address", "city", "phone")

    # Custom method to count the number of items in an order
    def item_count(self, obj):
        return obj.order_items.count()
    item_count.short_description = "Item Count"

    # Custom method to calculate the total revenue for the order
    def revenue(self, obj):
        return obj.total  # Assuming total is stored as the revenue for the order
    revenue.short_description = "Total Revenue"

admin.site.register(Order, OrderAdmin)


# Order Item Admin Interface
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "perfume", "quantity", "total")
    search_fields = ("order__id", "perfume__name")

admin.site.register(Order_item, OrderItemAdmin)
