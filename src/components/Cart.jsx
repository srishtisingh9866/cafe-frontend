import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css"; // Import the CSS file

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => sum + value.qty * value.price, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>
      {error && <div className="cart-error">{error}</div>}
      <ul className="cart-list">
        {cart &&
          cart.map(
            (value) =>
              value.qty > 0 && (
                <li className="cart-item" key={value._id}>
                  <div className="cart-item-details">
                    <span>
                      <strong>{value.productName}</strong>
                    </span>
                    <span>Price: ₹{value.price}</span>
                    <span>Total: ₹{value.price * value.qty}</span>
                  </div>
                  <div className="cart-item-controls">
                    <button onClick={() => decrement(value._id, value.qty)}>-</button>
                    <span>{value.qty}</span>
                    <button onClick={() => increment(value._id, value.qty)}>+</button>
                  </div>
                </li>
              )
          )}
      </ul>
      <div className="order-value">Order Value: ₹{orderValue}</div>
      <p>
        {user?.token ? (
          <button className="cart-action-btn" onClick={placeOrder}>Place Order</button>
        ) : (
          <button className="cart-action-btn" onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </p>
    </div>
  );
}