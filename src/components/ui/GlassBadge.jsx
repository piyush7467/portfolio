import React from "react";

/**
 * GlassBadge
 * Multi-variant micro-badge with responsive padding and typography.
 */
export default function GlassBadge({
  children,
  icon: Icon,
  variant = "default", // "default" | "purple" | "emerald" | "outline"
  className = "",
  ...props
}) {
  const variantStyles = {
    default: "bg-white/[0.04] text-gray-300 border-white/10 hover:border-white/20",
    purple: "bg-[#8245ec]/10 text-purple-300 border-[#8245ec]/30 hover:bg-[#8245ec]/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/20",
    outline: "bg-transparent text-gray-400 border-white/15 hover:border-white/30 hover:text-white",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono font-medium border backdrop-blur-md transition-all duration-200 select-none ${variantStyles[variant] || variantStyles.default} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />}
      <span className="truncate">{children}</span>
    </span>
  );
}

