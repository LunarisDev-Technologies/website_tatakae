'use client';

import { Suspense, lazy, useEffect, useRef } from 'react';
import HaikeiBlobs from './HaikeiBlobs';
import TextReveal from './TextReveal';

const ThreeScene = lazy(() => import('./HeroThreeScene'));

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [headlineRef.current, subtitleRef.current, ctaRef.current, scrollRef.current];
    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(36px)';
      setTimeout(() => {
        if (el) {
          el.style.transition = `opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.12}s, transform 0.9s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.12}s`;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      }, 500 + i * 100);
    });
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: '#F7F7F5' }}
    >
      {/* Haikei Organic Blobs Background */}
      <HaikeiBlobs />

      {/* 3D WebGL Canvas Layer */}
      <div className="canvas-wrapper">
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>
      </div>

      {/* Architectural Swiss grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          style={{
            position: 'absolute',
            left: '5vw',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'rgba(8,11,114,0.06)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '5vw',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'rgba(8,11,114,0.06)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div
        className="relative z-10 section-padding pt-0"
        style={{ paddingTop: '0', paddingBottom: '80px' }}
      >
        <div className="max-w-[1600px] mx-auto">
          {/* Tag */}
          <div
            ref={headlineRef}
            className="mb-8"
            style={{ opacity: 0 }}
          >
            <span
              className="tag-pill"
              style={{
                color: '#080B72',
                borderColor: 'rgba(8,11,114,0.3)',
                background: 'rgba(8,11,114,0.03)',
              }}
            >
              Est. 2024 · Software & SaaS Innovation Studio
            </span>
          </div>

          {/* Headline with animejs character reveal */}
          <div ref={subtitleRef} style={{ opacity: 0 }}>
            <h1 className="text-display" style={{ color: '#080B72', maxWidth: '980px' }}>
              <TextReveal text="WE BUILD" as="span" delay={300} />
              <br />
              <TextReveal text="WHAT'S NEXT." as="span" delay={550} />
            </h1>
          </div>

          {/* Subtitle + CTA row */}
          <div
            ref={ctaRef}
            className="mt-8 sm:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 sm:gap-8"
            style={{ opacity: 0 }}
          >
            <p
              className="text-body"
              style={{
                color: '#05062F',
                opacity: 0.7,
                maxWidth: '460px',
              }}
            >
              Technology, thoughtfully engineered. We build digital products
              and intelligent systems that help businesses move forward.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                className="btn-primary w-full sm:w-auto justify-center"
                onClick={() => handleScroll('#products')}
              >
                Explore Our Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <button
                className="btn-outline w-full sm:w-auto justify-center"
                onClick={() => handleScroll('#contact')}
              >
                Let&apos;s Build Something
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator (desktop only) */}
      <div
        ref={scrollRef}
        className="hidden md:flex absolute bottom-8 right-[5vw] flex-col items-center gap-3 z-10"
        style={{ opacity: 0 }}
      >
        <div
          style={{
            writingMode: 'vertical-rl',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.62rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: '#080B72',
            opacity: 0.35,
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </div>
        <div style={{ width: '1px', height: '60px', background: 'rgba(8,11,114,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '40%',
              background: '#080B72',
              animation: 'scrollDown 1.5s ease-in-out infinite',
            }}
          />
        </div>
        <style jsx>{`
          @keyframes scrollDown {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(250%); }
          }
        `}</style>
      </div>
    </section>
  );
}
