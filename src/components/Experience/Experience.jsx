import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, Sparkles, Layers, CheckCircle2 } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import SpotlightCard from "../ui/SpotlightCard";
import SquircleLogo from "../ui/SquircleLogo";
import GlassBadge from "../ui/GlassBadge";

const Experience = () => {
  const { experiences } = usePortfolio();

  return (
    <section
      id="experience"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 overflow-hidden bg-gray-950 font-sans"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
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
          badge="Career Timeline"
          badgeIcon={Briefcase}
          titlePrefix="Production"
          titleHighlight="Experience"
          titleSuffix="& Roles"
          description="Software engineering roles, scalable full-stack applications, and production contributions."
        />

        {/* Timeline Container */}
        <div className="relative mt-12 sm:mt-16">
          {(!experiences || experiences.length === 0) ? (
            <div className="text-center py-16 px-6 rounded-3xl bg-white/[0.02] border border-white/5 max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto text-purple-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">No Experience Records Available</h3>
              <p className="text-xs text-gray-400">
                Professional roles and internships stream live from the admin console.
              </p>
            </div>
          ) : (
            <>
              {/* Central / Left Laser Timeline Track */}
              <div className="absolute left-6 sm:left-8 md:left-1/2 md:-translate-x-1/2 top-4 bottom-8 w-0.5 bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent pointer-events-none" />

              {/* Experience Cards */}
              <div className="space-y-10 sm:space-y-14">
                {experiences.map((exp, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={exp.id || index}
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
                            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
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
                              src={exp.img}
                              alt={exp.company || "Company Logo"}
                              fallbackIcon={Building2}
                              size="lg"
                            />

                            <div className="min-w-0 flex-1 space-y-1.5">
                              <h3 className="text-base sm:text-lg md:text-xl font-bold font-display text-white leading-snug">
                                {exp.role}
                              </h3>

                              <div className="flex flex-wrap items-center gap-2">
                                <GlassBadge variant="purple">
                                  <Building2 className="w-3 h-3 mr-1 inline" />
                                  {exp.company}
                                </GlassBadge>

                                {exp.date && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-400">
                                    <Calendar className="w-3 h-3 text-purple-400" />
                                    <span>{exp.date}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Impact & Responsibilities Narrative */}
                          {exp.desc && (
                            <p className="text-xs sm:text-sm text-gray-300/90 leading-relaxed font-sans mb-4 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                              {exp.desc}
                            </p>
                          )}

                          {/* Tech Stacks / Skills Chips */}
                          {exp.skills && exp.skills.length > 0 && (
                            <div className="space-y-2 pt-2 border-t border-white/5">
                              <span className="text-[10px] font-mono uppercase font-semibold text-gray-400 tracking-wider flex items-center gap-1">
                                <Layers className="w-3 h-3 text-purple-400" />
                                Technologies &amp; Architecture:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {exp.skills.map((skill, sIdx) => (
                                  <GlassBadge key={sIdx} variant="default">
                                    {skill}
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
      </div>
    </section>
  );
};

export default Experience;
