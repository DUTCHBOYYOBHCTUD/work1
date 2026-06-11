import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxChiliBowl.css';

const ParallaxChiliBowl = () => {
  const containerRef = useRef(null);
  
  // Track the scroll progress of this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Cap animation: 
  // Starts high up (-300px) and falls perfectly to 0px (on top of the jar) as you scroll.
  const capY = useTransform(scrollYProgress, [0, 0.5], [-400, 0]);
  const capOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 1, 1]);

  // Jar animation:
  // Moves slowly upward to create a sense of depth (parallax against the background)
  const jarY = useTransform(scrollYProgress, [0, 1], [150, -50]);

  return (
    <div className="parallax-jar-container" ref={containerRef}>
      
      {/* JAR BODY */}
      <motion.div 
        className="parallax-jar-body-wrapper"
        style={{ y: jarY, zIndex: 1 }}
      >
        <img 
          src="/media/pickle_jar_body.png" 
          alt="Pickle Jar"
          className="parallax-jar-body"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        
        {/* CAP (placed inside jar wrapper so it shares the same base coordinate system and moves with the jar's parallax) */}
        <motion.div 
          className="parallax-jar-cap-wrapper"
          style={{ y: capY, opacity: capOpacity, zIndex: 2 }}
        >
          <img 
            src="/media/pickle_jar_cap.png" 
            alt="Jar Cap"
            className="parallax-jar-cap"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </motion.div>
      </motion.div>

    </div>
  );
};

export default ParallaxChiliBowl;
