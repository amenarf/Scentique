import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("On the way");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("Token");

      try {
        const response = await axios.get("/api/orders/", {
          headers: { Authorization: token },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders.");
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  // Filter orders based on status
  useEffect(() => {
    if (orders.length > 0) {
      const filtered = orders.filter(
        (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders([]);
    }
  }, [orders, statusFilter]);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {/* Loading State */}
      {loading && <p>Loading orders...</p>}

      {/* Error State */}
      {error && <p>{error}</p>}

      {/* Status Filter Buttons */}
      <div className="status-filters">
        {["On the way", "In Progress", "Delivered"].map((status) => (
          <button
            key={status}
            className={`filter-btn ${statusFilter === status ? "active" : ""}`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="order-list">
        {!loading && filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-summary">
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Total Price:</strong> ${parseFloat(order.total).toFixed(2)}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Updated:</strong>{" "}
                  {new Date(order.updated_at).toLocaleDateString()}
                </p>
              </div>

              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map((item) => (
                  <div className="order-item" key={item.id}>
                    <div className="order-item-image">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                    <div className="order-item-details">
                      <p>
                        <strong>Name:</strong> {item.name}
                      </p>
                      <p>
                        <strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Total:</strong>{" "}
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No orders found under "{statusFilter}" status.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
