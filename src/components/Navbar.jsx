import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
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
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <motion.header 
      className="navbar-header glassmorphism"
      variants={{
        visible: { y: 20, x: "-50%", opacity: 1, scale: 1 },
        hidden: { y: -100, x: "-50%", opacity: 0, scale: 0.95 }
      }}
      initial="visible"
      animate={isHidden ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="navbar-container">
        <div className="mobile-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ cursor: 'pointer' }}>
          <Menu size={24} />
        </div>
        
        <Link to="/" className="brand-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.img 
            whileHover={{ scale: 1.05 }}
            src="/media/logo.jpeg" 
            alt="Jozef Foods" 
            style={{ height: '60px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
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
                <span style={{ position: 'relative', zIndex: 1, color: isActive ? 'var(--color-text-dark)' : 'inherit', fontWeight: isActive ? 600 : 400 }}>{item.name}</span>
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

        <nav className="nav-links right-nav">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cart-trigger" 
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={24} />
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
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div 
        className="mobile-dropdown"
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        style={{ overflow: 'hidden', width: '100%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: '12px', marginTop: isMobileMenuOpen ? '10px' : '0' }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', padding: isMobileMenuOpen ? '10px 0' : '0' }}>
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="mobile-nav-item"
              style={{ padding: '12px 20px', color: 'var(--color-text-dark)', fontWeight: 500, borderBottom: '1px solid rgba(0,0,0,0.05)' }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
