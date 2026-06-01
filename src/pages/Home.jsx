import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import './Home.css';
import { ShieldCheck, Heart, Leaf } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WaveDivider = () => null; // Removed for clean minimalism

const Home = () => {
  const featuredProducts = products.slice(0, 3);
  const { scrollYProgress } = useScroll();
  
  // Gentle Parallax transforms mapped to scroll progress
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yFloat1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  
  const rotateMain = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const rotateFloat1 = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const rotateFloat2 = useTransform(scrollYProgress, [0, 1], [0, 5]);

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
      {/* Clean Abstract Shapes */}
      <div className="bg-shape shape-orange"></div>
      <div className="bg-shape shape-green"></div>

      <section className="hero-section minimal-hero">
        <div className="container hero-container">
          <motion.div 
            className="hero-text-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants}>
              Pure & <br/> Organic <br/> Food Products
            </motion.h1>
            <motion.p variants={itemVariants} className="hero-subtitle">
              From the land of spices to the world. 100% pure and organically grown spices.
            </motion.p>
            <motion.div variants={itemVariants} className="hero-actions">
              <Link to="/shop">
                <Button variant="primary">SHOP NOW</Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-image-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* The Creative Minimal Floating Images */}
            <div className="image-collage">
              <motion.img 
                src="/media/prawnpowder1.jpeg" 
                alt="Spices" 
                className="collage-img main-img"
                style={{ y: yMain, rotate: rotateMain }}
              />
              <motion.img 
                src="/media/carrotpickle2.jpeg" 
                alt="Pickle" 
                className="collage-img float-img-1"
                style={{ y: yFloat1, rotate: rotateFloat1 }}
              />
              <motion.img 
                src="/media/01.jpg.jpeg" 
                alt="Garlic" 
                className="collage-img float-img-2"
                style={{ y: yFloat2, rotate: rotateFloat2 }}
              />
            </div>
          </motion.div>
        </div>
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
            <motion.div variants={itemVariants} className="feature-card minimal-card floating-element" whileHover={{ y: -10 }}>
              <Heart className="feature-icon" size={48} />
              <h3>Homemade with Love</h3>
              <p>Prepared in small batches to ensure the highest quality and authentic taste, just like grandma used to make.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="feature-card minimal-card floating-element-delayed" whileHover={{ y: -10 }}>
              <ShieldCheck className="feature-icon" size={48} />
              <h3>No Preservatives</h3>
              <p>We use 100% natural ingredients. No artificial colors, flavors, or chemical preservatives are ever added.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="feature-card minimal-card floating-element" whileHover={{ y: -10 }}>
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
