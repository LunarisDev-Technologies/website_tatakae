'use client';

import { useRef, useEffect } from 'react';
import TextReveal from './TextReveal';

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.15 }
    );

    [headRef.current, bodyRef.current].forEach((el) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 1s cubic-bezier(0.23, 1, 0.32, 1), transform 1s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="section-padding"
      style={{ background: '#080B72', color: '#F7F7F5' }}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span style={{ opacity: 0.4, fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: 500, textTransform: 'uppercase' }}>
            01 / Who We Are
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(247,247,245,0.12)' }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — headline */}
          <div>
            <h2
              ref={headRef}
              className="text-headline"
              style={{ color: '#F7F7F5' }}
            >
              <TextReveal text="NOT JUST SOFTWARE." as="span" delay={100} />
              <br />
              <TextReveal text="A BETTER WAY" as="span" delay={300} />
              <br />
              <TextReveal text="FORWARD." as="span" delay={500} />
            </h2>
          </div>

          {/* Right — body */}
          <div
            ref={bodyRef}
            className="flex flex-col justify-end"
          >
            <p
              className="text-body mb-8"
              style={{ color: '#F7F7F5', opacity: 0.7, maxWidth: '480px' }}
            >
              TATAKAE LABS builds technology that solves real-world problems.
              We believe software should be useful, intuitive, scalable — and
              beautifully engineered.
            </p>
            <p
              className="text-body mb-12"
              style={{ color: '#F7F7F5', opacity: 0.5, maxWidth: '480px' }}
            >
              From bespoke SaaS platforms to AI-powered automation, we partner
              with ambitious businesses to design, build and ship the systems
              that drive their next chapter.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 sm:gap-12">
              {[
                { value: '10+', label: 'Service Areas' },
                { value: '∞', label: 'Product Possibilities' },
                { value: '01', label: 'Clear Focus' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                      fontWeight: 700,
                      color: '#F7F7F5',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      color: '#F7F7F5',
                      opacity: 0.4,
                      textTransform: 'uppercase',
                      marginTop: '6px',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee ticker */}
        <div className="mt-12 sm:mt-20 overflow-hidden" style={{ borderTop: '1px solid rgba(247,247,245,0.1)', paddingTop: '20px' }}>
          <div className="marquee-track" aria-hidden>
            {[
              'Software Engineering',
              'SaaS Products',
              'Web Applications',
              'Mobile Apps',
              'Business Automation',
              'AI Systems',
              'Product Design',
              'Digital Transformation',
              'Software Engineering',
              'SaaS Products',
              'Web Applications',
              'Mobile Apps',
              'Business Automation',
              'AI Systems',
              'Product Design',
              'Digital Transformation',
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: '#F7F7F5',
                  opacity: 0.3,
                  textTransform: 'uppercase',
                  flexShrink: 0,
                }}
              >
                {item}
                <span style={{ margin: '0 2rem', opacity: 0.3 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

