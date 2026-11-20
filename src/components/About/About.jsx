import React from "react";
import { Typewriter } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { 
  ArrowDown, 
  Terminal as TerminalIcon, 
  FileText, 
  Sparkles, 
  Layers, 
  Smartphone, 
  Database,
  ExternalLink 
} from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import profileImage from "../../assets/piyush1.jpg";
import GlassBadge from "../ui/GlassBadge";

export default function About() {
  const { profile, projects } = usePortfolio();

  const nameParts = (profile?.fullName || "Piyush Shakya").trim().split(/\s+/);
  const firstName = nameParts[0] || "Piyush";
  const lastName = nameParts.slice(1).join(" ") || "Shakya";

  const headlineWords = [
    "Full Stack Software Engineer",
    "Spring Boot Microservices Architect",
    "Native Android Developer",
    "Distributed Cloud Systems Engineer"
  ];

  const bioText =
    profile?.bio ||
    "Full Stack Software Engineer specializing in high-throughput Spring Boot backends, distributed microservices, and native Android applications with Kotlin. Passionate about end-to-end system design, offline-first architectures, and clean developer tooling.";

  const resumeUrl =
    profile?.resumeUrl ||
    "https://drive.google.com/file/d/1mf0JDbuaqyRqfu5-spnWs4cr2GW1OLRw/view?usp=drive_link";

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent("open-terminal"));
  };

  return (
    <section
      id="about"
      className="relative min-h-[92vh] flex items-center justify-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 overflow-hidden bg-gray-950"
    >
      {/* Cinematic Ambient Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 md:w-[32rem] aspect-square bg-[#8245ec]/10 rounded-full blur-[100px] md:blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 md:w-[28rem] aspect-square bg-blue-600/10 rounded-full blur-[100px] md:blur-[140px]" />
        
        {/* Subtle dot matrix grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "36px 36px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Narrative & CTAs (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            {/* Pulsing Status Radar Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-md shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wide">
                Available for Senior Full-Stack &amp; Android Roles
              </span>
            </div>

            {/* Main Typographic Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                <span>{firstName} </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-[#8245ec] to-blue-400">
                  {lastName}
                </span>
              </h1>

              {/* Animated Typewriter Role */}
              <div className="h-8 sm:h-10 flex items-center justify-center lg:justify-start gap-2 text-base sm:text-xl md:text-2xl font-mono text-purple-300 font-medium">
                <span className="text-[#8245ec] font-bold">&gt;</span>
                <Typewriter
                  words={headlineWords}
                  loop={0}
                  cursor
                  cursorStyle="▋"
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              </div>
            </div>

            {/* Engineering Narrative Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {bioText}
            </p>

            {/* Credibility Highlights Strip (Bento Micro-Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#8245ec] mb-1">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase text-gray-400">Systems</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white font-mono">
                  {projects?.length ? `${projects.length}+ Live` : "4+ Live"}
                </div>
                <div className="text-[11px] text-gray-400">Cloud Web &amp; Mobile</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase text-gray-400">Mobile</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white font-mono">Kotlin</div>
                <div className="text-[11px] text-gray-400">Compose &amp; Room DB</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Database className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase text-gray-400">Backend</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white font-mono">Spring Boot</div>
                <div className="text-[11px] text-gray-400">Microservices &amp; JWT</div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3">
              <button
                type="button"
                onClick={() => scrollToSection("work")}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-2xl bg-gradient-to-r from-[#8245ec] to-blue-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-purple-950/40 hover:shadow-purple-500/30 transition-all cursor-pointer"
              >
                <span>Explore Showcase</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={openTerminal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-purple-500/30 hover:border-purple-400 text-purple-300 hover:text-white font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <TerminalIcon className="w-4 h-4 text-[#8245ec]" />
                <span>Terminal [⌘K]</span>
              </button>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-gray-300 hover:text-white font-semibold text-xs sm:text-sm transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 3D Tilt Avatar Portrait with Ambient Halo (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 aspect-square max-w-full">
              {/* Rotating Conic Halo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1.5 rounded-[36px] bg-gradient-to-tr from-[#8245ec] via-blue-500 to-purple-600 opacity-60 blur-md"
              />

              {/* 3D Tilt Container */}
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1200}
                className="relative w-full h-full rounded-[32px] overflow-hidden border-2 border-white/20 bg-gray-950 p-2 shadow-2xl"
              >
                <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-gray-900">
                  <img
                    src={profileImage}
                    alt={profile?.fullName || "Piyush Shakya"}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  {/* Subtle bottom gradient vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-transparent" />

                  {/* Corner Floating Tag */}
                  <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-gray-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-mono text-gray-300">Software Engineer</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#8245ec] font-bold">2026 Edition</span>
                  </div>
                </div>
              </Tilt>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
