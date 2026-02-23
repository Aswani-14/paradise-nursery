import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeItem } from "../redux/CartSlice";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar
        cartQuantity={cartItems.reduce((total, item) => total + item.quantity, 0)}
      />
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="100" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
          <h3>Total Cart Amount: ${totalAmount}</h3>
          <div className="cart-actions">
            <Link to="/products">
              <button>Continue Shopping</button>
            </Link>
            <button onClick={() => alert("Checkout Coming Soon!")}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
