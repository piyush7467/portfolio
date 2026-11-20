import React, { useState } from "react";

/**
 * SquircleLogo
 * Uniform, responsive logo container that guarantees no image blowout or distortion.
 * Features built-in fallback handling if an image URL fails or is missing.
 */
export default function SquircleLogo({
  src,
  alt = "Logo",
  fallbackIcon: FallbackIcon,
  className = "",
  size = "md", // "sm" | "md" | "lg"
}) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-11 h-11 sm:w-12 sm:h-12",
    md: "w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18",
    lg: "w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7 sm:w-8 sm:h-8",
    lg: "w-8 h-8 sm:w-10 sm:h-10",
  };

  return (
    <div
      className={`relative shrink-0 rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.04] flex items-center justify-center overflow-hidden p-2 backdrop-blur-md shadow-inner transition-transform duration-300 group-hover:scale-105 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-contain filter drop-shadow-sm"
          loading="lazy"
        />
      ) : FallbackIcon ? (
        <FallbackIcon className={`${iconSizes[size] || iconSizes.md} text-[#8245ec]`} />
      ) : (
        <div className="w-2.5 h-2.5 rounded-full bg-[#8245ec]" />
      )}
    </div>
  );
}
