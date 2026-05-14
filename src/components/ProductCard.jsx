import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from './Button';
import './ProductCard.css';
import { ShoppingBag } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const defaultVariant = product.variants[0];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.2), transparent 80%)`;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, defaultVariant, 1);
  };

  return (
    <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={2000} className="product-card-container">
      <Link 
        to={`/product/${product.id}`} 
        className="product-card fade-in glassmorphism" 
        onMouseMove={handleMouseMove}
        style={{ position: 'relative', overflow: 'hidden', display: 'block' }}
      >
        <motion.div
          className="spotlight-overlay"
          style={{ background, position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        />
        
        <div className="product-image-wrapper">
          {product.image.endsWith('.mp4') ? (
            <video 
              src={product.image} 
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            />
          ) : (
            <img 
              src={product.image} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            />
          )}
          <div className="quick-actions" style={{ zIndex: 2 }}>
            <Button variant="primary" onClick={handleAddToCart} className="quick-add-btn" disabled={!product.inStock}>
              <ShoppingBag size={18} /> {product.inStock ? "Quick Add" : "Price TBA"}
            </Button>
          </div>
        </div>
        <div className="product-info" style={{ position: 'relative', zIndex: 2 }}>
          <div className="category-badge">{product.category}</div>
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">
            {product.inStock ? `₹${defaultVariant.price} ` : "Price TBA "}
            {product.inStock && <span>/ {defaultVariant.size}</span>}
          </p>
        </div>
      </Link>
    </Tilt>
  );
};

export default ProductCard;
