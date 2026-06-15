import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CustomCursor from './components/CustomCursor';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import FAQ from './pages/FAQ';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <CustomCursor />
        <div className="app-container">
          {/* Global Ambient Aura Layer to ensure frosted glass is visible globally */}
          <div className="global-ambient-bg" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '20%', left: '10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(255,122,0,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(30,86,49,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }} />
          </div>
          <Navbar />
          <CartDrawer />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
