'use client';

import { useRef, useEffect, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Understand the Problem.',
    description:
      'Before writing a single line of code, we deeply analyse the challenge — the business context, users, constraints and goals. A well-defined problem is half the solution.',
  },
  {
    number: '02',
    title: 'Design the Solution.',
    description:
      'We map the system architecture, user flows and interface patterns. Every decision is deliberate — we design for clarity, usability and long-term maintainability.',
  },
  {
    number: '03',
    title: 'Engineer the Experience.',
    description:
      'We write clean, tested, scalable code. The experience is crafted with care — from loading states to micro-interactions, every detail serves a purpose.',
  },
  {
    number: '04',
    title: 'Build for Scale.',
    description:
      'We architect systems that grow with your business. Cloud-native, modular and built with performance in mind from day one — not as an afterthought.',
  },
  {
    number: '05',
    title: 'Continuously Improve.',
    description:
      'Software is never truly finished. We measure, learn and iterate. Great products are built through sustained attention and honest feedback loops.',
  },
];

function PhilosophyStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const stepRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = stepRef.current;
    if (!el) return;
    el.style.opacity = '0';
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s`;
            el.style.opacity = '1';
          }, 50);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={stepRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setActive(!active)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActive(!active);
        }
      }}
      className="cursor-pointer select-none"
      style={{
        padding: '24px 0',
        borderTop: '1px solid rgba(247,247,245,0.1)',
        transition: 'all 0.3s ease',
        paddingBottom: active ? '36px' : '24px',
      }}
    >
      <div className="flex items-start justify-between gap-4 sm:gap-8">
        {/* Number */}
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: '#F7F7F5',
            opacity: hovered ? 0.7 : 0.25,
            transition: 'opacity 0.3s ease',
            flexShrink: 0,
            paddingTop: '4px',
            minWidth: '32px',
          }}
        >
          {step.number}
        </span>

        {/* Title */}
        <h3
          style={{
            flex: 1,
            fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#F7F7F5',
            lineHeight: 1.1,
            transition: 'opacity 0.3s ease',
            opacity: hovered ? 1 : 0.8,
          }}
        >
          {step.title}
        </h3>

        {/* Plus/Minus toggle */}
        <div
          style={{
            width: '28px',
            height: '28px',
            border: '1px solid rgba(247,247,245,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.3s ease',
            background: active ? '#F7F7F5' : 'transparent',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
            style={{ transition: 'transform 0.3s ease', transform: active ? 'rotate(45deg)' : 'none' }}
          >
            <path d="M6 1v10M1 6h10" stroke={active ? '#080B72' : '#F7F7F5'} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Expandable description */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: active ? '200px' : '0',
          transition: 'max-height 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.7,
            color: '#F7F7F5',
            opacity: 0.5,
            fontWeight: 300,
            paddingTop: '20px',
            paddingLeft: '40px',
            maxWidth: '640px',
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function PhilosophySection() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="philosophy" className="section-padding" style={{ background: '#080B72' }}>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div ref={titleRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span style={{ opacity: 0.3, fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: 500, textTransform: 'uppercase', color: '#F7F7F5' }}>
                04 / Our Philosophy
              </span>
              <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'rgba(247,247,245,0.15)' }} />
            </div>
            <h2 className="text-headline" style={{ color: '#F7F7F5' }}>
              THINK DIFFERENT.
              <br />
              BUILD BETTER.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-body" style={{ color: '#F7F7F5', opacity: 0.45, maxWidth: '400px' }}>
              Our approach to building technology is rooted in simplicity, clarity
              and ambition. Every project follows the same disciplined process.
              Click to explore each step.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div>
          {steps.map((step, i) => (
            <PhilosophyStep key={step.number} step={step} index={i} />
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(247,247,245,0.1)', paddingTop: '32px' }} />
        </div>
      </div>
    </section>
  );
}

