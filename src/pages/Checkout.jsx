import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { ShieldCheck, CheckCircle, Truck } from 'lucide-react';
import './Checkout.css';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const shippingCost = cartTotal > 500 ? 0 : 50;
  const finalTotal = cartTotal + shippingCost;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsProcessing(true);

    // --- CLIENT WHATSAPP NUMBER ---
    const CLIENT_WHATSAPP_NUMBER = "919745511128"; 
    
    // Constructing the WhatsApp receipt
    let message = `*New COD Order!* 📦\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    if(formData.email) message += `Email: ${formData.email}\n`;
    message += `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n\n`;
    
    message += `*Order Items:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.variant.size}) - ${item.quantity}x = ₹${item.variant.price * item.quantity}\n`;
    });
    
    message += `\n*Subtotal:* ₹${cartTotal}\n`;
    message += `*Shipping:* ${shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}\n`;
    message += `*Final Total: ₹${finalTotal} (Cash on Delivery)*\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CLIENT_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Processing animation & redirect
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart();
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Redirect site back to home after 4 seconds
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }, 1500);
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
              <h1 style={{ color: 'var(--color-text-dark)', marginBottom: '10px' }}>Order Placed!</h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '30px', textAlign: 'center' }}>
                Your order receipt has been generated.<br/>
                Please send the pre-filled WhatsApp message to confirm your order.
              </p>
              <p style={{ opacity: 0.7 }}>Redirecting to homepage...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="checkout-header text-center glassmorphism" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
          <h1>Complete Your Order</h1>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--color-text-light)' }}>
            <ShieldCheck size={18} color="var(--color-sage)" /> Secure Checkout
          </p>
        </div>

        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          
          {/* Left Column - Shipping Details */}
          <div className="checkout-main glassmorphism" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ marginBottom: '24px' }}>Shipping Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required disabled={isProcessing} />
              </div>
              <div className="form-group">
                <label>Phone Number (WhatsApp)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" required disabled={isProcessing} />
              </div>
              <div className="form-group full-width">
                <label>Email Address (Optional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" disabled={isProcessing} />
              </div>
              <div className="form-group full-width">
                <label>Delivery Address</label>
                <textarea rows="3" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Street Name, Apartment, etc." required disabled={isProcessing}></textarea>
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Mumbai" required disabled={isProcessing} />
              </div>
              <div className="form-group">
                <label>PIN Code</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="400001" required disabled={isProcessing} />
              </div>
            </div>

            <h2 style={{ marginTop: '40px', marginBottom: '24px' }}>Payment Method</h2>
            <div className="payment-options">
              <div className="payment-method active" style={{ cursor: 'default' }}>
                <Truck size={24} color="var(--color-sage)" />
                <span style={{ fontWeight: 600 }}>Cash on Delivery (COD)</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '8px' }}>Pay with cash when your order arrives.</p>
              </div>
            </div>
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
                style={{ width: '100%', marginTop: '30px', padding: '18px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                {isProcessing ? 'Generating Receipt...' : `Place Order via WhatsApp`}
              </Button>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '16px' }}>
                You will be redirected to WhatsApp to confirm your order details.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;
