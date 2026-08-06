import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, ExternalLink, Github, Mail, Phone, Linkedin, Award, Briefcase, Cpu, Palette, Activity } from "lucide-react";
import { projects, SkillsInfo, experiences, certificates } from "../../constants";

const THEMES = {
  dark: {
    name: "Dark Purple (Default)",
    bg: "bg-gray-950/98 border-purple-500/30",
    headerBg: "bg-gray-900/90 border-gray-800",
    promptColor: "text-purple-400",
    systemColor: "text-green-400",
    accentColor: "text-[#8245ec]",
    badgeBg: "bg-purple-950/80 text-purple-300 border-purple-800/60",
    linkBtn: "bg-gradient-to-r from-[#8245ec] to-blue-600 text-white"
  },
  matrix: {
    name: "Matrix Green",
    bg: "bg-black/98 border-green-500/40",
    headerBg: "bg-green-950/40 border-green-900/60",
    promptColor: "text-green-400",
    systemColor: "text-emerald-400",
    accentColor: "text-green-400",
    badgeBg: "bg-green-950/80 text-green-300 border-green-800/60",
    linkBtn: "bg-gradient-to-r from-green-600 to-emerald-600 text-black font-bold"
  },
  cyber: {
    name: "Cyberpunk Neon",
    bg: "bg-slate-950/98 border-cyan-500/40",
    headerBg: "bg-slate-900/90 border-cyan-900/60",
    promptColor: "text-pink-400",
    systemColor: "text-cyan-300",
    accentColor: "text-cyan-400",
    badgeBg: "bg-pink-950/80 text-pink-300 border-pink-800/60",
    linkBtn: "bg-gradient-to-r from-pink-600 to-cyan-500 text-white font-bold"
  },
  dracula: {
    name: "Dracula Purple",
    bg: "bg-[#282a36]/98 border-[#bd93f9]/40",
    headerBg: "bg-[#21222c] border-[#44475a]",
    promptColor: "text-[#ff79c6]",
    systemColor: "text-[#50fa7b]",
    accentColor: "text-[#bd93f9]",
    badgeBg: "bg-[#44475a] text-[#bd93f9] border-[#bd93f9]/50",
    linkBtn: "bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] text-gray-900 font-bold"
  }
};

const COMMAND_LIST = [
  "help", "about", "skills", "projects", "frontend", "fullstack", "android",
  "certificates", "experience", "contact", "hire", "resume", "stats", "theme",
  "clear", "matrix", "sudo"
];

const TerminalModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [themeKey, setThemeKey] = useState("dark");
  const [history, setHistory] = useState([
    {
      type: "system",
      render: () => (
        <div className="font-mono text-xs sm:text-sm leading-relaxed space-y-1">
          <div className="text-purple-300 font-bold">🚀 Piyush Shakya's Advanced Developer CLI v2.1.0</div>
          <div className="text-gray-400">
            Type <span className="text-yellow-400 font-bold">help</span>, <span className="text-cyan-400 font-bold">projects</span>, <span className="text-cyan-400 font-bold">android</span>, <span className="text-cyan-400 font-bold">fullstack</span>, <span className="text-cyan-400 font-bold">stats</span>, or <span className="text-cyan-400 font-bold">contact</span>.
          </div>
          <div className="text-gray-500 text-xs">
            Tip: Press <kbd className="px-1 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-300">Tab</kbd> to auto-complete, <kbd className="px-1 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-300">↑ / ↓</kbd> for history, or <kbd className="px-1 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-300">Esc</kbd> to exit.
          </div>
        </div>
      )
    }
  ]);

  // Command execution history for Up/Down arrow navigation
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const currentTheme = THEMES[themeKey] || THEMES.dark;

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const getProjectCategory = (project) => {
    const tags = project.tags || [];
    if (tags.includes("Kotlin") || tags.includes("Android") || tags.includes("Jetpack Compose")) {
      return "Android App";
    }
    if (
      tags.includes("MongoDB") ||
      tags.includes("Node.js") ||
      tags.includes("Express.js") ||
      tags.includes("Express") ||
      tags.includes("JWT")
    ) {
      return "Full Stack";
    }
    return "Frontend";
  };

  const parseSmartCommand = (rawStr) => {
    const clean = rawStr.trim().toLowerCase();
    if (!clean) return { cmd: "", args: "" };

    // Clear aliases
    if (["clr", "cls", "clear", "clean", "reset"].includes(clean)) return { cmd: "clear", args: "" };
    
    // About aliases
    if (["about", "bio", "whoami", "piyush", "profile", "info", "degree"].includes(clean)) return { cmd: "about", args: "" };
    
    // Skills aliases
    if (["skills", "skill", "stack", "tech", "techstack", "languages", "tools"].includes(clean)) return { cmd: "skills", args: "" };
    
    // Contact aliases
    if (["contact", "email", "phone", "linkedin", "github", "social", "reach", "call"].includes(clean)) return { cmd: "contact", args: "" };
    
    // Resume aliases
    if (["resume", "cv", "download"].includes(clean)) return { cmd: "resume", args: "" };
    
    // Hire aliases
    if (["hire", "internship", "job", "available", "work"].includes(clean)) return { cmd: "hire", args: "" };

    // Experience aliases
    if (["experience", "exp", "history", "career", "jobs"].includes(clean)) return { cmd: "experience", args: "" };

    // Certificates aliases
    if (["certificates", "certificate", "certs", "cert", "awards"].includes(clean)) return { cmd: "certificates", args: "" };

    // Stats aliases
    if (["stats", "sysinfo", "telemetry", "status", "uptime"].includes(clean)) return { cmd: "stats", args: "" };

    // Direct Project Category / Tech Query shortcuts
    if (["frontend", "frontend project", "frontend projects", "front end"].includes(clean)) {
      return { cmd: "projects", args: "frontend" };
    }
    if (["fullstack", "full stack", "fullstack project", "fullstack projects", "backend", "mern"].includes(clean)) {
      return { cmd: "projects", args: "full stack" };
    }
    if (["android", "android project", "android projects", "mobile", "mobile app", "app", "kotlin"].includes(clean)) {
      return { cmd: "projects", args: "android" };
    }

    const parts = clean.split(/\s+/);
    const mainWord = parts[0];
    const args = parts.slice(1).join(" ");

    if (mainWord === "project" || mainWord === "projects") {
      return { cmd: "projects", args };
    }

    if (mainWord === "theme" || mainWord === "themes") {
      return { cmd: "theme", args };
    }

    // Known Tech Keyword Shortcuts
    const knownTechs = ["react", "node", "express", "mongo", "html", "css", "js", "javascript", "tailwind", "bootstrap", "kotlin", "jwt", "api", "php", "mysql", "c++", "cpp", "java", "c"];
    if (knownTechs.includes(mainWord) || knownTechs.includes(clean)) {
      return { cmd: "projects", args: clean };
    }

    return { cmd: mainWord, args };
  };

  const handleCommand = (cmdStr) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    // Record in history for Up/Down arrow navigation
    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const { cmd, args } = parseSmartCommand(rawCmd);

    const userEntry = {
      type: "user",
      render: () => <span className={`${currentTheme.promptColor} font-semibold`}>$ {rawCmd}</span>
    };

    let responseEntry = null;

    switch (cmd) {
      case "help":
        responseEntry = {
          type: "system",
          render: () => (
            <div className="text-gray-300 space-y-1.5 font-mono text-xs sm:text-sm">
              <div className="text-purple-300 font-bold mb-1">Advanced Terminal Commands & Shortcuts:</div>
              <div>• <span className="text-yellow-400">help</span>                      : Display available commands</div>
              <div>• <span className="text-yellow-400">about / bio / whoami</span>        : Learn about Piyush Shakya</div>
              <div>• <span className="text-yellow-400">skills / tech / stack</span>       : View technical skills breakdown</div>
              <div>• <span className="text-yellow-400">projects [tag]</span>             : View/search projects (<span className="text-cyan-400">android</span>, <span className="text-cyan-400">fullstack</span>, <span className="text-cyan-400">frontend</span>)</div>
              <div>• <span className="text-yellow-400">certificates / certs</span>       : View verified professional certificates</div>
              <div>• <span className="text-yellow-400">experience / exp</span>           : View career timeline & roles</div>
              <div>• <span className="text-yellow-400">contact / email / phone</span>     : Interactive contact details & links</div>
              <div>• <span className="text-yellow-400">stats / sysinfo</span>            : View portfolio live telemetry stats</div>
              <div>• <span className="text-yellow-400">theme [dark|matrix|cyber|dracula]</span>: Change CLI color theme</div>
              <div>• <span className="text-yellow-400">resume / cv</span>                : Open official Google Drive resume</div>
              <div>• <span className="text-yellow-400">hire / job</span>                  : Check availability for developer roles</div>
              <div>• <span className="text-yellow-400">clear / clr / cls</span>           : Clear screen</div>
              <div>• <span className="text-yellow-400">matrix / sudo</span>               : Developer easter eggs</div>
            </div>
          )
        };
        break;

      case "about":
        responseEntry = {
          type: "system",
          render: () => (
            <div className="text-gray-300 space-y-1 font-mono text-xs sm:text-sm bg-gray-900/60 p-3 sm:p-3.5 rounded-lg border border-gray-800">
              <div><span className="text-purple-400 font-bold">NAME     :</span> Piyush Shakya</div>
              <div><span className="text-purple-400 font-bold">ROLE     :</span> Full Stack MERN Developer & Native Android Engineer</div>
              <div><span className="text-purple-400 font-bold">DEGREE   :</span> B.Tech Computer Science (LPU, 2023 - 2027)</div>
              <div><span className="text-purple-400 font-bold">LOCATION :</span> Jalandhar, Punjab, India</div>
              <div className="pt-1 text-gray-400 text-xs leading-relaxed">
                <span className="text-purple-400 font-bold">SUMMARY  :</span> Architecting high-performance web applications and Android apps with AI integrations (Gemini API), MVVM architecture, and RESTful microservices.
              </div>
            </div>
          )
        };
        break;

      case "skills":
        responseEntry = {
          type: "system",
          render: () => (
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="text-purple-300 font-bold flex items-center justify-between">
                <span>SKILLSET SUMMARY:</span>
                <span className="text-xs text-gray-400">25+ Core Technologies</span>
              </div>
              {SkillsInfo.map((cat, i) => (
                <div key={i} className="bg-gray-900/50 p-2.5 sm:p-3 rounded-lg border border-gray-800">
                  <div className="text-cyan-400 font-bold mb-1.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                    <span>[ {cat.title} ]</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {cat.skills.map((s, si) => (
                      <span key={si} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-gray-800/90 text-gray-200 text-[11px] sm:text-xs border border-gray-700/70 font-sans">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        };
        break;

      case "projects":
        let query = args.toLowerCase();
        let filtered = projects;

        if (query) {
          filtered = projects.filter((p) => {
            const cat = getProjectCategory(p).toLowerCase();
            const titleMatch = p.title.toLowerCase().includes(query);
            const tagMatch = p.tags.some((t) => t.toLowerCase().includes(query));
            const catMatch = cat.includes(query) || (query.includes("full") && cat === "full stack") || (query.includes("android") && cat === "android app") || (query.includes("front") && cat === "frontend");
            return titleMatch || tagMatch || catMatch;
          });
        }

        responseEntry = {
          type: "system",
          render: () => (
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="text-purple-300 font-bold flex items-center justify-between">
                <span>PROJECTS {query ? `("${query}")` : "(ALL)"}:</span>
                <span className="text-xs text-gray-400">{filtered.length} found</span>
              </div>

              {filtered.length === 0 ? (
                <div className="text-red-400 p-3 bg-red-950/20 rounded border border-red-900/50 space-y-1">
                  <div>No projects matching "{query}".</div>
                  <div className="text-xs text-gray-300">
                    Try shortcuts:{" "}
                    <span className="text-cyan-400 underline cursor-pointer" onClick={() => handleCommand("frontend")}>frontend</span>,{" "}
                    <span className="text-cyan-400 underline cursor-pointer" onClick={() => handleCommand("fullstack")}>fullstack</span>, or{" "}
                    <span className="text-cyan-400 underline cursor-pointer" onClick={() => handleCommand("android")}>android</span>.
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((p, idx) => {
                    const category = getProjectCategory(p);
                    return (
                      <div key={p.id || idx} className="bg-gray-900/70 p-3 sm:p-3.5 rounded-lg border border-purple-500/20 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-white font-bold text-xs sm:text-sm md:text-base">
                            [{idx + 1}] {p.title}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-sans ${currentTheme.badgeBg}`}>
                            {category}
                          </span>
                        </div>

                        <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{p.description}</p>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {p.tags.slice(0, 5).map((t, ti) => (
                            <span key={ti} className="px-1.5 py-0.5 text-[10px] sm:text-[11px] rounded bg-gray-800 text-gray-300">
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Redirect Links - Mobile Responsive Flex Column */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-gray-800/80 text-xs">
                          {p.webapp && (
                            <a
                              href={p.webapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded ${currentTheme.linkBtn} transition-all cursor-pointer text-xs font-semibold`}
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Application ↗</span>
                            </a>
                          )}
                          {p.github ? (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold border border-gray-700 transition-all cursor-pointer text-xs"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>Source Code ↗</span>
                            </a>
                          ) : (
                            <span className="text-gray-500 text-xs text-center py-1">Private Repo</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )
        };
        break;

      case "certificates":
        responseEntry = {
          type: "system",
          render: () => (
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="text-purple-300 font-bold flex items-center justify-between">
                <span>VERIFIED CERTIFICATIONS ({certificates.length}):</span>
                <span className="text-xs text-gray-400 hidden sm:inline">Click to view credential</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-gray-900/60 p-2.5 sm:p-3 rounded-lg border border-gray-800 space-y-1.5">
                    <div className="text-white font-bold text-xs sm:text-sm flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span>{cert.title}</span>
                    </div>
                    <div className="text-xs text-gray-400">{cert.issuer} • {cert.date}</div>
                    {cert.certificateLink && (
                      <a
                        href={cert.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 underline pt-0.5"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Verify Certificate ↗</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        };
        break;

      case "experience":
        responseEntry = {
          type: "system",
          render: () => (
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="text-purple-300 font-bold">CAREER & DEVELOPMENT TIMELINE:</div>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-gray-900/60 p-3 sm:p-3.5 rounded-lg border border-gray-800 space-y-1.5">
                    <div className="flex items-center justify-between flex-wrap gap-1 sm:gap-2">
                      <span className="text-white font-bold text-xs sm:text-sm flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                        {exp.role} @ {exp.company}
                      </span>
                      <span className="text-[11px] sm:text-xs text-purple-300 font-sans">{exp.date}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{exp.desc}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {exp.skills.map((sk, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 text-[10px] sm:text-[11px] rounded bg-gray-800 text-gray-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        };
        break;

      case "stats":
        responseEntry = {
          type: "system",
          render: () => (
            <div className="bg-gray-900/70 p-3 sm:p-4 rounded-lg border border-purple-500/30 space-y-3 font-mono text-xs sm:text-sm">
              <div className="text-purple-300 font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400 animate-pulse flex-shrink-0" />
                <span>PORTFOLIO TELEMETRY & STATS:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center pt-1">
                <div className="p-2 sm:p-2.5 rounded bg-gray-800/60 border border-gray-700/50">
                  <div className="text-lg sm:text-xl font-bold text-white">6+</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-400">Live Projects</div>
                </div>
                <div className="p-2 sm:p-2.5 rounded bg-gray-800/60 border border-gray-700/50">
                  <div className="text-lg sm:text-xl font-bold text-purple-400">25+</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-400">Technologies</div>
                </div>
                <div className="p-2 sm:p-2.5 rounded bg-gray-800/60 border border-gray-700/50">
                  <div className="text-lg sm:text-xl font-bold text-cyan-400">6</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-400">Certifications</div>
                </div>
                <div className="p-2 sm:p-2.5 rounded bg-gray-800/60 border border-gray-700/50">
                  <div className="text-lg sm:text-xl font-bold text-green-400">100%</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-400">Availability</div>
                </div>
              </div>
            </div>
          )
        };
        break;

      case "theme":
        const availableThemes = Object.keys(THEMES);
        const targetTheme = args.trim().toLowerCase();

        if (availableThemes.includes(targetTheme)) {
          setThemeKey(targetTheme);
          responseEntry = {
            type: "system",
            render: () => (
              <div className="text-green-400 font-mono text-xs sm:text-sm">
                🎨 Theme switched to <span className="font-bold uppercase">{targetTheme}</span> mode!
              </div>
            )
          };
        } else {
          responseEntry = {
            type: "system",
            render: () => (
              <div className="text-gray-300 font-mono text-xs sm:text-sm space-y-2">
                <div className="text-purple-300 font-bold">AVAILABLE CLI COLOR THEMES:</div>
                <div className="flex flex-wrap gap-1.5">
                  {availableThemes.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleCommand(`theme ${t}`)}
                      className={`px-2.5 py-1 rounded text-xs border font-bold cursor-pointer transition-all ${
                        themeKey === t ? "bg-purple-600 text-white border-purple-400" : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                      }`}
                    >
                      {t} {t === themeKey ? "(Active)" : ""}
                    </button>
                  ))}
                </div>
              </div>
            )
          };
        }
        break;

      case "contact":
        responseEntry = {
          type: "system",
          render: () => (
            <div className="space-y-3 font-mono text-xs sm:text-sm bg-gray-900/60 p-3 sm:p-4 rounded-lg border border-gray-800">
              <div className="text-purple-300 font-bold mb-2">CONTACT DETAILS (CLICK TO OPEN):</div>
              <div className="space-y-2">
                <a
                  href="mailto:piyushshakya7467@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 underline break-all"
                >
                  <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Email: piyushshakya7467@gmail.com ↗</span>
                </a>
                <a
                  href="tel:+916398667467"
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 underline"
                >
                  <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Phone: +91 6398667467 ↗</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/piyush7467"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 underline break-all"
                >
                  <Linkedin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>LinkedIn: linkedin.com/in/piyush7467 ↗</span>
                </a>
                <a
                  href="https://github.com/piyush7467"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 underline break-all"
                >
                  <Github className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  <span>GitHub: github.com/piyush7467 ↗</span>
                </a>
              </div>
            </div>
          )
        };
        break;

      case "resume":
        window.open("https://drive.google.com/file/d/1mf0JDbuaqyRqfu5-spnWs4cr2GW1OLRw/view?usp=drive_link", "_blank");
        responseEntry = {
          type: "system",
          render: () => (
            <div className="text-green-400 font-mono text-xs sm:text-sm space-y-1">
              <div>🚀 Opening official resume in a new tab...</div>
              <div>
                If blocked:{" "}
                <a
                  href="https://drive.google.com/file/d/1mf0JDbuaqyRqfu5-spnWs4cr2GW1OLRw/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline font-bold"
                >
                  Open Resume Link ↗
                </a>
              </div>
            </div>
          )
        };
        break;

      case "hire":
        responseEntry = {
          type: "system",
          render: () => (
            <div className="bg-gradient-to-r from-purple-950/60 to-blue-950/60 p-3 sm:p-4 rounded-lg border border-purple-500/40 space-y-2 font-mono text-xs sm:text-sm">
              <div className="text-green-400 font-bold text-xs sm:text-sm">⚡ AVAILABILITY STATUS: AVAILABLE FOR HIRE</div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Piyush Shakya is actively open for Full Stack MERN & Native Android Developer opportunities, internships, and freelance projects.
              </p>
              <a
                href="mailto:piyushshakya7467@gmail.com?subject=Hiring%20Inquiry%20-%20Piyush%20Shakya"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg ${currentTheme.linkBtn} text-xs shadow-lg transition-all`}
              >
                <Mail className="w-4 h-4" />
                <span>Send Direct Email to Hire ↗</span>
              </a>
            </div>
          )
        };
        break;

      case "sudo":
        responseEntry = {
          type: "system",
          render: () => (
            <div className="text-yellow-400 font-mono font-bold text-xs sm:text-sm">
              Permission granted! Access code 200 OK. You are authorized to hire Piyush! 🎉
            </div>
          )
        };
        break;

      case "matrix":
        responseEntry = {
          type: "system",
          render: () => (
            <div className="text-green-400 font-mono text-xs sm:text-sm leading-relaxed">
              Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇<br />
              Building high-performance web & mobile architectures with React, Node.js & Kotlin.
            </div>
          )
        };
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        // Try fallback search across projects for any unrecognized command string!
        const fallbackQuery = rawCmd.toLowerCase();
        const fallbackProjects = projects.filter((p) => {
          const cat = getProjectCategory(p).toLowerCase();
          const titleMatch = p.title.toLowerCase().includes(fallbackQuery);
          const tagMatch = p.tags.some((t) => t.toLowerCase().includes(fallbackQuery));
          return titleMatch || tagMatch || cat.includes(fallbackQuery);
        });

        if (fallbackProjects.length > 0) {
          handleCommand(`projects ${rawCmd}`);
          return;
        }

        responseEntry = {
          type: "error",
          render: () => (
            <div className="text-red-400 font-mono text-xs sm:text-sm space-y-1">
              <div>Command not recognized: '<span className="underline">{rawCmd}</span>'.</div>
              <div className="text-xs text-gray-300">
                Try: <span className="text-cyan-400 underline cursor-pointer" onClick={() => handleCommand("help")}>help</span>,{" "}
                <span className="text-cyan-400 underline cursor-pointer" onClick={() => handleCommand("frontend")}>frontend</span>,{" "}
                <span className="text-cyan-400 underline cursor-pointer" onClick={() => handleCommand("fullstack")}>fullstack</span>,{" "}
                <span className="text-cyan-400 underline cursor-pointer" onClick={() => handleCommand("android")}>android</span>, or{" "}
                <span className="text-cyan-400 underline cursor-pointer" onClick={() => handleCommand("clr")}>clr</span>.
              </div>
            </div>
          )
        };
        break;
    }

    setHistory((prev) => [...prev, userEntry, responseEntry]);
    setInputVal("");
  };

  // Keyboard navigation for history (Up/Down) & Tab auto-complete
  const handleKeyDownInput = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (current) {
        const match = COMMAND_LIST.find((c) => c.startsWith(current));
        if (match) {
          setInputVal(match);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <>
      {/* Floating Toggle Button (Bottom-Left - Fully Mobile Optimized) */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-purple-500/40 text-purple-300 shadow-xl shadow-purple-950/40 hover:border-purple-400 backdrop-blur-md cursor-pointer group"
        title="Open Interactive Terminal (Ctrl+K)"
      >
        <TerminalIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8245ec] group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-xs font-mono font-semibold tracking-wide">Terminal</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-800 rounded border border-gray-700">
          Ctrl+K
        </kbd>
      </motion.button>

      {/* Terminal Modal Overlay - Responsive Height & Padding */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${
                isMaximized ? "max-w-7xl h-[94vh]" : "max-w-3xl h-[85vh] sm:h-[580px] max-h-[90vh]"
              } ${currentTheme.bg} rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs sm:text-sm transition-colors duration-300`}
            >
              {/* Terminal Title Bar */}
              <div className={`flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 ${currentTheme.headerBg} select-none`}>
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex-shrink-0"
                    title="Close (Esc)"
                  />
                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex-shrink-0"
                    title="Resize"
                  />
                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors flex-shrink-0"
                    title="Maximize"
                  />
                  <span className="ml-1 sm:ml-2 text-xs text-gray-400 font-sans flex items-center gap-1 truncate">
                    <TerminalIcon className={`w-3.5 h-3.5 ${currentTheme.promptColor} flex-shrink-0`} />
                    <span className="truncate">piyush@dev-portfolio: ~</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  {/* Theme Switcher Quick Menu */}
                  <div className="hidden md:flex items-center gap-1 text-[11px]">
                    <Palette className="w-3 h-3 text-gray-400" />
                    {Object.keys(THEMES).map((t) => (
                      <button
                        key={t}
                        onClick={() => setThemeKey(t)}
                        className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold cursor-pointer transition-colors ${
                          themeKey === t ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/5 transition-colors hidden sm:block"
                  >
                    {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Terminal Body Log */}
              <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 scrollbar-hide text-gray-300 font-mono text-xs sm:text-sm">
                {history.map((item, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {item.render ? item.render() : item.content}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Quick Command Suggestions Pill */}
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900/60 border-t border-gray-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                <span className="text-[10px] sm:text-[11px] text-gray-500 mr-1 flex-shrink-0">Try:</span>
                {[
                  "help",
                  "about",
                  "skills",
                  "projects",
                  "frontend",
                  "fullstack",
                  "android",
                  "certificates",
                  "experience",
                  "contact",
                  "stats",
                  "hire",
                  "resume",
                  "clr"
                ].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-[11px] bg-gray-800/80 hover:bg-[#8245ec]/25 text-purple-300 hover:text-white border border-gray-700/60 transition-all flex-shrink-0 cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Terminal Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-900/90 border-t border-gray-800">
                <span className={`${currentTheme.promptColor} font-semibold mr-1.5 sm:mr-2 select-none`}>
                  <span className="hidden sm:inline">piyush@portfolio:~$</span>
                  <span className="sm:hidden">$</span>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDownInput}
                  placeholder="Type command or press Tab..."
                  className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm min-w-0"
                />
                <button type="submit" className={`p-1 rounded ${currentTheme.promptColor} hover:text-white transition-colors flex-shrink-0`}>
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalModal;
