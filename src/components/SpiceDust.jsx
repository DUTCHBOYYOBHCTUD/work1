import React, { useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Particle = ({ p, scrollYProgress }) => {
  const yMove = useTransform(scrollYProgress, [0, 1], [0, -p.speed]);
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${p.startY}%`,
        left: `${p.x}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        borderRadius: '50%',
        backgroundColor: p.color,
        opacity: p.opacity,
        filter: `blur(${p.blur}px)`,
        y: yMove,
      }}
    />
  );
};

const SpiceDust = () => {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen width
      startY: Math.random() * 100, // percentage across screen height
      size: Math.random() * 4 + 2, // 2px to 6px
      speed: Math.random() * 30 + 10, // ultra slow drift
      color: Math.random() > 0.5 ? '#D4AF37' : '#E27D60', // mustard, terracotta
      opacity: Math.random() * 0.1 + 0.05, // 0.05 to 0.15
      blur: Math.random() * 1 + 0.5, // 0.5px to 1.5px
    }));
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
      zIndex: 0
    }}>
      {particles.map(p => (
        <Particle key={p.id} p={p} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
};

export default SpiceDust;
