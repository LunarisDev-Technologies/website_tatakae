'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function OrganicBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width - 0.5) * 2;
      mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [size]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Slow rotation
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.15 + mouse.current.y * 0.06;
    meshRef.current.rotation.y = t * 0.12 + mouse.current.x * 0.06;
    meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.08;
    // Subtle breathing scale
    const scale = 1 + Math.sin(t * 0.8) * 0.02;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 128, 128]} />
        <MeshDistortMaterial
          color="#080B72"
          distort={0.45}
          speed={1.8}
          roughness={0.08}
          metalness={0.05}
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 180;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.12) * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#080B72"
        size={0.018}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function WireFrame() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.08;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.13;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.9, 0.28, 160, 16, 2, 3]} />
      <meshStandardMaterial
        color="#080B72"
        wireframe
        transparent
        opacity={0.04}
      />
    </mesh>
  );
}

export default function HeroThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#a0a8ff" />
      <pointLight position={[2, 3, 2]} intensity={0.5} color="#080B72" />
      <OrganicBlob />
      <Particles />
      <WireFrame />
    </Canvas>
  );
}
