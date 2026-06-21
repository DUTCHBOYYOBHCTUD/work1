import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Using some of the existing floating ingredient images or simple CSS circles
const Spices = [
  { src: '/media/3092925_2116.jpg', type: 'image' },
  { type: 'circle', color: '#db4224' }, // Chili red
  { type: 'circle', color: '#f7b928' }, // Mustard yellow
  { type: 'circle', color: '#8a5a19' }  // Spice brown
];

const AmbientSpices = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const spice = Spices[i % Spices.length];
      const size = Math.random() * 8 + 4; // 4px to 12px
      
      return {
        id: i,
        ...spice,
        size: spice.type === 'image' ? size * 4 : size,
        x: Math.random() * 100, // vw
        y: Math.random() * 100, // vh
        duration: Math.random() * 20 + 20, // Very slow, 20-40s
        delay: Math.random() * -20, // Start at different times
      };
    });
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: p.size,
            height: p.size,
            borderRadius: p.type === 'circle' ? '50%' : '0',
            backgroundColor: p.type === 'circle' ? p.color : 'transparent',
            opacity: 0.4, // Increased visibility
            filter: 'blur(1px)' // Reduced blur to make them more distinct
          }}
          animate={{
            y: [`${p.y}vh`, `${p.y - 20}vh`, `${p.y}vh`], // Float up and down
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        >
          {p.type === 'image' && (
            <img 
              src={p.src} 
              alt="spice" 
              style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.6 }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AmbientSpices;
