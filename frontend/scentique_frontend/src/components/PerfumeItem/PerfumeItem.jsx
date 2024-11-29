import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import './PerfumeItem.css';
import add_icon_white from '../../assets/add_icon_white.png';
import remove_icon_red from '../../assets/remove_icon_red.png';
import add_icon_green from '../../assets/add_icon_green.png';

const PerfumeItem = ({ id, name, description, image, price }) => {
  const [itemCount, setItemCount] = useState(0);

  const updateCart = async (newQuantity) => {
    const token = localStorage.getItem("Token"); // Get token from local storage

    if (!token) {
      console.error("No token found");
      return;
    }

    const request = {
      token: token,
      data: {
        id: `${id}`, 
        quantity: `${newQuantity}`
      }
    };

    try {
      const response = await axios.post('/api/update_cart/', request);

      if (response.data.success) {
        const newToken = response.data.token;  // Get new token from response
        const decodedToken = jwtDecode(newToken); // Decode the new token
        console.log(decodedToken); // For debugging
        localStorage.setItem("Token", newToken); // Store the new token in local storage
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleIncrement = () => {
    const newQuantity = itemCount + 1;
    setItemCount(newQuantity);
    updateCart(newQuantity); // Call to update cart on the backend
  };

  // Decrement quantity (-)
  const handleDecrement = () => {
    if (itemCount > 0) {
      const newQuantity = itemCount - 1;
      setItemCount(newQuantity);
      updateCart(newQuantity); // Call to update cart on the backend
    }
  };

  return (
    <div className="perfume-item">
      <div className="perfume-item-img-container">
        <img className="perfume-item-image" src={image} alt={name} onError="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';"/>
        
        {/* If item count is zero, show the "add" button */}
        {!itemCount ? (
          <img 
            className="add" 
            onClick={handleIncrement} 
            src={add_icon_white} 
            alt="Add to cart" 
          />
        ) : (
          // Show quantity control buttons when item count > 0
          <div className="perfume-item-counter">
            <img 
              onClick={handleDecrement} 
              src={remove_icon_red} 
              alt="Remove one item" 
              className="quantity-control"
            />
            <p>{itemCount}</p>
            <img 
              onClick={handleIncrement} 
              src={add_icon_green} 
              alt="Add one more item" 
              className="quantity-control"
            />
          </div>
        )}
      </div>
      <div className="perfume-item-info">
        <p>{name}</p>
      </div>
      <p className="perfume-item-desc">{description}</p>
      <p className="perfume-item-price">${price}</p>
    </div>
  );
};

export default PerfumeItem;