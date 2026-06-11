import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

// Custom hook for responsive JS logic
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, PresentationControls, Html } from '@react-three/drei';
import AmbientSpices from './AmbientSpices';
import { JarModel } from './JarModel';
import { CapModel } from './CapModel';
import './CinematicHero.css';

// --- EASY TWEAK CONFIGURATION ---
// Adjust these values to perfectly align your custom 3D models!
const CONFIG = {
  jarScale: 2.3,           // Reduced by 0.2
  capScale: 1.6,           // Reduced by 0.2
  
  // Heights for the cap animation
  capHoverHeight: 8.0,     // Moved much higher so it doesn't poke out before the animation starts!
  capThreadHeight: 2.5,    // The height where it touches the jar threads (increase this if it goes too deep into the jar)
  capSealedHeight: 2.1,    // The final height when fully screwed down
  
  // Base Jar Position
  jarYOffset: -0.2,        // Moved the jar UP so the bottom doesn't get cut off!
  shadowYOffset: -0.4,     // Moved shadow UP to match the jar!
  
  // Initial Model Rotation
  baseModelRotationY: Math.PI, // 180 degrees to show the Jozef Foods logo! (Tweak if needed)
};

// Custom component to map Framer Motion values to ThreeJS objects on every frame
const AssemblyAnimator = ({ finalCapY, capRotateY, assemblyX, assemblyY, assemblyRotateY, capRef, assemblyRef }) => {
  useFrame(() => {
    if (capRef.current) {
      capRef.current.position.y = finalCapY.get();
      capRef.current.rotation.y = capRotateY.get();
    }
    if (assemblyRef.current) {
      assemblyRef.current.position.x = assemblyX.get();
      assemblyRef.current.position.y = assemblyY.get();
      assemblyRef.current.rotation.y = assemblyRotateY.get();
    }
  });
  return null;
};

// Custom component to animate lighting based on scroll progress!
const DynamicLighting = ({ smoothProgress }) => {
  const spotLightRef = useRef(null);
  const midLightRef = useRef(null);

  useFrame(() => {
    const progress = smoothProgress.get();
    
    if (spotLightRef.current) {
      // Sweep the spotlight from left to right as the user scrolls
      spotLightRef.current.position.x = -15 + (progress * 30);
      
      // Animate intensity so it pulses slightly when the jar is sealed
      const baseIntensity = 3.5;
      const boost = progress > 0.5 && progress < 0.7 ? 2 : 0;
      spotLightRef.current.intensity = baseIntensity + boost;
    }
    
    if (midLightRef.current) {
      // Sweep a softer light directly across the middle/label area!
      midLightRef.current.position.x = -8 + (progress * 16);
      midLightRef.current.intensity = 2.0 + Math.sin(progress * Math.PI) * 1.5; // Pulses bright in the middle of the scroll!
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} /> {/* Boosted ambient light slightly */}
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} /> {/* Key light */}
      <directionalLight position={[-5, 2, 5]} intensity={0.8} /> {/* Fill light */}
      
      {/* High sweeping cinematic spotlight (hits the cap and top rim) */}
      <spotLight 
        ref={spotLightRef} 
        position={[-15, 6, 8]} 
        intensity={3.5} 
        angle={0.6} 
        penumbra={0.8} 
        color="#ffead0" 
        castShadow 
      />
      
      {/* Midsection sweeping light to illuminate the label and body! */}
      <spotLight 
        ref={midLightRef}
        position={[-8, 0, 8]} 
        intensity={2.0} 
        angle={0.8} 
        penumbra={1} 
        color="#ffffff" 
      />
      
      {/* Back rim light */}
      <spotLight position={[0, 5, -10]} intensity={3.0} angle={0.5} penumbra={1} color="#f7b928" />
      <pointLight position={[0, -3, -5]} intensity={1.5} color="#db4224" /> {/* Deep warm rim at the bottom */}
    </>
  );
};

