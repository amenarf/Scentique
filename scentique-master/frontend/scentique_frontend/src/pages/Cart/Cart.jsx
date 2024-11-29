import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [perfumeList, setPerfumeList] = useState([]);
    const [total, setTotal] = useState(0);

    const token = localStorage.getItem("Token");
    if (!token) {
        console.error("No token found");
        return null;
    }

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axios.get('/api/cart/', {
                    headers: { Authorization: `Bearer ${token}` }, // Corrected string interpolation
                });
                const items = response.data;
                setPerfumeList(items.items);
                setTotal(items.total);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [token]);

    const removeFromCart = async (itemId) => {
        try {
            const itemToRemove = perfumeList.find((item) => item.id === itemId);
            if (!itemToRemove) return;

            setPerfumeList((prevPerfumeList) =>
                prevPerfumeList.filter((item) => item.id !== itemId)
            );

            const updatedTotal = perfumeList
                .filter((item) => item.id !== itemId)
                .reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotal(updatedTotal);

            const token = localStorage.getItem("Token");
            const request = {
                token: token,
                data: {
                    id: itemToRemove.id,
                },
            };
            const response = await axios.post('/api/remove_cart/', request);

            if (response.status === 200) {
                console.log("Item successfully removed from cart");
                localStorage.setItem("Token", response.data.token);
            } else {
                console.error("Error removing item from cart:", response.data.message);
            }
        } catch (error) {
            console.error("Error while updating cart:", error);
            setPerfumeList((prevPerfumeList) => [...prevPerfumeList]);
        }
    };

    return (
        <div className='cart'>
            <div className="cart_items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {perfumeList.map((item) => (
                    <div key={item.id}>
                        <div className='cart-items-title cart-items-item'>
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.quantity}</p>
                            <p>{item.price * item.quantity}</p>
                            <p
                                onClick={() => removeFromCart(item.id)}
                                className='cross'
                            >
                                x
                            </p>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>

            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Sub total</p>
                            <p>{total} $</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>7 $</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <br />
                            <b>{total + 7} $</b>
                        </div>
                    </div>
                    <Link to="/delivery" state={{ total: total + 7 }}>
                        <button>Proceed to order form</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
