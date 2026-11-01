'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const footerLinks = {
  Services: [
    { label: 'Software Engineering', href: '#services' },
    { label: 'SaaS Product Development', href: '#services' },
    { label: 'Web & Mobile Apps', href: '#services' },
    { label: 'Business Automation', href: '#services' },
    { label: 'AI & Intelligent Systems', href: '#services' },
    { label: 'Product Consulting', href: '#services' },
  ],
  Products: [
    { label: 'CRM Platform', href: '#products' },
    { label: 'Assessment Engine', href: '#products' },
    { label: 'BusinessOS', href: '#products' },
    { label: 'BookingFlow', href: '#products' },
    { label: 'FlowAutomate', href: '#products' },
  ],
  Studio: [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Why Tatakae Labs', href: '#why' },
    { label: 'Methodology', href: '#philosophy' },
    { label: 'Start a Project', href: '#contact' },
  ],
};

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter / X', href: 'https://x.com' },
  { label: 'GitHub', href: 'https://github.com' },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [liveTime, setLiveTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@tatakaelabs.tech');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#05062F',
        color: '#F7F7F5',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '40px',
      }}
    >
      {/* Background Architectural Accent Lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(247,247,245,0.15) 30%, rgba(247,247,245,0.15) 70%, transparent)',
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 6vw' }}>
        {/* Top Direct Contact Action Banner */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '32px',
            paddingBottom: '70px',
            borderBottom: '1px solid rgba(247, 247, 245, 0.08)',
          }}
          className="lg:!flex-row lg:!items-end"
        >
          <div>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                color: 'rgba(247, 247, 245, 0.4)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Ready to engineer what&apos;s next?
            </span>
            <h3
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                color: '#F7F7F5',
                maxWidth: '680px',
              }}
            >
              Let&apos;s build something intelligent together.
            </h3>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            {/* Copyable Email Pill */}
            <button
              onClick={handleCopyEmail}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 24px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(247, 247, 245, 0.06)',
                border: '1px solid rgba(247, 247, 245, 0.15)',
                color: '#F7F7F5',
                fontSize: '0.82rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(247, 247, 245, 0.12)';
                e.currentTarget.style.borderColor = '#080B72';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(247, 247, 245, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(247, 247, 245, 0.15)';
              }}
            >
              <span style={{ fontFamily: 'monospace', color: '#7e87ff' }}>✉</span>
              <span>hello@tatakaelabs.tech</span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  backgroundColor: copied ? '#080B72' : 'rgba(247, 247, 245, 0.12)',
                  color: '#FFFFFF',
                  transition: 'all 0.3s ease',
                }}
              >
                {copied ? 'COPIED!' : 'COPY'}
              </span>
            </button>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 22px',
                borderRadius: '9999px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(247, 247, 245, 0.12)',
                color: 'rgba(247, 247, 245, 0.7)',
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F7F7F5';
                e.currentTarget.style.color = '#F7F7F5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(247, 247, 245, 0.12)';
                e.currentTarget.style.color = 'rgba(247, 247, 245, 0.7)';
              }}
            >
              <span>Back to Top</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M6 11V1M1 6l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Middle Navigation & Directory Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            paddingTop: '64px',
            paddingBottom: '64px',
          }}
        >
          {/* Identity & Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Image src="/logo.png" alt="TATAKAE LABS" width={34} height={34} />
              <span
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#F7F7F5',
                }}
              >
                TATAKAE LABS
              </span>
            </div>
            <p
              style={{
                fontSize: '0.84rem',
                lineHeight: 1.7,
                color: 'rgba(247, 247, 245, 0.5)',
                fontWeight: 300,
                maxWidth: '280px',
              }}
            >
              Intelligent software products, scalable digital platforms and custom technology solutions.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(247, 247, 245, 0.04)',
                border: '1px solid rgba(247, 247, 245, 0.08)',
                width: 'fit-content',
                fontFamily: 'monospace',
                fontSize: '0.68rem',
                color: 'rgba(247, 247, 245, 0.65)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ade80' }} />
              <span>LIVE // {liveTime || '20:45:00 UTC'}</span>
            </div>
          </div>

          {/* Directory Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(247, 247, 245, 0.35)',
                  fontFamily: 'monospace',
                }}
              >
                // {section}
              </span>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      style={{
                        color: 'rgba(247, 247, 245, 0.65)',
                        fontSize: '0.84rem',
                        fontWeight: 400,
                        textAlign: 'left',
                        padding: 0,
                        transition: 'color 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(247, 247, 245, 0.65)';
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(247, 247, 245, 0.35)',
                fontFamily: 'monospace',
              }}
            >
              // Channels
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'rgba(247, 247, 245, 0.65)',
                      fontSize: '0.84rem',
                      fontWeight: 400,
                      textDecoration: 'none',
                      transition: 'color 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(247, 247, 245, 0.65)';
                    }}
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
              <li style={{ marginTop: '8px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'monospace',
                    color: '#7e87ff',
                    letterSpacing: '0.08em',
                  }}
                >
                  tatakaelabs.tech
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized Typographic Statement Banner */}
        <div
          style={{
            userSelect: 'none',
            overflow: 'hidden',
            borderTop: '1px solid rgba(247, 247, 245, 0.08)',
            borderBottom: '1px solid rgba(247, 247, 245, 0.08)',
            padding: '24px 0',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(3rem, 12.5vw, 12rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              color: 'rgba(247, 247, 245, 0.06)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            TATAKAE LABS
          </div>
        </div>

        {/* Bottom Legal & Meta Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
            paddingTop: '32px',
            fontSize: '0.72rem',
            color: 'rgba(247, 247, 245, 0.4)',
            fontFamily: 'monospace',
          }}
          className="sm:!flex-row sm:!items-center"
        >
          <div>
            <span>© 2026 TATAKAE LABS (tatakaelabs.tech) · ALL RIGHTS RESERVED</span>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ color: 'rgba(247, 247, 245, 0.25)' }}>BUILD_SYSTEM // v2.6.0</span>
            <span style={{ color: '#4ade80' }}>● ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
