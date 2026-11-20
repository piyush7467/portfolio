import React, { useState, useEffect } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  X, 
  Sparkles, 
  Code2,
  Eye,
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
  Download
} from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
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
  2: { // MoneyMap
    architecture: [
      { layer: "Presentation UI", tech: "Jetpack Compose + MVVM Architecture", desc: "Declarative UI with unidirectional data flow and state hoisting." },
      { layer: "Background Operations", tech: "Kotlin Coroutines & WorkManager", desc: "Asynchronous task execution and scheduled background budget checks." },
      { layer: "Local Database", tech: "Room DB + SQLite Engine", desc: "Local persistence for transaction tracking and offline data security." },
      { layer: "AI Processing Engine", tech: "Google Gemini API Integration", desc: "Generates smart spending insights, budget alerts, and recommendations." }
    ],
    highlights: [
      "Group expense splitting algorithms similar to Splitwise",
      "Custom date range budget alerts & real-time financial analytics",
      "AI-assisted financial advisor for spending analysis",
      "Offline-first architecture with local Room DB background syncing"
    ]
  },
  3: { // Smart School Management System
    architecture: [
      { layer: "Frontend Client", tech: "React.js + Tailwind CSS", desc: "Role-based dashboards for Admins, Teachers, and Students." },
      { layer: "Backend API Server", tech: "Node.js + Express.js REST API", desc: "Modular route handlers, middleware validation, and controllers." },
      { layer: "Database Tier", tech: "MongoDB Atlas + Mongoose ORM", desc: "Document schemas for attendance, grades, transport, and subjects." },
      { layer: "Security & Realtime", tech: "JWT Auth + Firebase Cloud Messaging", desc: "Token authentication and instant push notifications." }
    ],
    highlights: [
      "Multi-role dashboard access (Admin / Faculty / Student / Parent)",
      "Automated attendance logging & timetable scheduler",
      "Real-time announcements & complaint handling desk",
      "Transport tracking & Firebase FCM push alerts"
    ]
  },
  4: { // A Blog Website
    architecture: [
      { layer: "Frontend SPA", tech: "React.js + Responsive CSS", desc: "Interactive feed, blog creator, and comment interface." },
      { layer: "API Backend", tech: "Node.js + Express REST Services", desc: "Handles post CRUD operations, likes, and comment threads." },
      { layer: "Database", tech: "MongoDB Atlas", desc: "User posts, author profiles, and engagement data." }
    ],
    highlights: [
      "Full CRUD operations for publishing and editing articles",
      "Interactive like system and real-time comment threads",
      "Category tags & keyword search filters"
    ]
  },
  5: { // Course Selling Website
    architecture: [
      { layer: "User Dashboard", tech: "React.js + Tailwind CSS", desc: "Course catalog, video lecture player, and progress tracker." },
      { layer: "Instructor Portal", tech: "Express.js REST Microservices", desc: "Course builder, module publisher, and pricing engine." },
      { layer: "Data Layer", tech: "MongoDB Atlas Cloud", desc: "Enrollments, user progress, and video meta references." }
    ],
    highlights: [
      "Instructor course creator with video lecture management",
      "Student enrollment portal and progress tracking bar",
      "Filtering courses by category, rating, and instructor"
    ]
  }
};

