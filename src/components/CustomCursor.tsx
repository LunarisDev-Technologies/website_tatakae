'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch / mobile devices (Android, iOS, tablets)
    if (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .interactive-target');
      setHovered(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    let frameId: number;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      frameId = requestAnimationFrame(follow);
    };

    frameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(frameId);
  }, [position, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Central pointer dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-transform duration-75"
        style={{
          width: hovered ? '8px' : '6px',
          height: hovered ? '8px' : '6px',
          backgroundColor: '#080B72',
          transform: `translate3d(${position.x - (hovered ? 4 : 3)}px, ${position.y - (hovered ? 4 : 3)}px, 0)`,
        }}
      />
      {/* Trailing smooth magnetic ring */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full transition-[width,height,border-color,background-color] duration-300 ease-out"
        style={{
          width: hovered ? '52px' : '28px',
          height: hovered ? '52px' : '28px',
          border: `1.5px solid ${hovered ? 'rgba(8, 11, 114, 0.45)' : 'rgba(8, 11, 114, 0.25)'}`,
          backgroundColor: hovered ? 'rgba(8, 11, 114, 0.05)' : 'transparent',
          transform: `translate3d(${trailingPos.x - (hovered ? 26 : 14)}px, ${trailingPos.y - (hovered ? 26 : 14)}px, 0)`,
        }}
      />
    </>
  );
}

