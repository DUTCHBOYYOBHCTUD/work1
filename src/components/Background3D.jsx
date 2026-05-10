import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, useGLTF, Loader, useProgress } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

const LoadingLogo = () => {
  const { active } = useProgress();
  return (
    <div style={{
      position: 'fixed',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10000, // Above the loader background
      opacity: active ? 1 : 0,
      transition: 'opacity 0.5s ease',
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <img src="/media/logo.jpeg" alt="Jozef Foods" style={{ height: '140px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
    </div>
  );
};

const FloatingModel = ({ path, scale, position, speed, rotationIntensity, floatIntensity, initialRotation }) => {
  const { scene } = useGLTF(path);
  const ref = useRef();
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Dynamic Culling Engine: Calculate distance to camera
    const cameraY = state.camera.position.y;
    const modelY = position[1]; // The base Y position
    const distance = Math.abs(cameraY - modelY);
    
    // If the model is more than 15 units away vertically, turn it off to save GPU
    if (distance > 15) {
      ref.current.visible = false;
      return; // Skip math completely
    } else {
      ref.current.visible = true;
    }

    // Manual Rotation Math
    ref.current.rotation.y += delta * 0.1 * rotationIntensity;
    ref.current.rotation.x += delta * 0.05 * rotationIntensity;
    
    // Manual Floating Math (Sine Wave)
    const t = state.clock.getElapsedTime();
    ref.current.position.y = modelY + Math.sin(t * speed) * floatIntensity * 0.5;
  });

  return (
    <primitive 
      ref={ref} 
      object={clonedScene} 
      scale={scale} 
      position={position} 
      rotation={initialRotation}
    />
  );
};

const ScrollRig = () => {
  useFrame((state) => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const targetY = -scrollY * 0.015;
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.1);
  });
  return null;
};

const modelPaths = [
  '/media/lime.glb',
  '/media/garlic.glb',
  '/media/drumstick.glb',
  '/media/hotsweet.glb',
  '/media/ornament1.glb',
  '/media/ornament2.glb'
];

// FOREGROUND LAYER: Large, sharp, pushed to sides
const foregroundPlacements = Array.from({ length: 22 }).map((_, i) => {
  const path = modelPaths[i % modelPaths.length];
  const side = i % 2 === 0 ? 1 : -1;
  const x = side * (4 + Math.random() * 5); 
  const y = 4 - (i * 2.8) + (Math.random() * 2 - 1);
  const z = (Math.random() - 0.5) * 5 - 1.5; // Z near 0
  const scale = 1.8 + Math.random() * 0.6;
  return {
    key: `fg-${i}`, path, scale, position: [x, y, z],
    speed: 1 + Math.random(), rotationIntensity: 0.3 + Math.random() * 0.5,
    floatIntensity: 0.5 + Math.random() * 1.5,
    initialRotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
  };
});

// BACKGROUND LAYER: Smaller, far back, dense, to be blurred by DepthOfField
const backgroundPlacements = Array.from({ length: 30 }).map((_, i) => {
  const path = modelPaths[i % modelPaths.length];
  const x = (Math.random() - 0.5) * 20; // Wide spread
  const y = 10 - (i * 2.5) + (Math.random() * 5 - 2.5);
  const z = -15 - Math.random() * 10; // Deep in the background (Z=-15 to Z=-25)
  const scale = 0.8 + Math.random() * 0.6; // Smaller
  return {
    key: `bg-${i}`, path, scale, position: [x, y, z],
    speed: 0.5 + Math.random(), rotationIntensity: 0.1 + Math.random() * 0.3,
    floatIntensity: 0.2 + Math.random(),
    initialRotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
  };
});

const Background3D = () => {
  return (
    <>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -2, 
        pointerEvents: 'none', 
        overflow: 'hidden',
      }}>
        {/* Static dpr to prevent buffer resize stutter on load */}
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 100 }} gl={{ alpha: true, preserveDrawingBuffer: true }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <pointLight position={[-10, -10, -5]} intensity={1.5} color="#FADADD" />
          
          <ScrollRig />
          
          <Suspense fallback={null}>
            <PresentationControls global config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }} rotation={[0, 0, 0]}>
              {/* Foreground Models (Sharp) */}
              {foregroundPlacements.map(({ key, ...placement }) => <FloatingModel key={key} {...placement} />)}
              {/* Background Models (Blurred) */}
              {backgroundPlacements.map(({ key, ...placement }) => <FloatingModel key={key} {...placement} />)}
            </PresentationControls>
          </Suspense>
          
          <Environment preset="city" />
        </Canvas>
      </div>
      
      {/* Custom Logo that syncs perfectly with Drei's Loader */}
      <LoadingLogo />
      
      <Loader 
        containerStyles={{ background: '#1C2E20', zIndex: 9999 }} 
        innerStyles={{ width: '300px', marginTop: '100px' }} 
        barStyles={{ background: '#FADADD' }} 
        dataStyles={{ color: '#FADADD', fontSize: '1.2rem', fontFamily: 'var(--font-sans)' }}
      />
    </>
  );
};

modelPaths.forEach(path => useGLTF.preload(path));

export default Background3D;