export default function Work() {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalTab, setModalTab] = useState("overview"); // 'overview' | 'architecture' | 'stack'
  const [isZoomOpen, setIsZoomOpen] = useState(false);

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
    setIsZoomOpen(false);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsZoomOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedProject) {
        if (isZoomOpen) {
          setIsZoomOpen(false);
        } else {
          handleCloseModal();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedProject, isZoomOpen]);

  const currentDetails = selectedProject
    ? PROJECT_DETAILS[selectedProject.id] || { architecture: [], highlights: [] }
    : { architecture: [], highlights: [] };

  return (
    <section
      id="work"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 overflow-hidden bg-gray-950 font-sans"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[36rem] aspect-square bg-[#8245ec]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badge="Curated Systems"
          badgeIcon={Sparkles}
          titlePrefix="Production"
          titleHighlight="Engineering"
          titleSuffix="Showcase"
          description="Distributed full-stack microservices, cloud applications, and native Android releases engineered with modern production architectures."
        />

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10 sm:mb-14">
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

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-16 px-4 rounded-3xl bg-white/[0.02] border border-white/5 max-w-md mx-auto space-y-3">
              <Code2 className="w-8 h-8 text-[#8245ec] mx-auto" />
              <h3 className="text-base font-semibold text-white">No Projects Found</h3>
              <p className="text-xs text-gray-400">
                Curated systems in this category will appear here once added in the admin hub.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const category = getProjectCategory(project);
                const isAndroid = category === "Android App" || project.type === "ANDROID";

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <SpotlightCard className="h-full flex flex-col justify-between p-5 sm:p-6 group">
                      <div className="space-y-4">
                        {/* Device Frame Viewport Preview */}
                        <DeviceFrame
                          src={project.image}
                          alt={project.title}
                          type={isAndroid ? "phone" : "browser"}
                          url={project.webapp || project.webappUrl}
                          onExpand={() => handleOpenModal(project)}
                          className="cursor-pointer"
                        />

                        {/* Card Header & Badges */}
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#8245ec]/15 text-purple-300 border border-purple-500/30 font-semibold">
                              {category}
                            </span>
                            {project.highlight && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                ⭐ {project.highlight}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(project.tags || []).slice(0, 5).map((tag, tIdx) => (
                            <GlassBadge key={tIdx} variant="default">
                              {tag}
                            </GlassBadge>
                          ))}
                          {(project.tags || []).length > 5 && (
                            <GlassBadge variant="purple">
                              +{(project.tags || []).length - 5}
                            </GlassBadge>
                          )}
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleOpenModal(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Server className="w-3.5 h-3.5 text-[#8245ec]" />
                          <span>Architecture &amp; Specs</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex items-center gap-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              title="Source Code"
                              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/10 transition-all"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {project.webapp && (
                            <a
                              href={project.webapp}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#8245ec] to-blue-600 hover:from-purple-600 hover:to-blue-500 text-white text-xs font-bold shadow-md transition-all"
                            >
                              <span>{isAndroid ? "Get APK" : "Live Web"}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Multi-Tab Architecture & Deep Dive Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[88vh] bg-gray-950 rounded-3xl border border-purple-500/30 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Fixed Header */}
              <div className="p-4 sm:p-6 pb-3 border-b border-white/10 space-y-3 shrink-0 bg-gray-950">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#8245ec] text-white">
                        {getProjectCategory(selectedProject)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Production System
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-all cursor-pointer shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Tab Controls */}
                <div className="pt-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  {[
                    { id: "overview", label: "Overview", icon: Layout },
                    { id: "architecture", label: "System Architecture", icon: Server },
                    { id: "stack", label: "Tech Stack & APIs", icon: Cpu }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = modalTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setModalTab(tab.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-[#8245ec] to-blue-600 text-white shadow-md shadow-[#8245ec]/40 ring-1 ring-purple-400/40"
                            : "text-gray-400 bg-white/[0.03] hover:text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-purple-300" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-sm scrollbar-hide">
                {modalTab === "overview" && (
                  <div className="space-y-5">
                    {/* Visual Preview */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900 max-h-64 sm:max-h-72 flex items-center justify-center">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-contain max-h-64 sm:max-h-72"
                      />
                      <button
                        type="button"
                        onClick={() => setIsZoomOpen(true)}
                        className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-950/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-purple-900 transition-all cursor-pointer shadow-lg"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-purple-300" />
                        <span>Full Size</span>
                      </button>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5 font-mono">
                        <Sparkles className="w-4 h-4 text-[#8245ec]" />
                        <span>System Narrative &amp; Problem Solved</span>
                      </h4>
                      <p className="text-gray-300 leading-relaxed text-xs sm:text-sm font-sans">
                        {selectedProject.description}
                      </p>
                    </div>

                    {currentDetails.highlights && currentDetails.highlights.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5 font-mono">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span>Key Technical Accomplishments</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {currentDetails.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {modalTab === "architecture" && (
                  <div className="space-y-3.5">
                    <p className="text-xs text-gray-400 font-mono">
                      Component stack breakdown for <span className="text-white font-semibold">{selectedProject.title}</span>:
                    </p>

                    {currentDetails.architecture && currentDetails.architecture.length > 0 ? (
                      currentDetails.architecture.map((arch, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-purple-500/20 space-y-1.5">
                          <div className="flex items-center justify-between flex-wrap gap-1.5">
                            <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
                              [ Layer {idx + 1}: {arch.layer} ]
                            </span>
                            <span className="px-2.5 py-0.5 rounded-lg text-[11px] bg-white/[0.05] text-white font-mono border border-white/10">
                              {arch.tech}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {arch.desc}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-gray-400 bg-white/[0.02] rounded-2xl border border-white/5 font-mono text-xs">
                        Modular architecture breakdown available in PiyushStudio showcase.
                      </div>
                    )}
                  </div>
                )}

                {modalTab === "stack" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                      <Cpu className="w-4 h-4 text-[#8245ec]" />
                      <span>Technologies &amp; Libraries</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProject.tags || []).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white/[0.04] text-purple-300 border border-purple-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                      {selectedProject.webapp && (
                        <a
                          href={selectedProject.webapp}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8245ec] to-blue-600 text-white text-xs font-bold shadow-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Live System</span>
                        </a>
                      )}

                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] text-white text-xs font-mono font-semibold border border-white/10 hover:bg-white/[0.1]"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Photo Zoom */}
      <AnimatePresence>
        {isZoomOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomOpen(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedProject.image}
              alt={selectedProject.title}
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/15"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
