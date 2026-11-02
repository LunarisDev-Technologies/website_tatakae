'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('SYS // INITIALIZING CORE');
  const [phase, setPhase] = useState<'loading' | 'complete'>('loading');
  const loaderRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Accessibility check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTimeout(() => onComplete(), 200);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      mousePos.current = { x, y };
      setTilt({ x: -y, y: x });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let frame: number;
    let start: number | null = null;
    const DURATION = 2400; // ~2.4 seconds

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const raw = Math.min(elapsed / DURATION, 1);
      // Custom ease out cubic curve
      const eased = 1 - Math.pow(1 - raw, 3);
      const currentVal = Math.round(eased * 100);
      setProgress(currentVal);

      // Dynamic telemetry feedback
      if (currentVal < 25) {
        setStatusText('SYS // INITIALIZING CORE ENGINE');
      } else if (currentVal < 50) {
        setStatusText('SYS // CALIBRATING 3D GEOMETRY');
      } else if (currentVal < 75) {
        setStatusText('SYS // SYNCHRONIZING INTERACTIVE MODULES');
      } else if (currentVal < 99) {
        setStatusText('SYS // FINALIZING TATAKAE MATRIX');
      } else {
        setStatusText('SYS // READY · ENTERING STUDIO');
      }

      if (raw < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setPhase('complete');
        setTimeout(() => {
          if (loaderRef.current) {
            loaderRef.current.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            loaderRef.current.style.opacity = '0';
            loaderRef.current.style.transform = 'scale(1.08)';
            loaderRef.current.style.filter = 'blur(10px)';
          }
          setTimeout(onComplete, 750);
        }, 250);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ background: '#F7F7F5' }}
      aria-label="Loading TATAKAE LABS experience"
      role="status"
    >
      <style jsx>{`
        @keyframes pulseRing1 {
          0% { transform: scale(0.92); opacity: 0.15; }
          50% { transform: scale(1.08); opacity: 0.45; }
          100% { transform: scale(0.92); opacity: 0.15; }
        }
        @keyframes pulseRing2 {
          0% { transform: scale(1.1); opacity: 0.1; }
          50% { transform: scale(0.95); opacity: 0.3; }
          100% { transform: scale(1.1); opacity: 0.1; }
        }
        @keyframes orbitRadar {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes logoSpin360 {
          0% {
            transform: rotateY(0deg) translateY(0px);
          }
          50% {
            transform: rotateY(180deg) translateY(-8px);
          }
          100% {
            transform: rotateY(360deg) translateY(0px);
          }
        }
        @keyframes sweepGlint {
          0% { transform: translateX(-150%) rotate(45deg); opacity: 0; }
          30% { opacity: 0.6; }
          60%, 100% { transform: translateX(250%) rotate(45deg); opacity: 0; }
        }
      `}</style>

      {/* Architectural Corner Reticles */}
      <div className="absolute top-8 left-8 flex items-center gap-2 font-mono text-[0.62rem] text-[#080B72]/30 tracking-widest uppercase">
        <span className="w-2.5 h-[1px] bg-[#080B72]/40" />
        <span>SYS.TATAKAE // v2.4</span>
      </div>
      <div className="absolute top-8 right-8 flex items-center gap-2 font-mono text-[0.62rem] text-[#080B72]/30 tracking-widest uppercase">
        <span>LOC // 35.6762° N</span>
        <span className="w-2.5 h-[1px] bg-[#080B72]/40" />
      </div>
      <div className="absolute bottom-8 left-8 flex items-center gap-2 font-mono text-[0.62rem] text-[#080B72]/30 tracking-widest uppercase">
        <span className="w-2.5 h-[1px] bg-[#080B72]/40" />
        <span>PRECISION ARCHITECTURE</span>
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-2 font-mono text-[0.62rem] text-[#080B72]/30 tracking-widest uppercase">
        <span>BUILD_OK // 200</span>
        <span className="w-2.5 h-[1px] bg-[#080B72]/40" />
      </div>

      {/* Main Center Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 'min(340px, 86vw)',
          height: 'min(340px, 86vw)',
          perspective: '1200px',
        }}
      >
        {/* Radar Orbit Dot & Guideline */}
        <div
          className="absolute rounded-full border border-[#080B72]/15 pointer-events-none"
          style={{
            width: 'min(310px, 80vw)',
            height: 'min(310px, 80vw)',
            animation: 'orbitRadar 18s linear infinite',
          }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#080B72] shadow-[0_0_10px_#080B72]" />
        </div>

        {/* Concentric Organic Ripple 1 */}
        <div
          className="absolute rounded-full pointer-events-none border border-[#080B72]/20"
          style={{
            width: 'min(260px, 68vw)',
            height: 'min(260px, 68vw)',
            animation: 'pulseRing1 4.5s ease-in-out infinite',
          }}
        />

        {/* Concentric Organic Ripple 2 */}
        <div
          className="absolute rounded-full pointer-events-none border border-dashed border-[#080B72]/15"
          style={{
            width: 'min(220px, 58vw)',
            height: 'min(220px, 58vw)',
            animation: 'pulseRing2 3.8s ease-in-out infinite',
          }}
        />

        {/* Dynamic Volumetric Glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 'min(190px, 50vw)',
            height: 'min(190px, 50vw)',
            background: 'radial-gradient(circle, rgba(8, 11, 114, 0.22) 0%, rgba(5, 6, 47, 0.05) 55%, transparent 75%)',
            filter: 'blur(16px)',
          }}
        />

        {/* Center 3D Floating TATAKAE LABS Emblem */}
        <div
          className="relative transition-transform duration-200 ease-out flex items-center justify-center"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="relative flex items-center justify-center p-2"
            style={{
              animation: phase === 'loading' ? 'logoSpin360 4.2s cubic-bezier(0.45, 0.05, 0.25, 0.95) infinite' : 'none',
              transformStyle: 'preserve-3d',
              filter: 'drop-shadow(0 25px 35px rgba(8, 11, 114, 0.22)) drop-shadow(0 6px 12px rgba(5, 6, 47, 0.12))',
            }}
          >
            {/* The 3D Double-Sided Logo Emblem */}
            <div
              className="w-[145px] sm:w-[180px] h-[145px] sm:h-[180px] relative flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Face */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(6px)',
                }}
              >
                <Image
                  src="/logo.png"
                  alt="TATAKAE LABS Emblem Front"
                  fill
                  sizes="(max-width: 640px) 145px, 180px"
                  priority
                  className="pointer-events-none select-none object-contain"
                />
              </div>

              {/* Back Face (Non-mirrored so it is readable from both sides during 360 spin) */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg) translateZ(6px)',
                }}
              >
                <Image
                  src="/logo.png"
                  alt="TATAKAE LABS Emblem Back"
                  fill
                  sizes="(max-width: 640px) 145px, 180px"
                  priority
                  className="pointer-events-none select-none object-contain"
                  style={{ transform: 'scaleX(-1)' }}
                />
              </div>

              {/* Shimmer Light Reflection Sweep */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                style={{
                  maskImage: 'radial-gradient(circle, black 65%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 70%)',
                  transform: 'translateZ(8px)',
                }}
              >
                <div
                  className="absolute inset-0 w-[40px] h-[300%]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85), transparent)',
                    animation: 'sweepGlint 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimalistic Progress & Telemetry Section */}
      <div className="mt-4 flex flex-col items-center gap-3.5 z-10">
        {/* Shimmer Precision Progress Bar */}
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            width: '260px',
            height: '2px',
            background: 'rgba(8, 11, 114, 0.12)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #080B72 0%, #3037E0 100%)',
              transition: 'width 0.12s linear',
            }}
          />
        </div>

        {/* Status Text & Percentage */}
        <div className="flex items-center justify-between w-[260px] font-mono">
          <span
            className="text-[0.65rem] font-medium tracking-[0.12em] text-[#080B72]/65 uppercase transition-all duration-200"
          >
            {statusText}
          </span>
          <span
            className="text-[0.78rem] font-bold tracking-[0.08em] text-[#080B72] tabular-nums"
          >
            {progress.toString().padStart(2, '0')}%
          </span>
        </div>
      </div>

      {/* Company Wordmark */}
      <div
        className="mt-6 flex flex-col items-center gap-1 transition-opacity duration-700"
        style={{
          opacity: progress > 30 ? 1 : 0,
        }}
      >
        <span className="font-bold text-[0.85rem] tracking-[0.22em] text-[#080B72] uppercase font-sans">
          TATAKAE LABS
        </span>
        <span className="text-[0.62rem] font-medium tracking-[0.2em] text-[#080B72]/45 uppercase font-sans">
          Technology · Intelligence · Scale
        </span>
      </div>
    </div>
  );
}
