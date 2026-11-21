import React, { useState } from "react";
import { Globe, Smartphone, Maximize2, ExternalLink, ShieldCheck, Wifi, Battery } from "lucide-react";

/**
 * DeviceFrame
 * High-fidelity simulated hardware frames:
 * - 'browser': macOS dark browser with traffic lights, URL bar, SSL lock, and interactive glass glare
 * - 'phone': Android smartphone mockup with dynamic island, speaker notch, status bar, and rounded bezels
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

  // Phone Mockup (Android / Modern Smartphone)
  if (type === "phone") {
    return (
      <div
        className={`relative mx-auto w-[240px] sm:w-[270px] md:w-[290px] aspect-[9/18.5] rounded-[42px] p-2.5 bg-gradient-to-b from-[#2a2c33] via-[#1a1b20] to-[#0d0e12] border-[3px] border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(130,69,236,0.15)] overflow-hidden group select-none ${className}`}
      >
        {/* Dynamic Island & Speaker Aperture */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-[#121318] border border-white/10 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-500/80 animate-pulse" />
          </div>
          <div className="w-8 h-1 rounded-full bg-gray-700/60" />
        </div>

        {/* Smartphone Screen Viewport */}
        <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-gray-950 border border-white/10 flex flex-col">
          {/* Status Bar */}
          <div className="h-7 w-full pt-1.5 px-6 flex items-center justify-between text-[10px] font-mono font-bold text-gray-300 z-20 shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="text-[9px]">5G</span>
              <Wifi className="w-2.5 h-2.5 text-white" />
              <Battery className="w-3 h-3 text-emerald-400" />
            </div>
          </div>

          {/* App Screen Content */}
          <div className="relative flex-1 w-full overflow-hidden bg-gray-900">
            {src && !hasError ? (
              <img
                src={src}
                alt={alt}
                onError={() => setHasError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu will-change-transform"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500 p-4 text-center">
                <Smartphone className="w-10 h-10 text-[#8245ec]" />
                <span className="text-xs font-mono font-medium text-gray-400">Native Android App</span>
              </div>
            )}

            {/* Glass Glare Sweep */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-70" />
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="h-4 w-full flex items-center justify-center z-20 bg-gray-950/60 backdrop-blur-xs">
            <div className="w-24 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    );
  }

  // Desktop macOS Browser Frame
  return (
    <div
      className={`relative w-full rounded-2xl border border-white/15 bg-gray-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(130,69,236,0.12)] overflow-hidden group select-none ${className}`}
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/90 border-b border-white/10 backdrop-blur-md">
        {/* macOS Traffic Lights with interactive glow */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/90 border border-rose-600/40 shadow-[0_0_6px_rgba(244,63,94,0.4)] group-hover:bg-rose-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-amber-500/90 border border-amber-600/40 shadow-[0_0_6px_rgba(245,158,11,0.4)] group-hover:bg-amber-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/90 border border-emerald-600/40 shadow-[0_0_6px_rgba(16,185,129,0.4)] group-hover:bg-emerald-500 transition-colors" />
        </div>

        {/* Safari / Chrome URL Address Bar */}
        <div className="flex-1 max-w-[260px] sm:max-w-sm mx-3 px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-mono text-gray-300 truncate shadow-inner">
          <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate text-gray-300">
            {url ? url.replace(/^https?:\/\//, "") : "system.piyushshakya.me"}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {onExpand && (
            <button
              type="button"
              onClick={onExpand}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Expand Full Preview"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Screen Viewport with Aspect Ratio */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden bg-gray-900">
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu will-change-transform"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500 p-6 text-center">
            <Globe className="w-10 h-10 text-[#8245ec]" />
            <span className="text-xs font-mono text-gray-400">Production Web Application</span>
          </div>
        )}

        {/* Glass specular sweep glare overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-60" />
      </div>
    </div>
  );
}
