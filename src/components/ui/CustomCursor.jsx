import React, { useEffect, useRef, useState } from "react";

/**
 * CustomCursor
 * Smooth spring-follower cursor with contextual action labels ("VIEW", "OPEN").
 * Gated by (hover: hover) and (pointer: fine) for absolute zero mobile interference.
 */
export default function CustomCursor() {
  const [isSupported, setIsSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState("default");
  const [label, setLabel] = useState("");

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const checkSupport = () => setIsSupported(mql.matches);
    checkSupport();
    mql.addEventListener("change", checkSupport);

    return () => mql.removeEventListener("change", checkSupport);
  }, []);

  useEffect(() => {
    if (!isSupported) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== "function") return;

      const projectCard = target.closest("[data-cursor='project'], .project-card");
      const buttonOrLink = target.closest("button, a, [role='button'], input, textarea");

      if (projectCard) {
        setCursorState("project");
        setLabel("VIEW");
      } else if (buttonOrLink) {
        setCursorState("hover");
        setLabel("");
      } else {
        setCursorState("default");
        setLabel("");
      }
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }

      // Smooth lerp follower
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isSupported, isVisible]);

  if (!isSupported) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] will-change-transform transform-gpu"
      />

      {/* Spring Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center will-change-transform transform-gpu transition-[width,height,background-color,border-color] duration-150 ease-out ${
          cursorState === "project"
            ? "w-20 h-20 bg-purple-600/25 border border-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-xs"
            : cursorState === "hover"
            ? "w-12 h-12 bg-white/10 border border-white/40"
            : "w-8 h-8 border border-purple-400/50 bg-purple-500/5"
        }`}
      >
        {label && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase select-none animate-in zoom-in-75 duration-100">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
