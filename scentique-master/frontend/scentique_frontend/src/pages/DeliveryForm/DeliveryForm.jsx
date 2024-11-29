import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DeliveryForm.css";

const DeliveryForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total } = location.state || { total: 0 };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");
    const orderData = {
      token,
      name,
      address,
      city,
      phone,
      total,
    };

    try {
      const response = await axios.post("/api/new_order/", orderData);
      if (response.status === 201) {
        const token = response.data.token;
        localStorage.setItem("Token", token);
        navigate("/orders");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="delivery-container">
      <div className="delivery-info">
        <h2>Delivery Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <div className="form-row">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className="cart-totals">
            <h2>Cart Totals</h2>
            <table>
              <tbody>
                <tr className="total-row">
                  <td>Total</td>
                  <td>${total}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="submit" className="proceed-btn">Place order</button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
