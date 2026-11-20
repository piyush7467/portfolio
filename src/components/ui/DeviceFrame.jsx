import React, { useState } from "react";
import { Globe, Smartphone, Maximize2, ExternalLink } from "lucide-react";

/**
 * DeviceFrame
 * Renders realistic, responsive mockups:
 * - 'browser': macOS dark browser window with traffic lights & URL bar
 * - 'phone': Sleek mobile device frame with dynamic island & rounded bezels
 */
export default function DeviceFrame({
  src,
  alt = "Screenshot",
  type = "browser", // "browser" | "phone"
  url = "",
  className = "",
  onExpand,
}) {
  const [hasError, setHasError] = useState(false);

  if (type === "phone") {
    return (
      <div
        className={`relative mx-auto w-[240px] sm:w-[260px] md:w-[280px] aspect-[9/19] rounded-[36px] p-2 bg-gradient-to-b from-gray-800 to-gray-950 border-2 border-white/20 shadow-2xl overflow-hidden group ${className}`}
      >
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse" />
        </div>

        {/* Screen Viewport */}
        <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-gray-900 border border-white/5">
          {src && !hasError ? (
            <img
              src={src}
              alt={alt}
              onError={() => setHasError(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500 p-4 text-center">
              <Smartphone className="w-8 h-8 text-[#8245ec]" />
              <span className="text-xs font-mono">Mobile App Viewport</span>
            </div>
          )}

          {/* Glare overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-60" />
        </div>
      </div>
    );
  }

  // Default: Browser Window
  return (
    <div
      className={`relative w-full rounded-xl sm:rounded-2xl border border-white/10 bg-gray-950/90 shadow-2xl overflow-hidden group ${className}`}
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white/[0.03] border-b border-white/10 backdrop-blur-md">
        {/* Traffic Light Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 border border-rose-600/40" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
        </div>

        {/* Simulated URL Pill */}
        <div className="flex-1 max-w-[200px] sm:max-w-xs mx-3 px-3 py-1 rounded-md sm:rounded-lg bg-black/40 border border-white/5 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-mono text-gray-400 truncate">
          <Globe className="w-3 h-3 text-[#8245ec] shrink-0" />
          <span className="truncate">{url ? url.replace(/^https?:\/\//, "") : "system.piyushshakya.me"}</span>
        </div>

        {/* Action button */}
        {onExpand ? (
          <button
            type="button"
            onClick={onExpand}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Expand Preview"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="w-4" />
        )}
      </div>

      {/* Screen Viewport with Aspect Ratio */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-gray-900/60">
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500 p-4 text-center">
            <Globe className="w-10 h-10 text-[#8245ec]" />
            <span className="text-xs font-mono">Web Application Interface</span>
          </div>
        )}

        {/* Subtle Bottom Ambient Gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-950/80 to-transparent" />
      </div>
    </div>
  );
}
