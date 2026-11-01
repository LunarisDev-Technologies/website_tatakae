'use client';

import { useRef, useEffect, useState } from 'react';

const products = [
  {
    name: 'CRM Platform',
    description: 'An intelligent customer relationship management system built for growing sales teams. Manage leads, track interactions, and automate follow-ups with ease.',
    category: 'Customer Relationship Management',
    status: 'In Development',
    statusColor: '#080B72',
  },
  {
    name: 'Assessment Engine',
    description: 'A powerful examination and assessment platform for educational institutions and coaching institutes. Adaptive testing, instant results, and detailed analytics.',
    category: 'Assessment & Examination',
    status: 'In Development',
    statusColor: '#080B72',
  },
  {
    name: 'BusinessOS',
    description: 'A unified business management platform that brings together operations, team management, billing and reporting into a single coherent workflow.',
    category: 'Business Management',
    status: 'Concept',
    statusColor: '#9898A8',
  },
  {
    name: 'BookingFlow',
    description: 'A smart booking and scheduling system designed for service businesses. Reduce no-shows, automate reminders, and manage resources efficiently.',
    category: 'Booking & Management',
    status: 'Concept',
    statusColor: '#9898A8',
  },
  {
    name: 'FlowAutomate',
    description: 'A visual workflow automation tool that connects your business tools and triggers actions without writing code. Build, deploy, and iterate fast.',
    category: 'Workflow Automation',
    status: 'Concept',
    statusColor: '#9898A8',
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            el.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`;
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
        padding: '36px 32px',
        background: '#F7F7F5',
        border: `1px solid ${hovered ? '#080B72' : 'rgba(8,11,114,0.1)'}`,
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px',
        position: 'relative' as const,
      }}
    >
      {/* Status + Category */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span
          className="tag-pill"
          style={{
            color: 'rgba(8,11,114,0.5)',
            borderColor: 'rgba(8,11,114,0.2)',
            fontSize: '0.6rem',
          }}
        >
          {product.category}
        </span>
        <div className="flex items-center gap-2">
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: product.statusColor,
            opacity: product.status === 'In Development' ? 1 : 0.4,
          }} />
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: product.statusColor,
            opacity: product.status === 'In Development' ? 0.7 : 0.4,
            textTransform: 'uppercase',
          }}>
            {product.status}
          </span>
        </div>
      </div>

      {/* Name */}
      <h3 style={{
        fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: '#080B72',
        lineHeight: 1.1,
      }}>
        {product.name}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.875rem',
        lineHeight: 1.65,
        color: '#05062F',
        opacity: 0.55,
        fontWeight: 300,
        flex: 1,
      }}>
        {product.description}
      </p>

      {/* CTA */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#080B72',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.3s ease',
        cursor: 'default',
      }}>
        Coming Soon
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

export default function ProductsSection() {
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
    <section id="products" className="section-padding" style={{ background: '#05062F' }}>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span style={{ opacity: 0.3, fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: 500, textTransform: 'uppercase', color: '#F7F7F5' }}>
                03 / Our Products
              </span>
              <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'rgba(247,247,245,0.12)' }} />
            </div>
            <h2 className="text-headline" style={{ color: '#F7F7F5' }}>
              A Growing
              <br />
              Ecosystem.
            </h2>
          </div>
          <p className="text-body" style={{ color: '#F7F7F5', opacity: 0.4, maxWidth: '360px' }}>
            We are building a multi-product technology ecosystem. Each product is
            designed to solve a specific problem — precisely, beautifully, and at scale.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="mt-12 pt-8 flex items-center gap-4"
          style={{ borderTop: '1px solid rgba(247,247,245,0.08)' }}
        >
          <div style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: '#080B72',
            flexShrink: 0,
          }} />
          <p style={{
            fontSize: '0.8rem',
            color: '#F7F7F5',
            opacity: 0.3,
            fontWeight: 300,
            lineHeight: 1.6,
          }}>
            Our product roadmap is continuously evolving. New products are added as we
            identify opportunities to build meaningful technology solutions.
          </p>
        </div>
      </div>
    </section>
  );
}

