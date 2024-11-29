from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import *
from database.models import *
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.conf import settings

def get_tokens_for_user(user, cart, username):
    token = RefreshToken.for_user(user)
    token["cart"] = cart
    token["username"] = username

    return {
        "refresh": str(token),
        "access": str(token.access_token),
    }

def decode_token(token):
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return decoded_token
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token"}
    

@api_view(["POST"])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = serializer.save()
            return Response({
                "success": True,
                "message": "Registeration successful"
            }, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({
                "success": False,
                "message": "Something went wrong. Please try again."
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    else:
        username = serializer["username"].value
        email = serializer["email"].value
        if User.objects.filter(username=username).exists():
            return Response({
                "success": False,
                "message": "Username is already taken."
                }, status=status.HTTP_400_BAD_REQUEST
            )

        elif User.objects.filter(email=email).exists():
            return Response({
                "success": False,
                "message": "Email is already registered."
                }, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return Response({
                "success": False,
                "message": "Something went wrong. Please try again."
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user is not None:
        cart = {}
        tokens = get_tokens_for_user(user, cart, username)
        response = Response({
            "success": True,
            "token": tokens["access"], 
            "message": "Login successful",
        }, status=status.HTTP_200_OK)

        response.set_cookie(
            key='refresh_token',
            value=tokens['refresh'],
            httponly=True,  
            secure=True,
            samesite='Lax',
            max_age=7 * 24 * 60 * 60
        )
        
        return response
    else:
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET"])
def categories(request):
    category_list = Category.fetch_categories()
    serializer = CategorySerializer(category_list, many=True)
    return Response(serializer.data)
     
@api_view(["GET"])
def get_perfumes_by_category(request, category_id):
    category = Category.objects.get(id=category_id)
    serializer = PerfumeSerializer(category.perfumes, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def update_cart(request):
    data = request.data
    update = data["data"]
    token = data["token"]
    decoded_token = decode_token(token)
    cart = decoded_token["cart"]
    cart[update["id"]] = update["quantity"] 
    username = decoded_token["username"] 
    tokens = get_tokens_for_user(request.user, cart, username)
    response = Response({
        "success": True,
        "token": tokens["access"], 
        "message": "Login successful",
    }, status=status.HTTP_200_OK)

    response.set_cookie(
        key='refresh_token',
        value=tokens['refresh'],
        httponly=True,  
        secure=True,
        samesite='Lax',
        max_age=7 * 24 * 60 * 60
    )
    
    return response

   
@api_view(["POST"])
def remove_from_cart(request):
    data = request.data
    update = data["data"]
    token = data["token"]
    decoded_token = decode_token(token)
    cart = decoded_token["cart"]
    del cart[str(update["id"])]
    username = decoded_token["username"] 
    tokens = get_tokens_for_user(request.user, cart, username)
    response = Response({
        "success": True,
        "token": tokens["access"], 
        "message": "Login successful",
    }, status=status.HTTP_200_OK)

    response.set_cookie(
        key='refresh_token',
        value=tokens['refresh'],
        httponly=True,  
        secure=True,
        samesite='Lax',
        max_age=7 * 24 * 60 * 60
    )
    return response


@api_view(["GET"])
def get_cart_items(request):
    token = request.headers.get('Authorization').split()[1]
    decoded_token = decode_token(token)
    cart = decoded_token["cart"]
    total = 0
    perfumes = []
    for perfume_id, quantity in cart.items():
        if int(quantity) > 0:
            perfume = Perfume.objects.get(id=perfume_id)
            serializer = PerfumeSerializer(perfume)
            perfume_info = serializer.data
            perfume_info["quantity"] = int(quantity)
            total += perfume_info["price"] * perfume_info["quantity"]
            perfumes.append(perfume_info)
    return Response({
        "items": perfumes,
        "total": total,
    }, status=status.HTTP_200_OK)
    
@api_view(["GET"])
def search(request, keyword):
    if not keyword:
        response = {"success": False,
                    "message": "Oops nothing matched your keyword try something else"}
    else:
        results = Perfume.objects.filter(name__icontains=keyword)
        serializer = PerfumeSerializer(results, many=True)
        if not serializer.data:
            response = {"success": False,
                        "message": "Oops nothing matched your keyword try something else"}
        else:
            response = {"success": True,
                        "data": serializer.data}
    return Response(response)

@api_view(['POST'])
def create_order(request):
    data = request.data
    token = data.get("token")
    decoded_token = decode_token(token)
    username = decoded_token.get("username")
    cart = decoded_token.get("cart")

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    order_data = {
        "user": user,
        "name": data.get("name"),
        "address": data.get("address"),
        "city": data.get("city"),
        "phone": data.get("phone"),
        "total": data.get("total"),
        "status": Order_statu.objects.get(id=1),
    }
    order = Order.objects.create(**order_data)
    for perfume_id, quantity in cart.items():
        try:
            perfume = Perfume.objects.get(id=perfume_id)
            total_price = perfume.price * int(quantity)
            Order_item.objects.create(
                order=order,
                perfume=perfume,
                quantity=int(quantity),
                total=total_price
            )
        except Perfume.DoesNotExist:
            return Response({"error": f"Perfume with ID {perfume_id} not found"}, status=status.HTTP_400_BAD_REQUEST)
    cart = {}
    tokens = get_tokens_for_user(user, cart, username)
    response = Response({
        "success": True,
        "token": tokens["access"], 
    }, status=status.HTTP_201_CREATED)

    response.set_cookie(
        key='refresh_token',
        value=tokens['refresh'],
        httponly=True,  
        secure=True,
        samesite='Lax',
        max_age=7 * 24 * 60 * 60
    )
        
    return response

@api_view(['GET'])
def get_user_orders(request):
    token = request.headers.get("Authorization")  # Get token from the Authorization header
    if not token:
        return Response({"error": "Token is required."}, status=400)

    decoded_token = decode_token(token)
    username = decoded_token.get("username")
    if not username:
        return Response({"error": "Invalid token."}, status=401)

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)

    orders = OrderSerializer(user.orders, many=True).data
    response_data = []
    for order in orders:
        order_ = Order.objects.get(id= order["id"])
        items = OrderItemSerializer(order_.order_items, many=True).data
        for item in items:
            perfume = Perfume.objects.get(id=item["perfume"])
            perfume_data = PerfumeSerializer(perfume).data
            item["name"] = perfume_data["name"]
            item["image"] = perfume_data["image"]
            item["price"] = perfume_data["price"]         
        status = Order_statu.objects.get(id=order["status"])
        response_data.append({
            "id": order["id"],
            "total": order["total"],
            "status": OrderStatusSerializer(status).data["name"],
            "updated_at": order["updated_at"],
            "items": items
        })
    return Response(response_data)