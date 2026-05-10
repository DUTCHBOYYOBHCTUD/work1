import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';
import './CartDrawer.css';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn hover-lift" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is currently empty.</p>
              <Button variant="primary" onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={`${item.id}-${item.variant.size}-${index}`} className="cart-item fade-in">
                <div className="cart-item-image">
                  {/* Placeholder */}
                </div>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="item-variant">Size: {item.variant.size}</p>
                  <div className="item-price-qty">
                    <span className="price">₹{item.variant.price * item.quantity}</span>
                    <div className="qty-controls">
                      <button onClick={() => updateQuantity(item.id, item.variant.size, item.quantity - 1)}><Minus size={14}/></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.variant.size, item.quantity + 1)}><Plus size={14}/></button>
                    </div>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id, item.variant.size)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <p className="shipping-note">Shipping & taxes calculated at checkout</p>
            <Button 
              variant="primary" 
              className="checkout-btn"
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout');
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
