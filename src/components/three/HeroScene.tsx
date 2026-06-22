'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import FloatingParticles from './FloatingParticles';

/* Orbiting light that casts dynamic gold color shifts across the scene */
function OrbitingLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime;
    lightRef.current.position.x = Math.sin(t * 0.5) * 8;
    lightRef.current.position.y = Math.cos(t * 0.3) * 5 + 2;
    lightRef.current.position.z = Math.cos(t * 0.5) * 8;
  });

  return <pointLight ref={lightRef} color="#D4A843" intensity={3} distance={25} />;
}

/* Secondary orbiting light for depth and emerald accent */
function SecondaryLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime;
    lightRef.current.position.x = Math.cos(t * 0.4) * 10;
    lightRef.current.position.y = Math.sin(t * 0.6) * 3 - 1;
    lightRef.current.position.z = Math.sin(t * 0.4) * 10;
  });

  return <pointLight ref={lightRef} color="#10B981" intensity={2} distance={20} />;
}

/* A highly stylized, futuristic 3D school campus representation */
function FuturisticCampus() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const satelliteGroupRef = useRef<THREE.Group>(null);

  // Track scroll position for rotation
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Slow rotation over time + interactive scroll rotation
    groupRef.current.rotation.y = t * 0.08 + scrollY * 0.0015;
    
    // Gentle floating up and down
    groupRef.current.position.y = -1 + Math.sin(t * 0.5) * 0.15;

    // Rotate internal accent rings at different speeds
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.4;
      ringRef1.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -t * 0.6;
      ringRef2.current.rotation.z = t * 0.2;
    }

    // Orbiting satellite nodes
    if (satelliteGroupRef.current) {
      satelliteGroupRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, -3]}>
      {/* 1. Base Platform (Futuristic Circular Grid) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <cylinderGeometry args={[4.5, 4.6, 0.15, 32]} />
        <meshStandardMaterial 
          color="#0F172A" 
          roughness={0.4} 
          metalness={0.8}
          bumpScale={0.05}
        />
      </mesh>
      
      {/* Base Grid Ring Glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, 0]}>
        <ringGeometry args={[4.3, 4.5, 32]} />
        <meshBasicMaterial color="#D4A843" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Central Academic Tower (Glassmorphism & Gold accents) */}
      {/* Main Glass Tower */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[1.6, 3.2, 1.6]} />
        <meshPhysicalMaterial
          color="#1E3A5F"
          roughness={0.1}
          metalness={0.1}
          transmission={0.6} // Glass transparency
          thickness={1.2}
          clearcoat={1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Internal Core (Glowing Center of Knowledge) */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2.8, 16]} />
        <meshStandardMaterial
          color="#D4A843"
          emissive="#D4A843"
          emissiveIntensity={1.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Corner Columns (Futuristic Pillars) */}
      {[
        [-0.8, -0.8],
        [0.8, -0.8],
        [-0.8, 0.8],
        [0.8, 0.8],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.2, z]}>
          <cylinderGeometry args={[0.08, 0.08, 3.4, 8]} />
          <meshStandardMaterial
            color="#D4A843"
            metalness={0.9}
            roughness={0.2}
            emissive="#D4A843"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* 3. Floating Halo (Ring of Excellence) */}
      <mesh ref={ringRef1} position={[0, 1.8, 0]} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.2, 0.06, 8, 64]} />
        <meshStandardMaterial
          color="#D4A843"
          emissive="#D4A843"
          emissiveIntensity={1.8}
        />
      </mesh>

      <mesh ref={ringRef2} position={[0, 0.6, 0]} rotation={[Math.PI / 1.8, 0, 0]}>
        <torusGeometry args={[2.5, 0.04, 8, 64]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* 4. Side Wing Towers (Secondary blocks) */}
      {/* Science Wing */}
      <group position={[-2.4, 0.6, -1]}>
        <mesh>
          <boxGeometry args={[0.8, 2.0, 0.8]} />
          <meshPhysicalMaterial
            color="#0F172A"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <domeGeometry args={[0.4, 16, 12]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Tech & Arts Wing */}
      <group position={[2.4, 0.6, 1]}>
        <mesh>
          <boxGeometry args={[0.8, 2.0, 0.8]} />
          <meshPhysicalMaterial
            color="#0F172A"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Floating geometric cap */}
        <mesh position={[0, 1.2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#D4A843" emissive="#D4A843" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* 5. Glowing Beacon Beam (Upward Light of Future Leaders) */}
      <mesh position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.02, 0.15, 4.0, 8]} />
        <meshBasicMaterial
          color="#D4A843"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 6. Orbiting Knowledge Nodes */}
      <group ref={satelliteGroupRef} position={[0, 1.2, 0]}>
        {[0, 120, 240].map((angleDeg, i) => {
          const angle = (angleDeg * Math.PI) / 180;
          const radius = 3.6;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const colors = ['#D4A843', '#10B981', '#60A5FA'];
          return (
            <group key={i} position={[x, Math.sin(angle * 3) * 0.5, z]}>
              <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                  color={colors[i]}
                  emissive={colors[i]}
                  emissiveIntensity={1.2}
                />
              </mesh>
              {/* Ring path trace */}
              <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.1}>
                <torusGeometry args={[0.3, 0.01, 4, 16]} />
                <meshBasicMaterial color={colors[i]} transparent opacity={0.3} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* Camera controller that subtly follows mouse position for parallax */
function CameraController() {
  useFrame((state) => {
    const { pointer } = state;
    // Parallax mouse movements
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.x * 2.2, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, pointer.y * 1.2 + 0.8, 0.04);
    state.camera.lookAt(0, 0.5, -3);
  });

  return null;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.8, 7.5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Ambient base light */}
          <ambientLight intensity={0.4} color="#1E3A5F" />

          {/* Dynamic orbiting lights */}
          <OrbitingLight />
          <SecondaryLight />

          {/* Floating gold particles */}
          <FloatingParticles count={180} />

          {/* Futuristic Campus structure */}
          <FuturisticCampus />

          {/* Mouse-reactive camera */}
          <CameraController />

          {/* Subtle depth fog */}
          <fog attach="fog" args={['#0A1628', 6, 20]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
