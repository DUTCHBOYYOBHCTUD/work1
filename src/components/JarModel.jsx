import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function JarModel({ isMobile, ...props }) {
  const { scene } = useGLTF('/models/jar-draco.glb')
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Disable expensive shadow maps
        child.castShadow = false;
        child.receiveShadow = false;
        
        // Massive Mobile Optimization: Nuke the "True Glass" refraction
        if (isMobile && child.material) {
          if (child.material.transmission !== undefined) {
            child.material.transmission = 0; // Disable refraction
            child.material.transparent = true;
            child.material.opacity = 0.85; // Fake the glass
            child.material.roughness = 0.3; // Cheaper highlight
          }
        }
      }
    });
  }, [scene, isMobile]);

  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/jar-draco.glb')
