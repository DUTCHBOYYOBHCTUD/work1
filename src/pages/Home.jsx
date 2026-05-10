import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import './Home.css';
import { ShieldCheck, Heart, Leaf } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WaveDivider = () => (
  <svg viewBox="0 0 1440 120" className="wave-divider" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80px', zIndex: 2, display: 'block' }}>
    <path d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z" fill="var(--color-cream)"></path>
  </svg>
);

const Home = () => {
  const featuredProducts = products.slice(0, 3);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Faster stagger for letters
        delayChildren: 0.1
      }
    }
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
    <div className="home-page">
      {/* Background Blobs for organic aesthetic */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '90vh' }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
        
        <motion.div 
          className="container hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ 
            position: 'relative', 
            zIndex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            height: '100%'
          }}
        >
          <motion.h1 variants={itemVariants} style={{ fontSize: '6rem', lineHeight: '1.1', textShadow: '0 10px 30px rgba(0,0,0,0.15)', position: 'relative', zIndex: 10, color: 'var(--color-text-dark)', paddingBottom: '20px' }}>Homemade Goodness <br/>in Every Jar</motion.h1>
          <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px auto', color: 'var(--color-text-light)' }}>
            Experience the authentic taste of tradition with our premium homemade pickles and spice powders. 
            Crafted with love, patience, and no artificial preservatives.
          </motion.p>
          <motion.div className="hero-actions" variants={itemVariants}>
            <Link to="/shop">
              <Button variant="primary">Shop Now</Button>
            </Link>
            <Link to="/about">
              <Button variant="outline">Our Story</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="section-padding category-section" style={{ position: 'relative' }}>
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="category-grid">
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link to="/shop?category=Pickles" className="category-card hover-lift floating-element" style={{ backgroundImage: 'url(/media/limepickle1.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="category-overlay">
                  <h2>Pickles</h2>
                  <p>Tangy, spicy, and perfectly aged</p>
                </div>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link to="/shop?category=Spice Powders" className="category-card hover-lift floating-element-delayed" style={{ backgroundImage: 'url(/media/prawnpowder1.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="category-overlay">
                  <h2>Spice Powders</h2>
                  <p>Aromatic blends for everyday meals</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="section-padding featured-section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-center section-title" style={{ fontSize: '3rem', marginBottom: '60px' }}>Featured Favorites</motion.h2>
          <motion.div variants={itemVariants} className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
          <motion.div variants={itemVariants} className="text-center" style={{ marginTop: '60px' }}>
            <Link to="/shop">
              <Button variant="secondary">View All Products</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding features-section" style={{ margin: 0, borderRadius: 0 }}>
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-center section-title" style={{ fontSize: '3rem', marginBottom: '60px' }}>Why Choose Jozef Foods</motion.h2>
          <div className="features-grid">
            <motion.div variants={itemVariants} className="feature-card floating-element glassmorphism" whileHover={{ y: -20 }}>
              <Heart className="feature-icon" size={48} />
              <h3>Homemade with Love</h3>
              <p>Prepared in small batches to ensure the highest quality and authentic taste, just like grandma used to make.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="feature-card floating-element-delayed glassmorphism" whileHover={{ y: -20 }}>
              <ShieldCheck className="feature-icon" size={48} />
              <h3>No Preservatives</h3>
              <p>We use 100% natural ingredients. No artificial colors, flavors, or chemical preservatives are ever added.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="feature-card floating-element glassmorphism" whileHover={{ y: -20 }}>
              <Leaf className="feature-icon" size={48} />
              <h3>Authentic Recipes</h3>
              <p>Our recipes have been passed down through generations, ensuring you get the true taste of tradition.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
