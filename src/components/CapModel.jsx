import React from 'react'
import { useGLTF } from '@react-three/drei'

export function CapModel(props) {
  const { scene } = useGLTF('/models/cap.glb')
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/cap.glb')
