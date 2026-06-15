import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Shop.css';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = categoryFilter === 'All' || product.category === categoryFilter;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [categoryFilter, searchQuery]);

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <div className="shop-page" style={{ paddingTop: '160px', paddingBottom: '80px', position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          className="shop-header glassmorphism"
          style={{ padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px auto' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Shop Our Collection</h1>
          <p>Authentic flavors delivered to your doorstep.</p>
        </motion.div>

        <div className="shop-layout">
          {/* Sidebar / Filters */}
          <aside className="shop-sidebar glassmorphism" style={{ padding: '24px', borderRadius: '16px' }}>
            <div className="filter-group">
              <div className="search-bar">
                <Search size={20} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <h3>Categories</h3>
              <ul className="category-list">
                {['All', 'Pickles', 'Spice Powders'].map(cat => (
                  <li key={cat}>
                    <button 
                      className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="shop-main">
            <div className="results-info">
              <p>Showing {filteredProducts.length} products</p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <motion.div 
                className="products-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={categoryFilter + searchQuery} // re-trigger animation on filter
              >
                <AnimatePresence>
                  {filteredProducts.map(product => (
                    <motion.div key={product.id} variants={itemVariants} layout>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="no-results text-center">
                <h3>No products found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
