'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

const reasons = [
  {
    icon: '◈',
    title: 'Product-First Thinking',
    description:
      'We think like product builders, not just developers. Every technical decision is weighed against its impact on the user experience and business value.',
  },
  {
    icon: '◎',
    title: 'Practical Innovation',
    description:
      'We apply new technology where it genuinely helps — not to impress, but to solve. AI, automation and modern architectures are tools, not trophies.',
  },
  {
    icon: '⬡',
    title: 'Scalable Architecture',
    description:
      'Systems we build are designed to grow. Cloud-native, modular and maintainable — because your software should never become a liability.',
  },
  {
    icon: '◻',
    title: 'Human-Centred Design',
    description:
      'Software should feel intuitive. We obsess over usability, accessibility and clarity — because the best software is the kind people actually want to use.',
  },
  {
    icon: '▲',
    title: 'Modern Engineering',
    description:
      'Clean code, tested features, CI/CD pipelines, and modern tooling. We build with discipline because quality is not a phase — it is a habit.',
  },
  {
    icon: '⬦',
    title: 'Long-Term Vision',
    description:
      'We build relationships, not just software. We stay invested in the products we build and the businesses we support — for the long run.',
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [titleRef.current];
    elements.forEach((el) => {
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
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="section-padding"
      style={{ background: '#F7F7F5' }}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div ref={titleRef}>
          <div className="flex items-center gap-4 mb-6">
            <span style={{ opacity: 0.4, fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: 500, textTransform: 'uppercase', color: '#080B72' }}>
              05 / Why Tatakae Labs
            </span>
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'rgba(8,11,114,0.15)' }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <h2 className="text-headline" style={{ color: '#080B72' }}>
              Built Different.
              <br />
              By Design.
            </h2>
            <div className="flex items-end">
              <p className="text-body" style={{ color: '#05062F', opacity: 0.55, maxWidth: '440px' }}>
                We are an emerging technology company with the mindset of a seasoned
                product studio. What sets us apart is not just what we build, but
                how we think about building it.
              </p>
            </div>
          </div>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0" style={{ border: '1px solid rgba(8,11,114,0.08)' }}>
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} reason={reason} index={i} />
          ))}
        </div>

        {/* Divider + Logo section */}
        <div
          className="mt-24 flex flex-col md:flex-row items-center gap-10"
          style={{ borderTop: '1px solid rgba(8,11,114,0.1)', paddingTop: '48px' }}
        >
          <div className="flex-shrink-0">
            <Image src="/logo.png" alt="TATAKAE LABS" width={80} height={80} />
          </div>
          <div className="flex-1">
            <p
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
                fontWeight: 700,
                color: '#080B72',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                maxWidth: '600px',
              }}
            >
              "We build technology that matters. Not to follow trends — but because
              the right software genuinely changes how businesses operate."
            </p>
            <p style={{ fontSize: '0.75rem', color: '#080B72', opacity: 0.4, marginTop: '16px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              — TATAKAE LABS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
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
      ref={cardRef}
      className="p-6 sm:p-8 lg:p-10 border-b border-[#080B72]/10 md:border-r last:border-b-0 lg:[&:nth-child(3n)]:border-r-0 transition-colors duration-300 hover:bg-[#080B72]/[0.03]"
    >
      <div
        style={{
          fontSize: '1.4rem',
          color: '#080B72',
          opacity: 0.35,
          marginBottom: '16px',
        }}
      >
        {reason.icon}
      </div>
      <h3 style={{
        fontSize: '1.05rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: '#080B72',
        marginBottom: '10px',
      }}>
        {reason.title}
      </h3>
      <p style={{
        fontSize: '0.875rem',
        lineHeight: 1.65,
        color: '#05062F',
        opacity: 0.6,
        fontWeight: 300,
      }}>
        {reason.description}
      </p>
    </div>
  );
}

