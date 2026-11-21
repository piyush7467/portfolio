import React, { useEffect, useRef, useState } from "react";

/**
 * SplashCursor
 * High-performance fluid particle trail for desktop pointer devices.
 * Automatically sleeps when idle to prevent GPU overhead and freezes particle generation during fast scroll.
 */
export default function SplashCursor() {
  const canvasRef = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) {
      setSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      setSupported(false);
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationId = null;
    let isRunning = false;
    let isScrolling = false;
    let scrollTimeout = null;

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Throttle particles while scrolling to guarantee 60-120fps scroll performance
    const onScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const particles = [];
    const maxParticles = 24;
    const colors = [
      { r: 130, g: 69, b: 236 }, // Purple #8245ec
      { r: 56, g: 189, b: 248 }, // Sky blue
      { r: 168, g: 85, b: 247 }, // Violet
    ];

    let lastX = width / 2;
    let lastY = height / 2;
    let colorIdx = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.size *= 0.96;

        if (p.life <= 0 || p.size < 1) {
          particles.splice(i, 1);
          continue;
        }

        const { r, g, b } = p.color;
        const a = Math.max(0, p.life * p.alpha);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (particles.length > 0) {
        animationId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        ctx.clearRect(0, 0, width, height);
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animationId = requestAnimationFrame(render);
      }
    };

    const onMouseMove = (e) => {
      if (isScrolling) return;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 4) {
        colorIdx = (colorIdx + 1) % colors.length;
        const color = colors[colorIdx];

        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: dx * 0.12,
          vy: dy * 0.12,
          size: Math.min(speed * 0.8, 18) + 4,
          alpha: 0.25,
          color,
          life: 1.0,
          decay: 0.035,
        });

        if (particles.length > maxParticles) {
          particles.shift();
        }

        startLoop();
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      if (animationId) cancelAnimationFrame(animationId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  if (!supported) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] w-full h-full transform-gpu will-change-transform"
    />
  );
}
