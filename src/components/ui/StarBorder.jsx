import React from "react";

/**
 * StarBorder
 * Ultra-smooth, GPU-accelerated glowing animated border effect.
 * Uses a single isolated hardware-accelerated conic gradient running on the compositor thread.
 * Contains no layout transitions to eliminate any scrolling jitter or frame drops.
 */
export default function StarBorder({
  as: Component = "div",
  className = "",
  color = "#8245ec, #38bdf8, #a855f7",
  speed = "8s",
  borderRadius = "32px",
  children,
  ...rest
}) {
  return (
    <Component
      className={`relative inline-block overflow-hidden p-[2px] transform-gpu will-change-transform ${className}`}
      style={{ borderRadius, contain: "paint" }}
      {...rest}
    >
      {/* High-Performance Hardware-Accelerated Conic Beam */}
      <div
        className="pointer-events-none absolute -inset-[150%] z-0 animate-[spin_linear_infinite] transform-gpu will-change-transform opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${color}, transparent 120deg)`,
          animationDuration: speed,
          transform: "translateZ(0)",
        }}
      />

      {/* Inner Obsidian Background Container */}
      <div
        className="relative z-10 w-full h-full bg-[#090a10] text-white"
        style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
      >
        {children}
      </div>
    </Component>
  );
}
