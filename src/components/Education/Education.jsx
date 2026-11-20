import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import SpotlightCard from "../ui/SpotlightCard";
import SquircleLogo from "../ui/SquircleLogo";
import GlassBadge from "../ui/GlassBadge";

const Education = () => {
  const { education } = usePortfolio();

  return (
    <section
      id="education"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 overflow-hidden bg-gray-950"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Unified Section Header */}
        <SectionHeader
          badge="Academic Foundation"
          badgeIcon={GraduationCap}
          titlePrefix="Academic"
          titleHighlight="Degrees"
          titleSuffix="& Rigor"
          description="Computer Science foundation, algorithmic problem solving, and key engineering coursework."
        />

        {/* Timeline Container */}
        <div className="relative mt-12 sm:mt-16">
          {(!education || education.length === 0) ? (
            <div className="text-center py-16 px-6 rounded-3xl bg-white/[0.02] border border-white/5 max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto text-purple-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">No Academic Records Available</h3>
              <p className="text-xs text-gray-400">
                Academic credentials stream live from the admin console.
              </p>
            </div>
          ) : (
            <>
              {/* Central / Left Laser Timeline Track */}
              <div className="absolute left-6 sm:left-8 md:left-1/2 md:-translate-x-1/2 top-4 bottom-8 w-0.5 bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent pointer-events-none" />

              {/* Education Cards */}
              <div className="space-y-10 sm:space-y-14">
                {education.map((edu, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={edu.id || index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true, amount: 0.15 }}
                      className="relative"
                    >
                      {/* Timeline Glowing Node */}
                      <div className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 top-7 z-20">
                        <div className="relative flex items-center justify-center">
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gray-900 border-2 border-purple-500/80 shadow-lg shadow-purple-500/30 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                          </div>
                          <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-25" />
                        </div>
                      </div>

                      {/* Card Content - Responsive Alternating on Desktop */}
                      <div
                        className={`ml-14 sm:ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                          isEven
                            ? "md:pr-4 md:mr-auto"
                            : "md:pl-4 md:ml-auto"
                        }`}
                      >
                        <SpotlightCard
                          spotlightColor="rgba(168, 85, 247, 0.15)"
                          className="p-5 sm:p-7 group"
                        >
                          {/* Card Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                            <SquircleLogo
                              src={edu.img}
                              alt={edu.school || "School Logo"}
                              fallbackIcon={GraduationCap}
                              size="lg"
                            />

                            <div className="min-w-0 flex-1 space-y-1.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold font-display text-white leading-snug">
                                  {edu.degree}
                                </h3>
                              </div>

                              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-purple-300 font-medium">
                                <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                <span className="truncate">{edu.school}</span>
                              </div>

                              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                                {edu.date && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-400">
                                    <Calendar className="w-3 h-3 text-purple-400" />
                                    <span>{edu.date}</span>
                                  </span>
                                )}

                                {edu.grade && (
                                  <GlassBadge variant="emerald">
                                    <Award className="w-3 h-3 mr-1 inline" />
                                    Grade: {edu.grade}
                                  </GlassBadge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Academic Narrative */}
                          {edu.desc && (
                            <p className="text-xs sm:text-sm text-gray-300/90 leading-relaxed font-sans mb-4 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                              {edu.desc}
                            </p>
                          )}

                          {/* Key Focus & Coursework Chips */}
                          {edu.keyFocus && edu.keyFocus.length > 0 && (
                            <div className="space-y-2 pt-2 border-t border-white/5">
                              <span className="text-[10px] font-mono uppercase font-semibold text-gray-400 tracking-wider flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-purple-400" />
                                Core Coursework &amp; Specialization:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {edu.keyFocus.map((focus, fIdx) => (
                                  <GlassBadge key={fIdx} variant="purple">
                                    {focus}
                                  </GlassBadge>
                                ))}
                              </div>
                            </div>
                          )}
                        </SpotlightCard>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Academic Pillar Summary Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-18 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-all flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Academic Rigor</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Strong theoretical foundation in DSA, DBMS, and discrete mathematics.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-all flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Applied Engineering</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Bridging academic projects with enterprise full-stack architectures.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-all flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Continuous Growth</h4>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Expanding competencies into distributed systems and Kotlin mobile platforms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
