'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'h2',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const letters = el.querySelectorAll('.char');
          animate(letters, {
            translateY: ['110%', '0%'],
            opacity: [0, 1],
            delay: stagger(28, { start: delay }),
            ease: 'outExpo',
            duration: 900,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  // Split words and characters preserving spaces
  const words = text.split(' ');

  return (
    <Tag ref={containerRef as any} className={`overflow-hidden inline-flex flex-wrap ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex overflow-hidden mr-[0.28em] py-1">
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="char inline-block will-change-transform"
              style={{ transform: 'translateY(110%)', opacity: 0 }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

