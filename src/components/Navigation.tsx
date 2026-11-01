'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#philosophy' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          paddingTop: scrolled ? '16px' : '24px',
          paddingBottom: scrolled ? '16px' : '24px',
          paddingLeft: '5vw',
          paddingRight: '5vw',
          background: scrolled ? 'rgba(247,247,245,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(8,11,114,0.08)' : 'none',
        }}
      >
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="TATAKAE LABS"
              width={36}
              height={36}
              style={{
                transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
              className="group-hover:rotate-12"
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                color: '#080B72',
                textTransform: 'uppercase',
              }}
            >
              Tatakae Labs
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover-underline"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: '#080B72',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.72rem' }}
            >
              Let&apos;s Build
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#080B72',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#080B72',
                transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#080B72',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-[99] md:hidden flex flex-col"
        style={{
          background: '#F7F7F5',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
          paddingTop: '100px',
          paddingLeft: '5vw',
          paddingRight: '5vw',
        }}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 8vw, 3rem)',
                fontWeight: 700,
                color: '#080B72',
                textDecoration: 'none',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
                letterSpacing: '-0.02em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div
          className="mt-auto mb-12"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.75rem',
            color: '#080B72',
            opacity: 0.4,
            letterSpacing: '0.1em',
          }}
        >
          © 2024 TATAKAE LABS
        </div>
      </div>
    </>
  );
}
