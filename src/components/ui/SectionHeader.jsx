import React from "react";
import { motion } from "framer-motion";

/**
 * SectionHeader
 * Consistent, responsive section title with badge, gradient text, and divider.
 */
export default function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  titlePrefix,
  titleHighlight,
  titleSuffix = "",
  description,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className={`text-center mb-10 sm:mb-14 md:mb-16 px-2 ${className}`}
    >
      {/* Pill Badge */}
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-inner mb-4 sm:mb-5">
          {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8245ec]" />}
          <span className="text-xs sm:text-sm font-medium tracking-wide text-gray-300 font-mono uppercase">
            {badge}
          </span>
        </div>
      )}

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
        {titlePrefix && <span>{titlePrefix} </span>}
        {titleHighlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-[#8245ec] to-blue-400">
            {titleHighlight}
          </span>
        )}
        {titleSuffix && <span> {titleSuffix}</span>}
      </h2>

      {/* Description & Elegant Divider */}
      {description && (
        <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto mt-2">
          <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-transparent via-[#8245ec]/40 to-transparent" />
          <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed font-sans">
            {description}
          </p>
          <div className="hidden sm:block h-px flex-1 bg-gradient-to-l from-transparent via-[#8245ec]/40 to-transparent" />
        </div>
      )}
    </motion.div>
  );
}

