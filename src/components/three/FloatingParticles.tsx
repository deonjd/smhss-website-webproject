'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
}

export default function FloatingParticles({ count = 200 }: FloatingParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random positions, scales, and speeds for each particle
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      scale: Math.random() * 0.05 + 0.01,
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((particle, i) => {
      const { position, scale, speed, offset } = particle;
      dummy.position.set(
        position[0] + Math.sin(time * speed + offset) * 0.5,
        position[1] + Math.cos(time * speed + offset) * 0.8,
        position[2] + Math.sin(time * speed * 0.5 + offset) * 0.3
      );
      dummy.scale.setScalar(scale * (1 + Math.sin(time * 2 + offset) * 0.3));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#D4A843"
        emissive="#D4A843"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}
