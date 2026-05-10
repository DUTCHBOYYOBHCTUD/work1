import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h3>Jozef Foods</h3>
          <p>Homemade Goodness in Every Jar. Authentic, preservative-free pickles and spice powders.</p>
          <div className="social-links">
            <a href="#" className="hover-lift" style={{fontWeight: 'bold', fontSize: '0.9rem', textDecoration: 'none'}}>IG</a>
            <a href="#" className="hover-lift" style={{fontWeight: 'bold', fontSize: '0.9rem', textDecoration: 'none'}}>FB</a>
            <a href="#" className="hover-lift" style={{fontWeight: 'bold', fontSize: '0.9rem', textDecoration: 'none'}}>X</a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Shop</h4>
            <Link to="/shop?category=Pickles">Pickles</Link>
            <Link to="/shop?category=Powders">Spice Powders</Link>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="link-group">
            <h4>Support</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/faq#shipping">Shipping</Link>
            <Link to="/faq#returns">Returns</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Jozef Foods. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
