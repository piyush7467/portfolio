import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  X, 
  Sparkles, 
  Code2,
  ChevronRight,
  Globe,
  Smartphone,
  Layers,
  CheckCircle2,
  Cpu,
  Server,
  Zap,
  Layout,
  Maximize2,
  ArrowUpRight,
  Download,
  Terminal,
  ShieldCheck
} from "lucide-react";
import DeviceFrame from "../ui/DeviceFrame";
import SectionHeader from "../ui/SectionHeader";
import GlassBadge from "../ui/GlassBadge";

// Project specific System Architecture & Highlight Metadata mapped by project ID
const PROJECT_DETAILS = {
  1: { // CodifyX AI
    architecture: [
      { layer: "Frontend Client & IDE", tech: "React.js + Monaco Editor + Tailwind", desc: "Interactive browser IDE with multi-language tabs, syntax tree analysis, and real-time execution feedback." },
      { layer: "API Gateway & Security", tech: "Spring Boot + Spring Security + JWT", desc: "Microservices gateway handling route rate-limiting, user quotas, and submission histories." },
      { layer: "Isolated Execution Engine", tech: "Judge0 Microservice Sandbox", desc: "Secure compilation and test-case evaluation across C++, Java, Python, and JavaScript." },
      { layer: "AI Assistance Tier", tech: "Google Gemini API + Groq LLaMA-3", desc: "Generates step-by-step code explanations, memory optimization suggestions, and real-time bug fixes." },
      { layer: "Database Tier", tech: "PostgreSQL + Render / Railway Cloud", desc: "Relational persistence for submission logs, user profiles, and saved code snippets." }
    ],
    highlights: [
      "Spring Boot microservices architecture with isolated execution sandbox",
      "Integrated Gemini AI & Groq API for code debugging and optimization",
      "Monaco Editor integration with custom test-case execution & submission history",
      "JWT-authenticated secure cloud deployment on Vercel, Railway, and Render"
    ]
  },
  2: { // MoneyMap / Seva Diary
    architecture: [
      { layer: "Presentation UI", tech: "Jetpack Compose + MVVM Architecture", desc: "Declarative UI with unidirectional data flow and state hoisting." },
      { layer: "Background Operations", tech: "Kotlin Coroutines & WorkManager", desc: "Asynchronous task execution and scheduled background budget checks." },
      { layer: "Local Database", tech: "Room DB + SQLite Engine", desc: "Local persistence for transaction tracking and offline data security." },
      { layer: "Backend API Sync", tech: "Node.js + Express + MongoDB Atlas", desc: "Cloud backup and synchronization for user preferences and records." }
    ],
    highlights: [
      "Offline-first mobile architecture with local Room DB background syncing",
      "Reactive Jetpack Compose UI with dark mode and smooth animations",
      "Background sync service and push notifications",
      "Direct production APK available for mobile download"
    ]
  },
  3: { // SwasthAi Report Generator
    architecture: [
      { layer: "Next.js Web Client", tech: "Next.js 14 + React + Tailwind", desc: "Fast SSR portal with dynamic medical parameter calculators and PDF export." },
      { layer: "Security Gateway", tech: "Spring Security + Java 21 Spring Boot", desc: "Role-based access control for pathologists, doctors, and lab admins." },
      { layer: "Database Tier", tech: "MongoDB Atlas Cloud", desc: "Patient histories, lab diagnostic parameters, and audit trails." }
    ],
    highlights: [
      "Full pathology laboratory workflow with automated parameter calculations",
      "Digitally signed diagnostic reports with custom clinic branding",
      "Enterprise Java 21 + Spring Boot 3 secure microservices architecture"
    ]
  }
};

