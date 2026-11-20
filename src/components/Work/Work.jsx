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
  Maximize2
} from "lucide-react";

// Project specific System Architecture & Highlight Metadata correctly mapped by project ID
const PROJECT_DETAILS = {
  1: { // CodifyX AI
    architecture: [
      { layer: "Frontend IDE", tech: "React.js + Monaco Editor + Tailwind", desc: "Interactive code editor with syntax highlighting, multi-language tabs, and real-time execution feedback." },
      { layer: "API Gateway & Security", tech: "Spring Boot + Spring Security + JWT", desc: "Microservices gateway handling route auth, user quotas, and submission histories." },
      { layer: "Code Execution Engine", tech: "Judge0 API + Microservices", desc: "Isolated sandbox compilation and test-case evaluation across C++, Java, Python, and JS." },
      { layer: "AI Assistance Layer", tech: "Google Gemini API + Groq LLaMA-3", desc: "Generates code explanations, optimization suggestions, and automatic bug fixes." },
      { layer: "Database Tier", tech: "PostgreSQL + Railway/Render Cloud", desc: "Relational persistence for submission logs, user profiles, and saved code snippets." }
    ],
    highlights: [
      "Spring Boot microservices architecture with isolated Judge0 execution sandbox",
      "Integrated Gemini AI & Groq API for code debugging and optimization",
      "Monaco Editor integration with custom test-case execution & submission history",
      "JWT-authenticated secure cloud deployment on Vercel, Railway, and Render"
    ]
  },
  2: { // MoneyMap
    architecture: [
      { layer: "Presentation Layer", tech: "Jetpack Compose + MVVM ViewModels", desc: "Declarative UI with unidirectional data flow and state hoisting." },
      { layer: "Background Operations", tech: "Kotlin Coroutines & WorkManager", desc: "Asynchronous task execution and scheduled background budget checks." },
      { layer: "Local Database", tech: "Room DB + SQLite", desc: "Local persistence for transaction tracking and offline data security." },
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
  },
  6: { // College Exam Prep
    architecture: [
      { layer: "Web Interface", tech: "Vanilla JS + HTML5 + CSS3", desc: "Fast responsive quiz engine with question timers." },
      { layer: "Explanation Engine", tech: "Custom Client Logic", desc: "Instant answer verification and step-by-step solutions." }
    ],
    highlights: [
      "Previous year exam paper practice quiz mode",
      "Detailed explanation breakdown for every MCQ question",
      "Performance scorecards & time analytics"
    ]
  },
  7: { // Pharmacy Website
    architecture: [
      { layer: "User Interface", tech: "HTML5 + CSS3 + Bootstrap", desc: "Service booking form and medical test catalog." },
      { layer: "Server Logic", tech: "PHP + MySQL Relational Database", desc: "Appointment scheduling and customer order records." }
    ],
    highlights: [
      "Online body checkup service booking portal",
      "Customizable pharmacy order management system",
      "Relational database structure for health records"
    ]
  }
};

const Work = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalTab, setModalTab] = useState("overview"); // 'overview' | 'architecture' | 'stack'
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const categories = ["All", "Full Stack", "Frontend", "Android App"];

  const getProjectCategory = (project) => {
    const tags = project.tags || [];
    if (tags.includes("Kotlin") || tags.includes("Android") || tags.includes("Jetpack Compose")) {
      return "Android App";
    }
    if (
      tags.includes("MongoDB") ||
      tags.includes("Node.js") ||
      tags.includes("Express.js") ||
      tags.includes("Spring Boot") ||
      tags.includes("Express") ||
      tags.includes("JWT")
    ) {
      return "Full Stack";
    }
    return "Frontend";
  };

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return getProjectCategory(project) === activeFilter;
  });

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalTab("overview");
    setIsZoomOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsZoomOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Escape key handler & modal body scroll lock cleanup
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        if (isZoomOpen) {
          setIsZoomOpen(false);
        } else {
          handleCloseModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject, isZoomOpen]);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const currentDetails = selectedProject ? PROJECT_DETAILS[selectedProject.id] || { architecture: [], highlights: [] } : { architecture: [], highlights: [] };

  return (
    <section
      id="work"
      className="relative py-10 sm:py-14 md:py-16 px-3 sm:px-6 md:px-8 lg:px-16 xl:px-32 font-sans overflow-hidden bg-gray-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#8245ec]/20 to-blue-500/20 backdrop-blur-sm border border-[#8245ec]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8245ec]" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">Portfolio Showcase</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
              Featured
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec]">
              Projects
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="h-px w-8 sm:w-12 md:w-20 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
            <p className="text-xs sm:text-base md:text-xl text-gray-400 max-w-2xl px-2">
              A curated collection of my best work, showcasing real-world solutions and technical expertise
            </p>
            <div className="h-px w-8 sm:w-12 md:w-20 bg-gradient-to-l from-transparent via-[#8245ec] to-transparent"></div>
          </div>

          {/* Interactive Category Filters */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-6 overflow-x-auto max-w-full pb-2 scrollbar-hide px-2">
            {categories.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                    isActive
                      ? "text-white bg-gradient-to-r from-[#8245ec] to-blue-600 shadow-lg shadow-[#8245ec]/25 border border-purple-400/40"
                      : "text-gray-400 bg-gray-900/60 hover:text-white hover:bg-gray-800/80 border border-white/10"
                  }`}
                >
                  {category === "All" && <Layers className="w-3.5 h-3.5" />}
                  {category === "Full Stack" && <Globe className="w-3.5 h-3.5" />}
                  {category === "Frontend" && <Code2 className="w-3.5 h-3.5" />}
                  {category === "Android App" && <Smartphone className="w-3.5 h-3.5" />}
                  <span>{category}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const category = getProjectCategory(project);
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleOpenModal(project)}
                  className="group relative cursor-pointer"
                >
                  {/* Card Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8245ec] to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col justify-between">
                    <div>
                      {/* Image Container */}
                      <div className="relative h-44 sm:h-52 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-90"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gray-950/85 backdrop-blur-md border border-white/10">
                          <span className="text-[11px] sm:text-xs font-semibold text-purple-300">
                            {category}
                          </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#8245ec]/85 to-blue-600/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-gray-900 font-semibold text-xs sm:text-sm shadow-xl">
                            <Eye className="w-4 h-4 text-[#8245ec]" />
                            <span>View Details & System Architecture</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm mb-3.5 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.tags.slice(0, 4).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-medium bg-white/5 text-gray-300 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 4 && (
                            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-medium bg-purple-950/50 text-purple-300 border border-purple-800/40">
                              +{project.tags.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1 text-purple-400 font-medium">
                        <span>Explore details</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-gray-500 font-mono text-[11px]">
                        {project.webapp ? "Live App" : "Mobile App"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Perfect Fixed-Header Multi-Tab Project Lightbox & Architecture Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={handleModalClick}
              className="relative w-full max-w-3xl max-h-[90vh] bg-gray-950 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* FIXED TOP HEADER BAR (Title, Badges, Close Button, AND 3 Tab Buttons ALWAYS VISIBLE) */}
              <div className="flex-shrink-0 bg-gray-950 border-b border-gray-800 p-4 sm:p-5 pb-3 space-y-3 z-30 shadow-md">
                {/* Top Row: Title, Badges & Close Button */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#8245ec] text-white">
                        {getProjectCategory(selectedProject)}
                      </span>
                      <span className="text-[11px] text-green-400 font-medium flex items-center gap-1 bg-green-950/80 px-2 py-0.5 rounded-full border border-green-800/60">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Production Project
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    aria-label="Close modal"
                    className="p-2 rounded-full bg-gray-900 hover:bg-[#8245ec] text-gray-300 hover:text-white transition-all border border-white/10 cursor-pointer flex-shrink-0"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Bottom Row: ALWAYS VISIBLE 3 TAB BUTTONS */}
                <div className="pt-2 flex items-center gap-2 overflow-x-auto scrollbar-hide border-t border-gray-800/80">
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
                        onClick={() => setModalTab(tab.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-[#8245ec] to-blue-600 text-white shadow-md shadow-[#8245ec]/40 ring-1 ring-purple-400/40"
                            : "text-gray-400 bg-gray-900/60 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SCROLLABLE BODY CONTENT */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 space-y-5 scrollbar-hide text-xs sm:text-sm">
                {/* TAB 1: OVERVIEW */}
                {modalTab === "overview" && (
                  <div className="space-y-5">
                    {/* Clean Compact Screenshot Box with Zoom Button */}
                    <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-gray-900 max-h-56 sm:max-h-72 flex items-center justify-center">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-contain sm:object-cover max-h-56 sm:max-h-72"
                      />

                      {/* Lightbox Zoom Button Overlay */}
                      <button
                        onClick={() => setIsZoomOpen(true)}
                        className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-950/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-purple-900 transition-all cursor-pointer shadow-lg"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>Zoom Photo</span>
                      </button>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>Project Description</span>
                      </h4>
                      <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Key Technical Highlights */}
                    {currentDetails.highlights && currentDetails.highlights.length > 0 && (
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span>Key Technical Highlights</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {currentDetails.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-900/70 border border-gray-800 text-xs text-gray-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: SYSTEM ARCHITECTURE */}
                {modalTab === "architecture" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white mb-1 flex items-center gap-1.5">
                        <Server className="w-4 h-4 text-cyan-400" />
                        <span>System Architecture & Component Layers</span>
                      </h4>
                      <p className="text-xs text-gray-400 mb-3">
                        Technical breakdown of layers for <span className="text-white font-semibold">{selectedProject.title}</span>:
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {currentDetails.architecture && currentDetails.architecture.map((arch, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-gray-900/80 border border-purple-500/20 space-y-1.5">
                          <div className="flex items-center justify-between flex-wrap gap-1.5">
                            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                              [ Layer {idx + 1}: {arch.layer} ]
                            </span>
                            <span className="px-2.5 py-0.5 rounded text-[11px] bg-gray-800 text-white font-mono border border-gray-700">
                              {arch.tech}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed pt-0.5">
                            {arch.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: TECH STACK & APIS */}
                {modalTab === "stack" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-purple-400" />
                        <span>Technologies & Libraries Stack</span>
                      </h4>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {selectedProject.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-900 text-purple-300 border border-purple-500/30 flex items-center gap-2"
                          >
                            <Code2 className="w-3.5 h-3.5 text-[#8245ec]" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons Footer */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-gray-800">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 font-semibold text-xs sm:text-sm border border-gray-700 transition-all cursor-pointer"
                    >
                      <Github className="w-4 h-4 text-gray-300 group-hover:text-white" />
                      <span>View Source Code ↗</span>
                    </a>
                  )}

                  {selectedProject.webapp && (
                    <a
                      href={selectedProject.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8245ec] to-blue-600 text-white font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-[#8245ec]/30 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Live Application ↗</span>
                    </a>
                  )}

                  {selectedProject.studioShowcaseUrl && (
                    <a
                      href={selectedProject.studioShowcaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 font-semibold text-xs sm:text-sm border border-purple-500/30 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>PiyushStudio 3D Showcase ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Image Lightbox Overlay */}
      <AnimatePresence>
        {isZoomOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/95 backdrop-blur-xl"
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-gray-900 text-white hover:bg-purple-600 transition-all border border-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;