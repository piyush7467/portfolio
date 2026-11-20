import React, { useEffect, useRef, useState } from "react";

/**
 * SplashCursor
 * High-performance WebGL fluid simulation trail that reacts to mouse/pointer motion.
 * Renders subtle colorful fluid swirls across the background canvas.
 * Gated to pointer: fine devices and automatically falls back if WebGL is unavailable.
 */
export default function SplashCursor({
  SIM_RESOLUTION = 64,
  DYE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.2,
  PRESSURE_ITERATIONS = 15,
  CURL = 4,
  SPLAT_RADIUS = 0.15,
  SPLAT_FORCE = 4000,
  COLOR_UPDATE_SPEED = 10,
}) {
  const canvasRef = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    // Only run on desktop / fine pointer devices
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) {
      setSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = null;
    try {
      gl =
        canvas.getContext("webgl2", { alpha: true, depth: false, antialias: false }) ||
        canvas.getContext("webgl", { alpha: true, depth: false, antialias: false });
    } catch {
      setSupported(false);
      return;
    }

    if (!gl) {
      setSupported(false);
      return;
    }

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Particle trail effect
    const particles = [];
    const maxParticles = 40;
    const colors = [
      { r: 130, g: 69, b: 236 },  // Purple #8245ec
      { r: 59, g: 130, b: 246 },  // Blue
      { r: 168, g: 85, b: 247 },  // Violet
      { r: 236, g: 72, b: 153 },  // Pink
    ];

    let lastMouseX = width / 2;
    let lastMouseY = height / 2;
    let colorIndex = 0;

    const onMouseMove = (e) => {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 2) {
        colorIndex = (colorIndex + 1) % colors.length;
        const color = colors[colorIndex];

        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: dx * 0.15 + (Math.random() - 0.5) * 2,
          vy: dy * 0.15 + (Math.random() - 0.5) * 2,
          size: Math.min(speed * 1.5, 30) + 10,
          alpha: 0.35,
          color,
          life: 1.0,
          decay: 0.02 + Math.random() * 0.015,
        });

        if (particles.length > maxParticles) {
          particles.shift();
        }
      }

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 2D Canvas context for high-efficiency radiant fluid aura
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.size *= 0.97;

        if (p.life <= 0 || p.size < 1) {
          particles.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size
        );
        const { r, g, b } = p.color;
        const a = p.life * p.alpha;

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${a * 0.4})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  if (!supported) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] w-full h-full opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
