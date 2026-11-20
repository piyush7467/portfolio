import React from "react";

/**
 * StarBorder
 * Premium glowing animated border effect inspired by PrathamPeriwal's portfolio.
 * Uses a rotating conic gradient behind an inner dark container with soft blur glow.
 */
export default function StarBorder({
  as: Component = "div",
  className = "",
  color = "#8245ec, #38bdf8, #a855f7, #ec4899",
  speed = "6s",
  borderRadius = "32px",
  children,
  ...rest
}) {
  return (
    <Component
      className={`relative inline-block overflow-hidden p-[2px] transition-all duration-300 ${className}`}
      style={{ borderRadius }}
      {...rest}
    >
      {/* Rotating Conic Gradient Beam */}
      <div
        className="pointer-events-none absolute -inset-[100%] z-0 animate-[spin_linear_infinite] opacity-80 blur-[6px] group-hover:opacity-100 transition-opacity"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${color}, transparent 60%)`,
          animationDuration: speed,
        }}
      />

      {/* Second High-Definition Crisp Border Layer */}
      <div
        className="pointer-events-none absolute -inset-[100%] z-0 animate-[spin_linear_infinite]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${color}, transparent 40%)`,
          animationDuration: speed,
        }}
      />

      {/* Inner Black/Obsidian Content Container */}
      <div
        className="relative z-10 w-full h-full bg-[#0a0a10] text-white"
        style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
      >
        {children}
      </div>
    </Component>
  );
}
