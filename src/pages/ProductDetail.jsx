import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Heart, Leaf, ChevronLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import './ProductDetail.css';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container section-padding text-center">
        <h2>Product not found</h2>
        <Link to="/shop"><Button variant="primary">Return to Shop</Button></Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 }
    }
  };

  return (
    <div className="product-detail-page section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Aesthetic Blob */}
      <div className="blob blob-1" style={{ top: '20%', left: '40%', opacity: 0.3 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/shop" className="back-link">
            <ChevronLeft size={20} /> Back to Shop
          </Link>
        </motion.div>
        
        <div className="product-detail-layout">
          <motion.div 
            className="product-image-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} glareEnable={true} glareMaxOpacity={0.1}>
              <div className="main-image-placeholder floating-element" style={{ background: 'transparent', backdropFilter: 'none', overflow: 'hidden', padding: 0 }}>
                {product.video ? (
                  <video 
                    src={product.video} 
                    autoPlay muted loop playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>
            </Tilt>
          </motion.div>
          
          <motion.div 
            className="product-info-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="badge">{product.category}</motion.div>
            <motion.h1 variants={itemVariants}>{product.name}</motion.h1>
            <motion.p variants={itemVariants} className="price">
              {product.inStock ? `₹${selectedVariant.price}` : "Price TBA"}
            </motion.p>
            
            <motion.p variants={itemVariants} className="short-desc">{product.longDescription}</motion.p>
            
            <motion.div variants={itemVariants} className="variant-selector">
              <h4>Select Size:</h4>
              <div className="variant-buttons">
                {product.variants.map(variant => (
                  <button 
                    key={variant.size}
                    className={`variant-btn ${selectedVariant.size === variant.size ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="add-to-cart-section">
              <div className="qty-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={!product.inStock}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} disabled={!product.inStock}>+</button>
              </div>
              <Button variant="primary" className="add-btn hover-lift" onClick={handleAddToCart} disabled={!product.inStock}>
                {product.inStock ? `Add to Cart - ₹${selectedVariant.price * quantity}` : "Coming Soon"}
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="trust-badges glassmorphism">
              {product.badges.map((badge, idx) => (
                <div key={idx} className="trust-badge">
                  {badge.includes("Home") || badge.includes("Hand") ? <Heart size={18}/> : 
                   badge.includes("Preservatives") ? <Leaf size={18}/> : <ShieldCheck size={18}/>}
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="detailed-specs">
              <div className="spec-item">
                <h4>Ingredients:</h4>
                <p>{product.ingredients.join(', ')}</p>
              </div>
              <div className="spec-item">
                <h4>Taste Profile:</h4>
                <p>{product.tasteProfile}</p>
              </div>
              <div className="spec-item">
                <h4>Storage Instructions:</h4>
                <p>{product.storageInstructions}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
