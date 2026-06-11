import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // Don't hide the island if the mobile menu is open!
    if (latest > previous && latest > 150 && !isMobileMenuOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <div className="navbar-wrapper">
      <motion.header 
        layout
        className={`dynamic-island ${isMobileMenuOpen ? 'expanded' : ''}`}
        variants={{
          visible: { y: 0, opacity: 1, scale: 1 },
          hidden: { y: -100, opacity: 0, scale: 0.95 }
        }}
        initial="visible"
        animate={isHidden ? "hidden" : "visible"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ borderRadius: isMobileMenuOpen ? '24px' : '50px' }}
      >
        <motion.div layout className="navbar-container">
          <motion.div layout className="mobile-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ cursor: 'pointer' }}>
            {isMobileMenuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
          </motion.div>
          
          <Link to="/" className="brand-logo" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.img 
              layout
              whileHover={{ scale: 1.05 }}
              src="/media/logo.jpeg" 
              alt="Jozef Foods" 
              className="logo-image"
            />
          </Link>

          <nav className="nav-links desktop-nav" onMouseLeave={() => setHoveredIndex(null)}>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="nav-item"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <span style={{ position: 'relative', zIndex: 1, color: isActive ? '#fff' : 'rgba(255,255,255,0.7)', fontWeight: isActive ? 600 : 400 }}>{item.name}</span>
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="nav-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <motion.nav layout className="nav-links right-nav">
            <motion.button 
              layout
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cart-trigger" 
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={22} color="#fff" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="cart-badge"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </motion.nav>
        </motion.div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mobile-dropdown-content"
            >
              <nav className="mobile-nav-list">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    className="mobile-nav-item"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
};

export default Navbar;
