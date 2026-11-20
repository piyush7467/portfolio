import React, { useState } from "react";
import { motion } from "framer-motion";
import { SkillsInfo } from "../../data/skillsData";
import { 
  Code2, 
  Database, 
  Terminal, 
  Layers, 
  Sparkles, 
  Globe, 
  Cpu, 
  CheckCircle2,
  Server,
  Wrench
} from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import SpotlightCard from "../ui/SpotlightCard";
import GlassBadge from "../ui/GlassBadge";

const categoryMeta = {
  Frontend: {
    icon: Globe,
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    badge: "purple",
    description: "Responsive web architectures, modern component systems, and fluid UI experiences."
  },
  Backend: {
    icon: Server,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    badge: "emerald",
    description: "Robust RESTful APIs, Spring Boot & Node services, and optimized relational/NoSQL datastores."
  },
  Languages: {
    icon: Terminal,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    badge: "emerald",
    description: "Strong foundational programming in Java, Kotlin, C/C++, and modern JavaScript."
  },
  Tools: {
    icon: Wrench,
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    badge: "default",
    description: "Industry-standard developer tooling, containerization, version control, and design platforms."
  }
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories = activeCategory === "all" 
    ? SkillsInfo 
    : SkillsInfo.filter(c => c.title.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 overflow-hidden bg-gray-950 font-sans"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
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
          badge="Technical Competencies"
          badgeIcon={Cpu}
          titlePrefix="Core Tech"
          titleHighlight="Stack"
          titleSuffix="& Architecture"
          description="A comprehensive toolkit spanning enterprise backend systems, reactive frontend frameworks, and mobile engineering."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 sm:mt-10 mb-8 sm:mb-12">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-500/50"
                : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
            }`}
          >
            All Categories ({SkillsInfo.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>

          {SkillsInfo.map((cat) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => setActiveCategory(cat.title.toLowerCase())}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.title.toLowerCase()
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-500/50"
                  : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
              }`}
            >
              {cat.title} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredCategories.map((category, idx) => {
            const meta = categoryMeta[category.title] || {
              icon: Sparkles,
              color: "from-purple-500/20 to-blue-500/20",
              border: "border-purple-500/30",
              badge: "default",
              description: ""
            };
            const Icon = meta.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <SpotlightCard
                  spotlightColor="rgba(168, 85, 247, 0.12)"
                  className="p-6 sm:p-7 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-display text-white">
                            {category.title}
                          </h3>
                          <span className="text-[11px] font-mono text-gray-400">
                            {category.skills.length} Competencies
                          </span>
                        </div>
                      </div>

                      <GlassBadge variant={meta.badge}>
                        Active
                      </GlassBadge>
                    </div>

                    <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                      {meta.description}
                    </p>

                    {/* Skill Pills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {category.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="group/skill flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all"
                        >
                          <div className="w-7 h-7 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 p-1 group-hover/skill:scale-110 transition-transform">
                            {skill.logo ? (
                              <img
                                src={skill.logo}
                                alt={skill.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Code2 className="w-3.5 h-3.5 text-purple-400" />
                            )}
                          </div>
                          <span className="text-xs font-medium text-gray-300 group-hover/skill:text-white truncate">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Micro Footer Indicator */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Production Tested
                    </span>
                    <span>100% Responsive</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
