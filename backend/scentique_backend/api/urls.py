from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("login/", views.login, name="login"),
    path("categories/", views.categories, name="categories"),
    path("category/<int:category_id>/", views.get_perfumes_by_category, name="perfumes_category"),
    path("update_cart/", views.update_cart, name="update_cart"),
    path("remove_cart/", views.remove_from_cart, name="remove_from_cart"),
    path("search/<str:keyword>/", views.search, name="search"),
    path("cart/", views.get_cart_items, name="cart"),
    path('new_order/', views.create_order, name='create_order'),
    path('orders/', views.get_user_orders, name='get_user_orders')
]