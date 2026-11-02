'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { id: 'services', index: '01', label: 'Services', href: '#services' },
  { id: 'products', index: '02', label: 'Products', href: '#products' },
  { id: 'philosophy', index: '03', label: 'Philosophy', href: '#philosophy' },
  { id: 'why', index: '04', label: 'Why Us', href: '#why' },
  { id: 'contact', index: '05', label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          padding: scrolled ? '12px 16px' : '20px 24px',
          transition: 'padding 0.4s ease',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '1440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: scrolled ? '10px 22px' : '0px',
            backgroundColor: scrolled ? 'rgba(247, 247, 245, 0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
            borderRadius: scrolled ? '9999px' : '0px',
            border: scrolled ? '1px solid rgba(8, 11, 114, 0.1)' : '1px solid transparent',
            boxShadow: scrolled ? '0 16px 36px -10px rgba(5, 6, 47, 0.08)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Brand Logo & Name */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: '#080B72',
              userSelect: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
              }}
            >
              <Image
                src="/logo.png"
                alt="TATAKAE LABS Emblem"
                width={34}
                height={34}
                priority
                style={{ width: '34px', height: '34px', objectFit: 'contain' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  letterSpacing: '0.14em',
                  color: '#080B72',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                }}
              >
                TATAKAE LABS
              </span>
              <span
                style={{
                  fontSize: '0.58rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  color: 'rgba(8, 11, 114, 0.45)',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
                className="hidden sm:block"
              >
                tatakaelabs.tech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
            }}
            className="md:!flex"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.74rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: isActive ? 600 : 500,
                    color: '#080B72',
                    backgroundColor: isActive ? 'rgba(8, 11, 114, 0.08)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(8, 11, 114, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '0.6rem', opacity: 0.4, fontFamily: 'monospace' }}>
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}
          >
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary hidden sm:inline-flex"
              style={{
                padding: '9px 20px',
                fontSize: '0.72rem',
                textDecoration: 'none',
              }}
            >
              Start a Project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(8, 11, 114, 0.06)',
                border: 'none',
                cursor: 'pointer',
                padding: '10px',
                gap: '5px',
                touchAction: 'manipulation',
              }}
              aria-label="Toggle navigation drawer"
            >
              <span
                style={{
                  display: 'block',
                  width: '18px',
                  height: '1.5px',
                  backgroundColor: '#080B72',
                  transition: 'all 0.3s ease',
                  transform: mobileMenuOpen ? 'translateY(3.25px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '18px',
                  height: '1.5px',
                  backgroundColor: '#080B72',
                  transition: 'all 0.3s ease',
                  transform: mobileMenuOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 45,
          backgroundColor: '#F7F7F5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'max(90px, 12vh) 24px 36px',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'all' : 'none',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-16px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="md:hidden"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: 'rgba(8, 11, 114, 0.4)',
              textTransform: 'uppercase',
            }}
          >
            Navigation
          </span>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  fontSize: 'clamp(1.4rem, 6vw, 1.8rem)',
                  fontWeight: 700,
                  color: '#080B72',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(8, 11, 114, 0.1)',
                  paddingBottom: '10px',
                  minHeight: '44px',
                }}
              >
                <span>{item.label}</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.4 }}>
                  {item.index}
                </span>
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary w-full justify-center"
            style={{
              marginTop: '12px',
              padding: '14px 20px',
              fontSize: '0.82rem',
              textDecoration: 'none',
            }}
          >
            Start a Project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(8, 11, 114, 0.1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(8, 11, 114, 0.7)' }}>
            <span>Inquiries</span>
            <a
              href="mailto:tatakaelabs@gmail.com"
              style={{ fontWeight: 600, color: '#080B72', textDecoration: 'none' }}
            >
              tatakaelabs@gmail.com
            </a>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.68rem',
              color: 'rgba(8, 11, 114, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: 'monospace',
            }}
          >
            <span>tatakaelabs.tech</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </>
  );
}