export default function Work() {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalTab, setModalTab] = useState("overview"); // 'overview' | 'architecture' | 'stack'

  const categories = ["All", "Full Stack", "Android App", "Frontend"];

  const getProjectCategory = (project) => {
    const tags = project?.tags || [];
    if (project?.type === "ANDROID" || tags.includes("Kotlin") || tags.includes("Android") || tags.includes("Jetpack Compose")) {
      return "Android App";
    }
    if (
      tags.includes("MongoDB") ||
      tags.includes("Node.js") ||
      tags.includes("Express.js") ||
      tags.includes("Spring Boot") ||
      tags.includes("Express") ||
      tags.includes("JWT") ||
      project?.type === "WEB"
    ) {
      return "Full Stack";
    }
    return "Frontend";
  };

  const filteredProjects = (projects || []).filter((project) => {
    if (activeFilter === "All") return true;
    return getProjectCategory(project) === activeFilter;
  });

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalTab("overview");
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      id="work"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 overflow-hidden bg-gray-950 font-sans"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
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
          badge="Curated Systems"
          badgeIcon={Sparkles}
          titlePrefix="Production"
          titleHighlight="Engineering"
          titleSuffix="Showcase"
          description="Distributed full-stack microservices, cloud applications, and native Android releases engineered with modern production architectures."
        />

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-8 mb-12 sm:mb-16">
          {categories.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-mono font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#8245ec] to-blue-600 shadow-lg shadow-purple-950/40 border border-purple-400/40"
                    : "text-gray-400 bg-white/[0.03] hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                <span>{category}</span>
                {isActive && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white ml-2 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* CARD FLASH ONE ON OTHER EFFECT: Sticky Stacked Cards Corridor */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-white/[0.02] border border-white/5 max-w-md mx-auto space-y-3">
            <Code2 className="w-8 h-8 text-[#8245ec] mx-auto" />
            <h3 className="text-base font-semibold text-white">No Projects Found</h3>
            <p className="text-xs text-gray-400">
              Curated systems in this category will appear here once added in the admin hub.
            </p>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16 pb-12">
            {filteredProjects.map((project, index) => {
              const category = getProjectCategory(project);
              const isAndroid = category === "Android App" || project.type === "ANDROID";
              const extraDetails = PROJECT_DETAILS[project.id] || PROJECT_DETAILS[1];

              // Stacking sticky calculation: each card sticks slightly lower than previous card
              const topOffset = `calc(5.5rem + ${index * 20}px)`;

              return (
                <div
                  key={project.id}
                  style={{ top: topOffset }}
                  className="sticky transition-all duration-300"
                >
                  {/* Outer Card with Flash Glow & Shimmer Sweep */}
                  <div
                    data-cursor="project"
                    className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-black border border-white/15 shadow-[0_-15px_35px_rgba(0,0,0,0.8),0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden group hover:border-purple-500/50 transition-all duration-500"
                  >
                    {/* CARD FLASH EFFECT: Animated Shimmer Sweep across card */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.07] to-transparent z-10" />

                    {/* Ambient Radial Spotlight inside the card */}
                    <div className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl group-hover:bg-purple-600/25 transition-all duration-700" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
                      {/* Left Column: Metadata & System Highlights */}
                      <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                        {/* Badges Row */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#8245ec]/20 text-purple-300 border border-purple-500/30 font-bold tracking-wide">
                            {category}
                          </span>

                          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live System
                          </span>

                          {project.highlight && (
                            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                              ⭐ {project.highlight}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight group-hover:text-purple-200 transition-colors">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                          {project.description}
                        </p>

                        {/* Highlights Bullets */}
                        {extraDetails?.highlights && (
                          <div className="space-y-2 py-2">
                            {extraDetails.highlights.slice(0, 2).map((highlight, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300/90">
                                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(project.tags || []).slice(0, 6).map((tag, tIdx) => (
                            <GlassBadge key={tIdx} variant="default">
                              {tag}
                            </GlassBadge>
                          ))}
                          {(project.tags || []).length > 6 && (
                            <GlassBadge variant="purple">
                              +{(project.tags || []).length - 6} more
                            </GlassBadge>
                          )}
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-3">
                          {isAndroid ? (
                            <a
                              href={project.webapp || project.studioShowcaseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                              <span>Get Android APK</span>
                            </a>
                          ) : (
                            project.webapp && (
                              <a
                                href={project.webapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                              >
                                <Globe className="w-4 h-4" />
                                <span>Live Demo</span>
                                <ArrowUpRight className="w-4 h-4" />
                              </a>
                            )
                          )}

                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-gray-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                            >
                              <Github className="w-4 h-4" />
                              <span>Source</span>
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => handleOpenModal(project)}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                          >
                            <Layers className="w-4 h-4" />
                            <span>Architecture &amp; Specs</span>
                          </button>
                        </div>
                      </div>

                      {/* Right Column: SCREEN FRAME (Browser or Phone) */}
                      <div className="lg:col-span-6 flex items-center justify-center">
                        <DeviceFrame
                          src={project.image}
                          alt={project.title}
                          type={isAndroid ? "phone" : "browser"}
                          url={project.webapp || project.studioShowcaseUrl}
                          onExpand={() => handleOpenModal(project)}
                          className="cursor-pointer hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SYSTEM ARCHITECTURE & DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] bg-gray-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-gray-900/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold font-display text-white">
                      {selectedProject.title}
                    </h4>
                    <p className="text-xs text-gray-400 font-mono">
                      System Design &amp; Architectural Specifications
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-gray-900/30">
                {[
                  { id: "overview", label: "Overview & Impact" },
                  { id: "architecture", label: "Multi-Tier Architecture" },
                  { id: "stack", label: "Technology Stack" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setModalTab(tab.id)}
                    className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer relative ${
                      modalTab === tab.id
                        ? "text-purple-400 border-b-2 border-purple-500"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Modal Content Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {modalTab === "overview" && (
                  <div className="space-y-6">
                    <DeviceFrame
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      type={selectedProject.type === "ANDROID" ? "phone" : "browser"}
                      url={selectedProject.webapp}
                    />

                    <div className="space-y-2">
                      <h5 className="text-sm font-mono uppercase text-gray-400 font-bold">
                        Problem Statement &amp; Solution
                      </h5>
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
                        {selectedProject.description}
                      </p>
                    </div>

                    {PROJECT_DETAILS[selectedProject.id]?.highlights && (
                      <div className="space-y-2.5">
                        <h5 className="text-sm font-mono uppercase text-gray-400 font-bold">
                          Key Production Highlights
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {PROJECT_DETAILS[selectedProject.id].highlights.map((h, i) => (
                            <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {modalTab === "architecture" && (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400 leading-relaxed font-mono">
                      Component breakdown across application layers, microservice gateways, and persistent data tiers.
                    </p>

                    {(PROJECT_DETAILS[selectedProject.id]?.architecture || PROJECT_DETAILS[1].architecture).map((tier, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h6 className="text-sm font-bold text-white flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center font-mono">
                              {tIdx + 1}
                            </span>
                            <span>{tier.layer}</span>
                          </h6>
                          <GlassBadge variant="purple">{tier.tech}</GlassBadge>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed pl-7">
                          {tier.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {modalTab === "stack" && (
                  <div className="space-y-4">
                    <h5 className="text-sm font-mono uppercase text-gray-400 font-bold">
                      Integrated Technologies &amp; Libraries
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProject.tags || []).map((tag, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono font-semibold text-gray-200 flex items-center gap-1.5"
                        >
                          <Cpu className="w-3.5 h-3.5 text-purple-400" />
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-gray-900/60 flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-gray-400 hidden sm:inline">
                  Streaming live from MongoDB Atlas
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  {selectedProject.webapp && (
                    <a
                      href={selectedProject.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all"
                    >
                      <span>Visit Live System</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
