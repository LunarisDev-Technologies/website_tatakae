'use client';

import { useRef, useEffect, useState } from 'react';

const services = [
  {
    number: '01',
    title: 'Software Engineering',
    description: 'Custom-built software and scalable digital platforms engineered for performance, reliability and growth.',
    tags: ['Architecture', 'APIs', 'Cloud'],
  },
  {
    number: '02',
    title: 'SaaS Product Development',
    description: 'End-to-end development of modern subscription-based software products — from concept to market.',
    tags: ['Product', 'Subscriptions', 'B2B'],
  },
  {
    number: '03',
    title: 'Web & Mobile Applications',
    description: 'High-performance digital experiences across devices — fast, accessible and built to convert.',
    tags: ['React', 'Next.js', 'React Native'],
  },
  {
    number: '04',
    title: 'Business Automation',
    description: 'Streamlining operations through intelligent systems, workflow automation and deep integrations.',
    tags: ['CRM', 'Workflows', 'Integration'],
  },
  {
    number: '05',
    title: 'AI & Intelligent Systems',
    description: 'Practical AI-powered tools and intelligent software experiences that genuinely move business forward.',
    tags: ['LLMs', 'Automation', 'AI Agents'],
  },
  {
    number: '06',
    title: 'Product Design & Consulting',
    description: 'Turning ideas into structured, usable and scalable digital products through strategic design thinking.',
    tags: ['UX Design', 'Strategy', 'Prototyping'],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            el.style.transition = `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`;
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '40px 32px',
        border: `1px solid ${hovered ? '#080B72' : 'rgba(8,11,114,0.1)'}`,
        background: hovered ? '#080B72' : '#F7F7F5',
        color: hovered ? '#F7F7F5' : '#05062F',
        cursor: 'default',
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
        minHeight: '280px',
        position: 'relative' as const,
        overflow: 'hidden',
      }}
    >
      {/* Number */}
      <span
        style={{
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.15em',
          opacity: hovered ? 0.5 : 0.3,
          transition: 'opacity 0.4s ease',
        }}
      >
        {service.number}
      </span>

      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          flex: 1,
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.875rem',
          lineHeight: 1.65,
          opacity: hovered ? 0.75 : 0.6,
          fontWeight: 300,
          transition: 'opacity 0.4s ease',
        }}
      >
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="tag-pill"
            style={{
              borderColor: hovered ? 'rgba(247,247,245,0.3)' : 'rgba(8,11,114,0.2)',
              color: hovered ? 'rgba(247,247,245,0.7)' : 'rgba(8,11,114,0.5)',
              transition: 'all 0.4s ease',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow on hover */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          opacity: hovered ? 0.6 : 0,
          transform: hovered ? 'translate(0, 0)' : 'translate(-8px, 8px)',
          transition: 'all 0.4s ease',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

export default function ServicesSection() {
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
    <section id="services" className="section-padding" style={{ background: '#F7F7F5' }}>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span style={{ opacity: 0.4, fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: 500, textTransform: 'uppercase', color: '#080B72' }}>
                02 / What We Do
              </span>
              <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'rgba(8,11,114,0.15)' }} />
            </div>
            <h2 className="text-headline" style={{ color: '#080B72' }}>
              Our
              <br />
              Capabilities.
            </h2>
          </div>
          <p
            className="text-body"
            style={{ color: '#05062F', opacity: 0.55, maxWidth: '340px' }}
          >
            A focused set of capabilities designed to take ideas from concept to
            production with precision and ambition.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(8,11,114,0.08)' }}>
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

