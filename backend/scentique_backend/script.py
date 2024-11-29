import os
import django

# Set the environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "scentique_backend.settings")  # Adjust path as necessary

# Setup Django
django.setup()
from database.models import*
categories = [
    {
      "name": "Floral",
      "perfumes": [
        {
          "name": "Rose Elegance",
          "description": "A refined fragrance with a delicate touch of rose, perfect for lovers of soft floral scents.",
          "price": 160,
          "image": "https://th.bing.com/th/id/OIP.omI_WLESZkXh4BBd7-3qKgHaKG?rs=1&pid=ImgDetMain"
        },
        {
          "name": "Lily Dream",
          "description": "An airy blend of fresh lilies that evokes feelings of purity and lightness.",
          "price": 145,
          "image": "https://th.bing.com/th/id/OIP.iwgj3oki8t_VgVhIjaf4BgHaLH?rs=1&pid=ImgDetMain"
        },
        {
          "name": "Jasmine Whisper",
          "description": "An enchanting jasmine fragrance that whispers elegance and mystery.",
          "price": 175,
          "image": "https://th.bing.com/th/id/R.656ad2690ff78a0bf9066c935a403045?rik=LIMY98AfZ9AFXw&pid=ImgRaw&r=0"
        },
        {
          "name": "Peony Charm",
          "description": "Delicate peony combines with subtle hints of floral freshness.",
          "price": 190,
          "image": "https://cdn.shopify.com/s/files/1/0573/9967/2993/products/Peony-80ml-1b_1024x1024.jpg?v=1624966531"
        }
      ]
    },
    {
      "name": "Woody",
      "perfumes": [
        {
          "name": "Cedar Mystique",
          "description": "Deep notes of cedar for a mysterious and natural allure.",
          "price": 210,
          "image": "https://th.bing.com/th/id/OIP.7rpH_vJWarU0sBTzq8oFXgHaD4?w=328&h=180&c=7&r=0&o=5&pid=1.7"
        },
        {
          "name": "Sandalwood Aura",
          "description": "A warm and woody fragrance, capturing the essence of sandalwood.",
          "price": 230,
          "image": "https://th.bing.com/th/id/OIP.0bslAWcYtDd4jtewwDPkqQHaHU?rs=1&pid=ImgDetMain"
        },
        {
          "name": "Oak Harmony",
          "description": "A perfect harmony of robust oak wood and soft notes.",
          "price": 250,
          "image": "https://th.bing.com/th/id/R.6f5056b6ee13472905198ef6da267c25?rik=LCJcD7dqtbUBoA&riu=http%3a%2f%2fwww.shopaholic.com.pk%2fcdn%2fshop%2ffiles%2fHarmony-parfume-100ml.jpg%3fv%3d1690455135&ehk=Sbb0tsFlHyXRwRN1TPRY8WJXNKQH5ZFuioMfk38KDws%3d&risl=&pid=ImgRaw&r=0"
        },
        {
          "name": "Pine Enigma",
          "description": "Fresh and woody notes of pine that awaken the senses with intensity.",
          "price": 220,
          "image": "https://www.luxperfume.net/uploads/source/kilian-va-tf-va-roja/roja-parfums-enigma-parfum-cologne-16628732441608974151.jpg"
        }
      ]
    },
    {
      "name": "Citrus",
      "perfumes": [
        {
          "name": "Lemon Zest",
          "description": "An explosion of lemony freshness for a revitalizing spark throughout the day.",
          "price": 130,
          "image": "https://th.bing.com/th/id/OIP.Pt4mJnaGWSG-9Yofe-uDqQHaGe?rs=1&pid=ImgDetMain"
        },
        {
          "name": "Orange Blossom",
          "description": "The sweetness and vibrancy of orange blossom in a radiant fragrance.",
          "price": 160,
          "image": "https://beyondscents.com/productimages/1-2590-451.jpg"
        },
        {
          "name": "Bergamot Breeze",
          "description": "A fresh breeze of bergamot that invigorates the senses.",
          "price": 145,
          "image": "https://th.bing.com/th/id/OIP.S9N2hP1st1xiE1QZCGvhCwAAAA?rs=1&pid=ImgDetMain"
        },
        {
          "name": "Grapefruit Sparkle",
          "description": "A sparkling grapefruit scent for boundless energy.",
          "price": 135,
          "image": "https://th.bing.com/th/id/OIP.DL2DHkbP1xa5iL-MEzImwgAAAA?rs=1&pid=ImgDetMain"
        }
      ]
    },
    {
      "name": "Oriental",
      "perfumes": [
        {
          "name": "Spicy Seduction",
          "description": "A seductive and spicy blend for lovers of oriental fragrances.",
          "price": 220,
          "image": "https://duty-free-japan.jp/narita/en/images/item/5405810231.jpg"
        },
        {
          "name": "Amber Glow",
          "description": "The glow of amber wraps you in comforting and enchanting warmth.",
          "price": 235,
          "image": "https://th.bing.com/th/id/R.2ac811a82d63a816a88b75701b7d730d?rik=i8FMMgOzcjDvPQ&pid=ImgRaw&r=0"
        },
        {
          "name": "Vanilla Obsession",
          "description": "A sweet and addictive vanilla fragrance for relaxing moments.",
          "price": 190,
          "image": "https://th.bing.com/th/id/OIP.OSww_uA841UFBZ078WE1hgHaHa?rs=1&pid=ImgDetMain.jpg"
        },
        {
          "name": "Cinnamon Kiss",
          "description": "A spicy kiss of cinnamon to awaken your senses.",
          "price": 200,
          "image": "https://th.bing.com/th/id/OIP.BFCQ4UloD9CNFBH7A05ecQAAAA?rs=1&pid=ImgDetMain"
        }
      ]
    },
    {
      "name": "Fruity",
      "perfumes": [
        {
          "name": "Berry Delight",
          "description": "A cocktail of red fruits for a sweet and irresistible scent.",
          "price": 160,
          "image": "https://th.bing.com/th/id/OIP.7pn92e1u6Yhp5qn8wInTMgAAAA?rs=1&pid=ImgDetMain"
        },
        {
          "name": "Apple Fresh",
          "description": "Crisp green apple notes for instant freshness.",
          "price": 145,
          "image": "https://th.bing.com/th/id/OIP.HLsYmJkVxhPf3Cz-FB08PAAAAA?rs=1&pid=ImgDetMain"
        },
        {
          "name": "Mango Twist",
          "description": "A tropical mango fragrance, bursting with sunshine and exoticism.",
          "price": 150,
          "image": "https://i1.perfumesclub.com/grande/95231.jpg"
        },
        {
          "name": "Peach Bliss",
          "description": "The juicy sweetness of peach, captured in a delicate fragrance.",
          "price": 160,
          "image": "https://th.bing.com/th/id/OIP.BAqMzEzCVL_BlsfFcDdjWwAAAA?rs=1&pid=ImgDetMain"
        }
      ]
    },
    {
      "name": "Aquatic",
      "perfumes": [
        {
          "name": "Ocean Wave",
          "description": "A fresh and marine fragrance that evokes the waves of the ocean.",
          "price": 175,
          "image": "https://th.bing.com/th/id/OIP.j_1jlTV8-7bfA7-pnzkLugHaJu?rs=1&pid=ImgDetMain"
        },
        {
          "name": "Sea Breeze",
          "description": "Salty and fresh notes for a sensation of sea wind.",
          "price": 180,
          "image": "https://th.bing.com/th/id/OIP.ca9TIlblBvaH8Hkzys8UuQHaHa?rs=1&pid=ImgDetMain"
        },
        {
          "name": "Aqua Pure",
          "description": "A clear and transparent fragrance, inspired by crystal-clear water.",
          "price": 190,
          "image": "https://th.bing.com/th/id/OIP.NbuLlnFiTeKJdf-pKpUtVAAAAA?rs=1&pid=ImgDetMain"
        },
        {
          "name": "Marine Energy",
          "description": "An energetic and marine fragrance that invigorates the senses.",
          "price": 185,
          "image": "https://th.bing.com/th/id/OIP.ASMOjZ8s7JS1w2Abdxp3XAAAAA?rs=1&pid=ImgDetMain"
        }
      ]
    }
]



for cat in categories:
    category = Category.objects.get(name=cat["name"])
    for perfume in cat["perfumes"]:
        new_perfume = Perfume.objects.create(**perfume)
        new_perfume.category = category
        new_perfume.save()