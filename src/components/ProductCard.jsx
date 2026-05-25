import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from './Button';
import './ProductCard.css';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from './Button';
import './ProductCard.css';
import { ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const defaultVariant = product.variants[0];


  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, defaultVariant, 1);
  };

  return (
    <div className="product-card-container minimal-card">
      <Link 
        to={`/product/${product.id}`} 
        className="product-card fade-in" 
        style={{ position: 'relative', overflow: 'hidden', display: 'block' }}
      >
        
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
    </div>
  );
};

export default ProductCard;
