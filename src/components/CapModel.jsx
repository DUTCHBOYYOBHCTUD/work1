import React from 'react'
import { useGLTF } from '@react-three/drei'

export function CapModel(props) {
  const { scene } = useGLTF('/models/cap-draco.glb')
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/cap-draco.glb')
