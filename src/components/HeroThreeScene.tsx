'use client';

import { useRef, useEffect, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 3D Floating TATAKAE LABS Logo Emblem — Fully Responsive on Android & Desktop
function Logo3DEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const isMobile = size.width < 768;
  const targetX = isMobile ? 0 : 1.45;
  const targetY = isMobile ? 0.95 : 0.25;
  const targetZ = isMobile ? -0.7 : -0.2;
  const baseScale = isMobile ? 0.72 : 1.0;

  const texture = useTexture('/logo.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;

  useEffect(() => {
    // Touch & Mouse listener for Android & Desktop
    const handleMove = (clientX: number, clientY: number) => {
      mouse.current.x = (clientX / size.width - 0.5) * 2;
      mouse.current.y = -(clientY / size.height - 0.5) * 2;
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [size]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Responsive position lerping
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);

    // Gentle float with smooth mouse/touch parallax
    const targetRotX = Math.sin(t * 0.35) * 0.1 - mouse.current.y * 0.14;
    const targetRotY = Math.cos(t * 0.3) * 0.14 + mouse.current.x * 0.18;
    const targetRotZ = Math.sin(t * 0.2) * 0.03;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.06);

    // Subtle breathing pulse
    const s = baseScale * (1 + Math.sin(t * 1.2) * 0.012);
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.45}>
      <group
        ref={groupRef}
        position={[targetX, targetY, targetZ]}
      >
        {/* Pure Floating Logo Emblem — All artificial circular rings and borders removed */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.8, 2.8]} />
          <meshBasicMaterial
            map={texture}
            transparent
            toneMapped={false}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Back Emblem for seamless double-sided floating with non-mirrored logo */}
        <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]} scale={[-1, 1, 1]}>
          <planeGeometry args={[2.8, 2.8]} />
          <meshBasicMaterial
            map={texture}
            transparent
            toneMapped={false}
            side={THREE.FrontSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Interactive Particle Constellation (Lightweight for mobile battery & FPS)
function ParticleDust() {
  const particlesRef = useRef<THREE.Points>(null);
  const { size } = useThree();
  const isMobile = size.width < 768;
  const count = isMobile ? 80 : 180;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.0 + Math.random() * 2.6;
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
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.06) * 0.03;
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
        size={isMobile ? 0.028 : 0.02}
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
          background: 'radial-gradient(circle at 50% 35%, rgba(8,11,114,0.12) 0%, rgba(5,6,47,0.03) 50%, transparent 80%)',
        }}
      />
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 48 }}
      style={{ width: '100%', height: '100%' }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} color="#ffffff" />

      <Suspense fallback={null}>
        <Logo3DEmblem />
        <ParticleDust />
      </Suspense>
    </Canvas>
  );
}
