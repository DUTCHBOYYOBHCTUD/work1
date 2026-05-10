import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { CreditCard, Smartphone, ShieldCheck, CheckCircle } from 'lucide-react';
import './Checkout.css';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const shippingCost = cartTotal > 500 ? 0 : 50;
  const finalTotal = cartTotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsProcessing(true);

    // Simulate API delay for Payment Gateway
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart();

      // Redirect to home after 4 seconds
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }, 2500);
  };

  if (cartItems.length === 0 && !paymentSuccess) {
    return (
      <div className="checkout-page" style={{ paddingTop: '160px', paddingBottom: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glassmorphism" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <h2>Your cart is empty</h2>
          <p style={{ marginBottom: '20px', color: 'var(--color-text-light)' }}>Add some items to your cart to proceed with checkout.</p>
          <Button variant="primary" onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ paddingTop: '160px', paddingBottom: '80px', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        
        <AnimatePresence>
          {paymentSuccess && (
            <motion.div 
              className="success-overlay glassmorphism"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            >
              <CheckCircle size={80} color="var(--color-sage)" style={{ marginBottom: '20px' }} />
              <h1 style={{ color: 'var(--color-text-dark)', marginBottom: '10px' }}>Payment Successful!</h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '30px' }}>Thank you for your order. We are preparing it for shipment.</p>
              <p style={{ opacity: 0.7 }}>Redirecting to homepage...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="checkout-header text-center glassmorphism" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
          <h1>Secure Checkout</h1>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--color-text-light)' }}>
            <ShieldCheck size={18} color="var(--color-sage)" /> 256-bit SSL Encrypted
          </p>
        </div>

        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          
          {/* Left Column - Billing & Payment */}
          <div className="checkout-main glassmorphism" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ marginBottom: '24px' }}>Shipping Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required disabled={isProcessing} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" required disabled={isProcessing} />
              </div>
              <div className="form-group full-width">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required disabled={isProcessing} />
              </div>
              <div className="form-group full-width">
                <label>Delivery Address</label>
                <textarea rows="3" placeholder="123 Street Name, Apartment, etc." required disabled={isProcessing}></textarea>
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="Mumbai" required disabled={isProcessing} />
              </div>
              <div className="form-group">
                <label>PIN Code</label>
                <input type="text" placeholder="400001" required disabled={isProcessing} />
              </div>
            </div>

            <h2 style={{ marginTop: '40px', marginBottom: '24px' }}>Payment Method</h2>
            <div className="payment-options">
              <div className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => !isProcessing && setPaymentMethod('card')}>
                <CreditCard size={24} />
                <span>Credit / Debit Card</span>
              </div>
              <div className={`payment-method ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => !isProcessing && setPaymentMethod('upi')}>
                <Smartphone size={24} />
                <span>UPI / Net Banking</span>
              </div>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="card-details fade-in">
                <div className="form-group full-width">
                  <label>Card Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" required disabled={isProcessing} />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" required disabled={isProcessing} />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="password" placeholder="XXX" required disabled={isProcessing} />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="upi-details fade-in">
                <div className="form-group full-width">
                  <label>UPI ID</label>
                  <input type="text" placeholder="username@upi" required disabled={isProcessing} />
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginTop: '8px' }}>
                  You will receive a payment request on your UPI app.
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="checkout-sidebar">
            <div className="order-summary glassmorphism" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '120px' }}>
              <h2 style={{ marginBottom: '24px' }}>Order Summary</h2>
              
              <div className="summary-items">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="summary-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Size: {item.variant.size} x {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ₹{item.variant.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="place-order-btn" 
                type="submit" 
                disabled={isProcessing}
                style={{ width: '100%', marginTop: '30px', padding: '18px', fontSize: '1.2rem' }}
              >
                {isProcessing ? 'Processing Payment...' : `Pay ₹${finalTotal}`}
              </Button>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '16px' }}>
                By placing your order, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;
