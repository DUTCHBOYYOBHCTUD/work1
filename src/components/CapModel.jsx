import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function CapModel({ isMobile, ...props }) {
  const { scene } = useGLTF('/models/cap-draco.glb')
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Disable expensive shadow maps
        child.castShadow = false;
        child.receiveShadow = false;
        
        // Simplify cap material on mobile
        if (isMobile && child.material) {
          child.material.roughness = 0.8; // Flat, cheap rendering
        }
      }
    });
  }, [scene, isMobile]);

  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/cap-draco.glb')
