import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowUp } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import { Code2, Terminal as TerminalIcon, Sparkles } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const MENU_ITEMS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { profile } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const resumeUrl =
    profile?.resumeUrl ||
    "https://drive.google.com/file/d/1mf0JDbuaqyRqfu5-spnWs4cr2GW1OLRw/view?usp=drive_link";

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 400);

      // Active section detection
      const sectionIds = MENU_ITEMS.map((item) => item.id);
      const scrollPos = window.scrollY + 140;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll on mobile open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent("open-terminal"));
  };

  return (
    <>
      {/* Floating Glass Dock Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 py-3 sm:py-4 px-4 sm:px-6 pointer-events-none"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo Badge */}
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-gray-950/80 backdrop-blur-xl border border-white/10 shadow-lg hover:border-purple-500/40 transition-all cursor-pointer select-none"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8245ec]/30 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-[#8245ec]" />
            </div>
            <div className="flex items-center gap-1 font-bold text-sm sm:text-base tracking-tight">
              <span className="text-white">Piyush</span>
              <span className="text-[#8245ec]">/</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#8245ec]">
                Shakya
              </span>
            </div>
          </button>

          {/* Centered Floating Nav Dock (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-gray-950/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80">
            {MENU_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8245ec] to-blue-600 shadow-md shadow-[#8245ec]/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Terminal Launcher */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Terminal Trigger [>_] */}
            <button
              type="button"
              onClick={openTerminal}
              title="Open Developer Terminal (Ctrl+K)"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-950/80 backdrop-blur-xl border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 text-xs font-mono font-semibold shadow-lg transition-all cursor-pointer"
            >
              <TerminalIcon className="w-3.5 h-3.5 text-[#8245ec]" />
              <span className="hidden sm:inline">Terminal</span>
              <kbd className="hidden md:inline px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-gray-300 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/piyush7467"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 rounded-full bg-gray-950/80 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/25 transition-all shadow-md"
              title="GitHub Profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>

            {/* Resume CTA */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#8245ec] to-blue-600 hover:from-purple-600 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-purple-950/40 transition-all cursor-pointer"
            >
              <FaFileDownload className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-full bg-gray-950/80 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white shadow-lg transition-all cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <FiX className="w-5 h-5 text-purple-400" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Glass Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 top-20 z-50 rounded-3xl bg-gray-950/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl lg:hidden"
          >
            <div className="space-y-1.5">
              {MENU_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#8245ec]/25 to-blue-500/20 text-white border border-[#8245ec]/40 font-semibold"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Sparkles className="w-4 h-4 text-[#8245ec]" />}
                  </button>
                );
              })}

              <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    openTerminal();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold"
                >
                  <TerminalIcon className="w-4 h-4" />
                  <span>Terminal (⌘K)</span>
                </button>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#8245ec] to-blue-600 text-white text-xs font-bold"
                >
                  <FaFileDownload className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top Pill */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gray-950/85 backdrop-blur-xl border border-white/15 text-white shadow-2xl hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-4 h-4 text-purple-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
