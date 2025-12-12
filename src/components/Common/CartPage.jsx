import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import "./CartPage.css";

function CartPage() {
  const {
    cartItems,
    cartCount,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});
  const handleQuantityChange = (id, quantity) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
    updateQuantity(id, quantity);
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }, 300);
  };

  const handleRemove = (id) => {
    if (window.confirm("Remove this item from cart?")) {
      removeFromCart(id);
      toast.success("Item removed from cart!");
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Clear all items from cart?")) {
      clearCart();
      toast.info("Cart cleared!");
    }
  };

  const handleCheckout = () => {
    if (cartCount === 0) {
      toast.error("Cart is empty!");
      return;
    }
    toast.success(`Proceeding to checkout... Total: ₹${getTotalPrice()}`);
    navigate("/");
  };

  if (cartCount === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-content">
          <h2>Your Cart is Empty</h2>
          <p>Add some delicious sweets to get started!</p>
          <button className="continue-shopping" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>My Cart ({cartCount} items)</h1>
        {cartCount > 0 && (
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        )}
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="item-category">{item.category}</p>
              <p className="item-price">₹{item.price}/piece</p>
            </div>
            <div className="cart-item-quantity">
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={loading[item.id] || item.quantity <= 1}
              >
                -
              </button>
              <span className="qty">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                disabled={loading[item.id]}
              >
                +
              </button>
            </div>
            <div className="cart-item-total">
              ₹{(item.price * item.quantity).toLocaleString()}
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Total Items:</span>
          <span>{cartCount}</span>
        </div>
        <div className="summary-row total">
          <span>Total Amount:</span>
          <span>₹{getTotalPrice().toLocaleString()}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
