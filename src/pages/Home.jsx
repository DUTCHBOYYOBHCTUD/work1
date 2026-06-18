import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import CinematicHero from '../components/CinematicHero';
import './Home.css';
import { ShieldCheck, Heart, Leaf } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const WaveDivider = () => null; // Removed for clean minimalism

const Home = () => {
  const featuredProducts = products.slice(0, 3);
  const { scrollYProgress } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    '/media/prawnpowder1.jpeg',
    '/media/gooseberrypickle1.jpeg',
    '/media/tunapickle1.jpeg',
    '/media/carrotpickle2.jpeg'
  ];

  useEffect(() => {
    // Disable mouse tracking completely on mobile/touch devices to prevent re-render scroll lag
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e) => {
      // Normalize to -1 to 1 for microscopic mapping
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Cycle every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Global Mouse Parallax offsets (microscopic depth)
  const fgX = mousePos.x * -5;
  const fgY = mousePos.y * -5;
  const bgX = mousePos.x * -2;
  const bgY = mousePos.y * -2;
  
  // Bold Parallax transforms mapped to scroll progress for high-end asymmetric scroll
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -50]); // Main stays steady
  const yFloat1 = useTransform(scrollYProgress, [0, 1], [0, -400]); // Left moves extremely fast up
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [0, 200]); // Right moves down fast
  
  const rotateMain = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotateFloat1 = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const rotateFloat2 = useTransform(scrollYProgress, [0, 1], [0, 8]);

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
    <div className="home-page" style={{ position: 'relative' }}>
      {/* Background Ambient Aura Layer */}
      <motion.div 
        animate={{ x: bgX, y: bgY }} 
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      >
        <motion.div 
          className="bg-shape shape-orange"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 0],
            x: [0, 200, 0],
            y: [0, -150, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="bg-shape shape-green"
          animate={{
            scale: [1, 1.6, 1],
            rotate: [0, -180, 0],
            x: [0, -250, 0],
            y: [0, 200, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Watercolor Mango Watermark */}
        <motion.img 
          src="/media/vibrant-mango-branch-illustration.png" 
          alt="Mango Watercolor" 
          className="mango-watermark"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <section className="hero-section minimal-hero">
        <div className="hero-container">
          <motion.div 
            className="hero-text-content glass-panel"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants} style={{ color: '#1E5631', fontWeight: 800 }}>
              Pure & Organic Food Products
            </motion.h1>
            <motion.p variants={itemVariants} className="hero-subtitle" style={{ color: '#2E7D32', fontWeight: 600 }}>
              From the land of spices to the world. 100% pure and organically grown spices.
            </motion.p>
            <motion.div variants={itemVariants} className="hero-actions">
              <Link to="/shop">
                <Button variant="primary">SHOP NOW</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CinematicHero />

      {/* Why Choose Us */}
      <section className="section-padding features-section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
