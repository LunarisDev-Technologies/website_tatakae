'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'assembling' | 'complete'>('assembling');
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip animation, go straight to content
      setTimeout(() => onComplete(), 300);
      return;
    }

    let frame: number;
    let start: number | null = null;
    const DURATION = 2200;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const raw = Math.min(elapsed / DURATION, 1);
      // Ease out expo
      const eased = raw === 1 ? 1 : 1 - Math.pow(2, -10 * raw);
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        // Phase complete
        setPhase('complete');
        setTimeout(() => {
          if (loaderRef.current) {
            loaderRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            loaderRef.current.style.opacity = '0';
            loaderRef.current.style.transform = 'scale(1.04)';
          }
          setTimeout(onComplete, 600);
        }, 300);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
      style={{ background: '#F7F7F5' }}
      aria-label="Loading TATAKAE LABS"
      role="status"
    >
      {/* Logo with animation */}
      <div
        className="relative flex items-center justify-center"
        style={{
          animation: phase === 'assembling'
            ? 'logoFloat 3s ease-in-out infinite'
            : 'none',
        }}
      >
        <style jsx>{`
          @keyframes logoFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-8px) rotate(1deg); }
            66% { transform: translateY(-4px) rotate(-0.5deg); }
          }
          @keyframes logoReveal {
            from { opacity: 0; transform: scale(0.7) rotate(-8deg); filter: blur(20px); }
            to { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0px); }
          }
          @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 60px rgba(8, 11, 114, 0.08); }
            50% { box-shadow: 0 0 100px rgba(8, 11, 114, 0.18); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(200%) rotate(45deg); }
          }
        `}</style>

        {/* Glow ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: '220px',
            height: '220px',
            animation: 'glowPulse 2.5s ease-in-out infinite',
            background: 'radial-gradient(circle, rgba(8,11,114,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Logo image */}
        <div
          style={{
            animation: 'logoReveal 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
            opacity: 0,
          }}
        >
          <Image
            src="/logo.png"
            alt="TATAKAE LABS"
            width={160}
            height={160}
            priority
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          />
        </div>
      </div>

      {/* Progress */}
      <div className="mt-12 flex flex-col items-center gap-4">
        {/* Progress bar */}
        <div
          className="relative overflow-hidden"
          style={{ width: '200px', height: '1px', background: 'rgba(8,11,114,0.12)' }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: '#080B72',
              transition: 'width 0.1s linear',
            }}
          />
          {/* Shimmer effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '40px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
              animation: 'shimmer 1.5s ease-in-out infinite',
            }}
          />
        </div>

        {/* Counter */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: '#080B72',
            opacity: 0.5,
          }}
        >
          {progress.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Company name fade in */}
      <div
        className="absolute bottom-12"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.25em',
          color: '#080B72',
          opacity: progress > 40 ? 0.4 : 0,
          transition: 'opacity 0.8s ease',
          textTransform: 'uppercase',
        }}
      >
        Building Technology for What&apos;s Next
      </div>
    </div>
  );
}
