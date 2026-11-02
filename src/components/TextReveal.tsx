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

    const letters = el.querySelectorAll<HTMLElement>('.char');

    // Check reduced motion — immediately reveal text
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      letters.forEach((letter) => {
        letter.style.transform = 'none';
        letter.style.opacity = '1';
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  // Split words and characters preserving natural space
  const words = text.split(' ');

  return (
    <Tag ref={containerRef as any} className={`inline-flex flex-wrap items-baseline ${className}`}>
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          className="inline-flex overflow-hidden mr-[0.32em] pt-1 pb-1 -mt-1 -mb-1"
          style={{ verticalAlign: 'baseline' }}
        >
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="char inline-block will-change-transform"
              style={{
                transform: 'translateY(110%)',
                opacity: 0,
                lineHeight: 'inherit',
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

