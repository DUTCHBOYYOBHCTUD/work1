import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const IngredientTypes = [
  { src: '/media/bae528a7-5ecf-4857-a78c-e6201ae72fcf.jpg', size: 120 },
  { src: '/media/3092925_2116.jpg', size: 100 },
  { src: '/media/424549988_fb9234b7-b14d-4239-8a15-3d6e9cfca494.jpg', size: 140 },
  { src: '/media/3d_pickle_jar.png', size: 150 } // this is a PNG so it supports real transparency
];

const FloatingIngredients = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ingredients = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const type = IngredientTypes[i % IngredientTypes.length];
      return {
        id: i,
        ...type,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        delay: Math.random() * 5,
        duration: Math.random() * 6 + 10, // 10-16s (even slower)
        rotate: Math.random() * 20 - 10,
        scale: Math.random() * 0.3 + 0.7
      };
    });
  }, []);

  if (!mounted) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1
    }}>
      {ingredients.map(ing => (
        <motion.div
          key={ing.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            y: [0, -10, -10, -20],
          }}
          transition={{
            duration: ing.duration,
            repeat: Infinity,
            delay: ing.delay,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            top: `${ing.y}%`,
            left: `${ing.x}%`,
            width: `${ing.size}px`,
            height: `${ing.size}px`,
            rotate: ing.rotate,
            scale: ing.scale,
          }}
        >
          <img 
            src={ing.src} 
            alt="Artisanal Ingredient" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              // The multiply blend mode will make the white backgrounds of the JPGs disappear against the cream site background!
              mixBlendMode: ing.src.endsWith('.png') ? 'normal' : 'multiply'
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIngredients;
