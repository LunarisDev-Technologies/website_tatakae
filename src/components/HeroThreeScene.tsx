'use client';

import { useRef, useEffect, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 3D Floating TATAKAE LABS Logo Emblem — Pure & Vibrant, Never Black
function Logo3DEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const texture = useTexture('/logo.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width - 0.5) * 2;
      mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [size]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle float with smooth mouse parallax
    const targetRotX = Math.sin(t * 0.35) * 0.1 - mouse.current.y * 0.15;
    const targetRotY = Math.cos(t * 0.3) * 0.15 + mouse.current.x * 0.2;
    const targetRotZ = Math.sin(t * 0.2) * 0.04;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.06);

    // Subtle breathing pulse
    const s = 1 + Math.sin(t * 1.2) * 0.012;
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={groupRef}
        position={[1.5, 0.25, -0.2]} // Elegantly positioned in hero right background
      >
        {/* Soft White Backing Disc so transparency is never dark/black */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.36, 1.36, 0.06, 64]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Front Emblem: MeshBasicMaterial preserves 100% true vibrant color without black shadows */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[2.7, 2.7]} />
          <meshBasicMaterial
            map={texture}
            transparent
            toneMapped={false}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Back Emblem */}
        <mesh position={[0, 0, -0.035]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2.7, 2.7]} />
          <meshBasicMaterial
            map={texture}
            transparent
            toneMapped={false}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Refined Electric Navy Outer Ring (Luminous, never black) */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.38, 0.015, 32, 100]} />
          <meshBasicMaterial color="#080B72" />
        </mesh>

        {/* Ambient Expanding Wave Ring */}
        <mesh position={[0, 0, -0.02]}>
          <torusGeometry args={[1.75, 0.008, 16, 100]} />
          <meshBasicMaterial
            color="#080B72"
            transparent
            opacity={0.16}
          />
        </mesh>

        {/* Secondary Delicate Wave Ring */}
        <mesh position={[0, 0, -0.04]} rotation={[0.3, 0.2, 0]}>
          <torusGeometry args={[2.05, 0.006, 16, 100]} />
          <meshBasicMaterial
            color="#080B72"
            transparent
            opacity={0.08}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Background Distort Field (Subtle & clean)
function OrganicDistortField() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.025;
    meshRef.current.rotation.y = t * 0.04;
  });

  return (
    <mesh ref={meshRef} position={[-2, -0.6, -2.2]}>
      <torusKnotGeometry args={[1.8, 0.45, 160, 20, 2, 3]} />
      <meshBasicMaterial
        color="#080B72"
        wireframe
        transparent
        opacity={0.035}
      />
    </mesh>
  );
}

// Interactive Particle Constellation
function ParticleDust() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 180;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 0.4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.025;
    particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.07) * 0.04;
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
        size={0.02}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroThreeScene() {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div
        className="w-full h-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 75% 35%, rgba(8,11,114,0.12) 0%, rgba(5,6,47,0.03) 50%, transparent 80%)',
        }}
      />
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} color="#ffffff" />

      <Suspense fallback={null}>
        <Logo3DEmblem />
        <OrganicDistortField />
        <ParticleDust />
      </Suspense>
    </Canvas>
  );
}