const CinematicHero = () => {
  const containerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 900px)');
  
  // Refs for 3D objects
  const capRef = useRef(null);
  const assemblyRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- 3D ANIMATION TIMELINE MAPPING ---

  // Adjust animation heights based on mobile scale to prevent cap from clipping at the top
  const mobileScale = 0.65;
  const mCapHover = isMobile ? 2.8 : CONFIG.capHoverHeight; // Safely within max Y 3.3 for mobile frustum
  const mCapThread = isMobile ? CONFIG.capThreadHeight * mobileScale : CONFIG.capThreadHeight;
  const mCapSealed = isMobile ? CONFIG.capSealedHeight * mobileScale : CONFIG.capSealedHeight;

  // Phase 1: Cap descends from hover to threads
  const capAlignY = useTransform(smoothProgress, [0, 0.3, 1], [mCapHover, mCapThread, mCapThread]);

  // Phase 2: Sealing Action
  const capScrewY = useTransform(smoothProgress, [0.3, 0.6, 1], [0, mCapSealed - mCapThread, mCapSealed - mCapThread]);
  // 3D rotation around Y axis in radians (2 full rotations = Math.PI * 4)
  const capRotateY = useTransform(smoothProgress, [0.3, 0.6, 1], [0, Math.PI * 4, Math.PI * 4]); 

  const finalCapY = useTransform(() => capAlignY.get() + capScrewY.get());

  // Phase 3: Reveal
  const assemblyRotateY = useTransform(smoothProgress, [0.6, 0.8, 1], [0, -Math.PI / 5, -Math.PI / 5]);
  // On mobile, the jar slides right to make room for text on the left!
  const assemblyX = useTransform(smoothProgress, [0.6, 0.8, 1], [0, isMobile ? 1.2 : 1.8, isMobile ? 1.2 : 1.8]);
  // Revert assemblyY so it never drops into the shadow plane, preventing the black ring glitch!
  const assemblyY = useTransform(smoothProgress, [0.6, 0.8, 1], [CONFIG.jarYOffset, CONFIG.jarYOffset, CONFIG.jarYOffset]);

  // Phase 4: DOM Content Reveal
  const contentOpacity = useTransform(smoothProgress, [0.8, 1.0], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.8, 1.0], [40, 0]);
  const sideContentOpacity = useTransform(smoothProgress, [0.1, 0.2, 0.5, 0.6], [0, 1, 1, 0]);
  const sideContentY = useTransform(smoothProgress, [0.1, 0.2, 0.5, 0.6], [40, 0, 0, -40]);
  
  // Dynamic Background Glow that moves as you scroll!
  const bgOpacity = useTransform(smoothProgress, [0.1, 0.3, 0.8, 1], [0, 0.8, 0.4, 1]);
  const bgLightX = useTransform(smoothProgress, [0, 1], [30, 70]);
  const bgLightY = useTransform(smoothProgress, [0, 1], [30, 70]);
  const backgroundStyle = useMotionTemplate`radial-gradient(circle at ${bgLightX}% ${bgLightY}%, rgba(219, 66, 36, 0.25) 0%, rgba(247, 185, 40, 0.12) 40%, transparent 70%)`;
  
  return (
    <div className="cinematic-scroll-container" ref={containerRef} style={{ position: 'relative' }}>
      <div className="cinematic-sticky-wrapper">
        
        <motion.div className="cinematic-ambient-bg" style={{ opacity: bgOpacity, background: backgroundStyle, zIndex: 1 }} />
        
        <motion.div className="ambient-spices-wrapper" style={{ opacity: contentOpacity }}>
          <AmbientSpices />
        </motion.div>

        <motion.div className="side-content side-left" style={{ opacity: sideContentOpacity, y: sideContentY }}>
          <h3>Sun-Dried Mangoes</h3>
          <p>Handpicked at the peak of summer, our sun-dried mangoes deliver a burst of authentic tanginess. Carefully preserved using generations-old techniques to maintain their rich texture.</p>
        </motion.div>
        <motion.div className="side-content side-right" style={{ opacity: sideContentOpacity, y: sideContentY }}>
          <h3>Aromatic Spices</h3>
          <p>Sourced directly from local farms, roasted and ground in-house to preserve pure, authentic flavors. Every jar is a testament to uncompromised quality and tradition.</p>
        </motion.div>

        <motion.div className="cinematic-content" style={{ opacity: contentOpacity, y: contentY }}>
          <h1 className="cinematic-headline">Handcrafted Perfection.</h1>
          <p className="cinematic-subhead">
            A timeless recipe of vibrant mangoes, pure spices, and generations of love. Sealed for absolute freshness.
          </p>
          <button className="cinematic-cta">Discover the Taste</button>
        </motion.div>

        {/* --- TRUE 3D CANVAS PORTAL --- */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'auto' }}>
          <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
            <DynamicLighting smoothProgress={smoothProgress} />

            <Suspense fallback={
              <Html center>
                <div style={{ color: '#db4224', fontFamily: 'Inter', letterSpacing: '2px' }}>LOADING 3D...</div>
              </Html>
            }>
              {/* Uses a locally downloaded HDRI to completely bypass your network/browser blocking issue! */}
              <Environment files="/models/studio.hdr" />

              <AssemblyAnimator
                finalCapY={finalCapY}
                capRotateY={capRotateY}
                assemblyX={assemblyX}
                assemblyY={assemblyY}
                assemblyRotateY={assemblyRotateY}
                capRef={capRef}
                assemblyRef={assemblyRef}
              />

              <PresentationControls
                global
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 1500 }}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 2, Math.PI / 2]}
              >
                {/* 
                  The assemblyRef handles the X, Y translation and Y rotation.
                  We keep the ContactShadows OUTSIDE this rotating group so the floor doesn't tilt!
                */}
                <group ref={assemblyRef}>
                  {/* Jar Body */}
                  <group rotation={[0, CONFIG.baseModelRotationY, 0]}>
                    <JarModel scale={isMobile ? CONFIG.jarScale * mobileScale : CONFIG.jarScale} />
                  </group>

                  {/* Jar Cap */}
                  <group ref={capRef}>
                    <group rotation={[0, CONFIG.baseModelRotationY, 0]}>
                      <CapModel scale={isMobile ? CONFIG.capScale * mobileScale : CONFIG.capScale} />
                    </group>
                  </group>
                </group>
                
                {/* Global Floor Shadow that captures everything */}
                <ContactShadows 
                  position={[0, isMobile ? -1.8 : -2.5, 0]} 
                  opacity={0.8} 
                  scale={25} 
                  blur={2.5} 
                  far={4} 
                  color="#000000" 
                />
              </PresentationControls>
            </Suspense>
          </Canvas>
        </div>

      </div>
    </div>
  );
};

export default CinematicHero;
