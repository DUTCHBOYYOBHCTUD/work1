import React from 'react'
import { useGLTF } from '@react-three/drei'

export function JarModel(props) {
  const { scene } = useGLTF('/models/jar.glb')
  // We clone the scene if we plan to use it multiple times, but here primitive is fine
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/jar.glb')
