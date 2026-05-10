import React from 'react';
import { motion } from 'framer-motion';

const BackgroundCurves = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -2, 
      pointerEvents: 'none', 
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Primary Floating 3D Jar */}
      <motion.img 
        src="/media/3d_pickle_jar.png" 
        alt="3D Pickle Jar Background"
        style={{
          width: '80%',
          maxWidth: '800px',
          opacity: 0.15,
          mixBlendMode: 'multiply',
          filter: 'blur(1px)' // Subtle blur for depth
        }}
        initial={{ y: 50, rotate: -5, scale: 0.9 }}
        animate={{ 
          y: [-20, 20, -20],
          rotate: [-2, 2, -2],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ 
          duration: 20, 
          ease: "easeInOut", 
          repeat: Infinity 
        }}
      />

      {/* Secondary Background Jar for Parallax Depth */}
      <motion.img 
        src="/media/3d_pickle_jar.png" 
        alt="3D Pickle Jar Background"
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '120%',
          maxWidth: '1200px',
          opacity: 0.08,
          mixBlendMode: 'multiply',
          filter: 'blur(8px)'
        }}
        initial={{ rotate: 10 }}
        animate={{ 
          y: [0, -50, 0],
          rotate: [10, 15, 10],
          x: [0, 30, 0]
        }}
        transition={{ 
          duration: 25, 
          ease: "easeInOut", 
          repeat: Infinity,
          delay: 2
        }}
      />
    </div>
  );
};

export default BackgroundCurves;
