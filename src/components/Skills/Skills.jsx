import React, { useState, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { SkillsInfo } from "../../constants";
import { 
  Cpu, 
  Code2, 
  Database, 
  Terminal, 
  Globe, 
  Layers,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Zap,
  ChevronLeft,
  ChevronDown,
  Menu
} from "lucide-react";

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categoryIcons = {
    'Frontend': <Globe className="w-4 h-4 md:w-6 md:h-6" />,
    'Backend': <Database className="w-4 h-4 md:w-6 md:h-6" />,
    'Languages': <Terminal className="w-4 h-4 md:w-6 md:h-6" />,
    'Tools': <Layers className="w-4 h-4 md:w-6 md:h-6" />
  };

  const categoryColors = {
    'Frontend': '#8245ec',
    'Backend': '#00b4d8',
    'Languages': '#06d6a0',
    'Tools': '#ff6b6b'
  };

  const skillLevels = {
    'HTML': 95, 'CSS': 90, 'JavaScript': 92, 'React JS': 94,
    'Redux': 85, 'Tailwind CSS': 93, 'Bootstrap': 88,
    'Node JS': 90, 'Express JS': 88, 'MySQL': 87, 'MongoDB': 85,
    'C': 82, 'C++': 85, 'Java': 88, 'JavaScript': 92, 'Kotlin': 80,
    'Git': 92, 'GitHub': 94, 'VS Code': 96, 'Postman': 88,
    'Compass': 85, 'Vercel': 87, 'Android Studio': 82, 'Figma': 84
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const handleScroll = (e, index) => {
    const container = e.currentTarget;
    const scrollPercentage = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
    setScrollPosition(scrollPercentage);
  };

  const handleMobileCategorySelect = (index) => {
    setActiveCategory(index);
    setShowMobileCategories(false);
    
    // Scroll to category on mobile
    setTimeout(() => {
      const element = document.getElementById(`category-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 font-sans overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Background Effects - Responsive */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-40 h-40 md:top-1/4 md:right-1/4 md:w-96 md:h-96 bg-purple-600/5 rounded-full blur-xl md:blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 md:bottom-1/4 md:left-1/4 md:w-96 md:h-96 bg-blue-600/5 rounded-full blur-xl md:blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: 'clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-2 md:px-5 md:py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#8245ec]" />
            <span className="text-xs md:text-sm font-medium text-gray-300">Technical Expertise</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
              Technical
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec]">
              Mastery
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8">
            <div className="hidden sm:block h-px w-8 md:w-20 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 sm:px-0">
              A deep dive into my technical arsenal—tools and technologies I've mastered through extensive practice
            </p>
            <div className="hidden sm:block h-px w-8 md:w-20 bg-gradient-to-l from-transparent via-[#8245ec] to-transparent"></div>
          </div>
        </motion.div>

        {/* Mobile Category Selector */}
        {isMobile && (
          <div className="mb-6 px-2">
            <button
              onClick={() => setShowMobileCategories(!showMobileCategories)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{
                  backgroundColor: `${categoryColors[SkillsInfo[activeCategory]?.title] || '#8245ec'}20`,
                }}>
                  <div style={{ color: categoryColors[SkillsInfo[activeCategory]?.title] || '#8245ec' }}>
                    {categoryIcons[SkillsInfo[activeCategory]?.title] || <Cpu className="w-5 h-5" />}
                  </div>
                </div>
                <span className="font-semibold text-white">
                  {SkillsInfo[activeCategory]?.title || 'Select Category'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* <Menu className="w-5 h-5 text-[#8245ec]" /> */}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showMobileCategories ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Mobile Categories Dropdown */}
            {showMobileCategories && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 rounded-xl bg-gray-900/95 backdrop-blur-xl border border-gray-700 overflow-hidden"
              >
                {SkillsInfo.map((category, index) => (
                  <button
                    key={category.title}
                    onClick={() => handleMobileCategorySelect(index)}
                    className={`w-full flex items-center justify-between px-4 py-3 border-b border-gray-800 last:border-b-0 ${
                      activeCategory === index
                        ? 'bg-gradient-to-r from-[#8245ec]/20 to-transparent'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{
                        backgroundColor: `${categoryColors[category.title] || '#8245ec'}20`,
                      }}>
                        <div style={{ color: categoryColors[category.title] || '#8245ec' }}>
                          {categoryIcons[category.title] || <Cpu className="w-5 h-5" />}
                        </div>
                      </div>
                      <span className={`font-medium ${activeCategory === index ? 'text-white' : 'text-gray-300'}`}>
                        {category.title}
                      </span>
                    </div>
                    {activeCategory === index && (
                      <ChevronRight className="w-4 h-4 text-[#8245ec]" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Desktop Category Tabs */}
        {!isMobile && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="hidden md:flex flex-wrap  justify-center items-center gap-3 lg:gap-6 mb-8 lg:mb-12 px-2"
          >
            {SkillsInfo.map((category, index) => (
              <motion.button
                key={category.title}
                variants={itemVariants}
                onClick={() => setActiveCategory(index)}
                className={`group relative px-4 py-3 lg:px-8 lg:py-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  activeCategory === index
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{
                  background: activeCategory === index 
                    ? `linear-gradient(135deg, ${categoryColors[category.title] || '#8245ec'}20, transparent)`
                    : 'transparent',
                  border: activeCategory === index 
                    ? `1px solid ${categoryColors[category.title] || '#8245ec'}40`
                    : '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {/* Category Icon */}
                <div className={`p-2 lg:p-3 rounded-lg transition-all duration-300 ${
                  activeCategory === index ? 'scale-110' : ''
                }`} style={{
                  backgroundColor: activeCategory === index 
                    ? `${categoryColors[category.title] || '#8245ec'}20`
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${activeCategory === index ? categoryColors[category.title] || '#8245ec' : 'transparent'}30`
                }}>
                  <div style={{ color: categoryColors[category.title] || '#8245ec' }}>
                    {categoryIcons[category.title] || <Cpu className="w-5 h-5 lg:w-6 lg:h-6" />}
                  </div>
                </div>

                {/* Category Info */}
                <div className="text-left">
                  <span className="font-semibold text-sm lg:text-lg">{category.title}</span>
                  <div className="text-xs lg:text-sm text-gray-500">
                    {category.skills.length} skills
                  </div>
                </div>

                {/* Active Indicator */}
                {activeCategory === index && (
                  <>
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    />
                    <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-[#8245ec]" />
                  </>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Skills Grid Container - Responsive */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-8 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-6  lg:gap-8"
        >
          {SkillsInfo.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              id={`category-${categoryIndex}`}
              variants={itemVariants}
              className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                isMobile || activeCategory === categoryIndex
                  ? 'border-[#8245ec]/50 bg-gradient-to-br from-gray-900/60 to-gray-900/40 shadow-lg md:shadow-2xl shadow-[#8245ec]/10'
                  : 'border-white/10 bg-gray-900/30'
              }`}
              style={{
                opacity: isMobile || activeCategory === categoryIndex ? 1 : 0.6,
                transform: (isMobile || activeCategory === categoryIndex) ? 'translateY(0)' : 'none',
                display: !isMobile && activeCategory !== categoryIndex ? 'none' : 'block'
              }}
            >
              {/* Category Header - Responsive */}
              <div className="p-4 md:p-6 border-b border-white/10 bg-gradient-to-r from-gray-900/50 to-transparent">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 rounded-xl" style={{
                      backgroundColor: `${categoryColors[category.title] || '#8245ec'}20`,
                      border: `1px solid ${categoryColors[category.title] || '#8245ec'}30`
                    }}>
                      <div style={{ color: categoryColors[category.title] || '#8245ec' }}>
                        {categoryIcons[category.title] || <Code2 className="w-5 h-5 md:w-6 md:h-6" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-white">{category.title}</h3>
                      <div className="flex items-center gap-2 md:gap-3 mt-1">
                        <div className="h-px w-8 md:w-12 bg-gradient-to-r from-[#8245ec] to-transparent"></div>
                        <span className="text-xs md:text-sm text-gray-400">
                          {category.skills.length} technologies
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#8245ec]" />
                    <span className="text-xs md:text-sm font-semibold text-[#8245ec]">
                      {Math.max(...category.skills.map(s => skillLevels[s.name] || 85))}% mastery
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollable Skills Container - Responsive */}
              <div 
                className="p-4 md:p-6 max-h-64 sm:max-h-72 md:max-h-80 lg:max-h-96 overflow-y-auto custom-scrollbar"
                onScroll={(e) => handleScroll(e, categoryIndex)}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${categoryColors[category.title] || '#8245ec'} transparent`
                }}
              >
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
                  {category.skills.map((skill, skillIndex) => {
                    const proficiency = skillLevels[skill.name] || 85;
                    return (
                      <motion.div
                        key={skill.name}
                        className="group relative"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.01 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: skillIndex * 0.03 }}
                      >
                        <div className={`relative p-3 md:p-4 rounded-xl border backdrop-blur-sm transition-all duration-200 ${
                          hoveredSkill === skill.name
                            ? 'border-[#8245ec]/50 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md md:shadow-lg shadow-[#8245ec]/10'
                            : 'border-white/10 bg-gray-800/30'
                        }`}>
                          {/* Skill Content - Responsive */}
                          <div className="flex items-center gap-3 md:gap-4">
                            {/* Skill Icon */}
                            <div className={`flex-shrink-0 p-2 md:p-3 rounded-lg transition-all duration-200 ${
                              hoveredSkill === skill.name ? 'scale-105' : ''
                            }`} style={{
                              backgroundColor: hoveredSkill === skill.name 
                                ? `${categoryColors[category.title] || '#8245ec'}20`
                                : 'rgba(255,255,255,0.05)'
                            }}>
                              <img
                                src={skill.logo}
                                alt={`${skill.name} logo`}
                                className="w-6 h-6 md:w-8 md:h-8 object-contain"
                              />
                            </div>
                            
                            {/* Skill Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1 md:mb-2">
                                <span className={`font-semibold text-sm md:text-base truncate transition-colors duration-200 ${
                                  hoveredSkill === skill.name ? 'text-white' : 'text-gray-300'
                                }`}>
                                  {skill.name}
                                </span>
                                {hoveredSkill === skill.name && (
                                  <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-[#8245ec]" />
                                )}
                              </div>
                              
                              {/* Proficiency Bar - Responsive */}
                              <div className="space-y-1 md:space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Proficiency</span>
                                  <span className="font-semibold text-[#8245ec]">{proficiency}%</span>
                                </div>
                                <div className="h-1.5 md:h-2 bg-gray-800 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{ 
                                      background: `linear-gradient(90deg, ${categoryColors[category.title] || '#8245ec'}, ${categoryColors[category.title] || '#8245ec'}80)`
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${proficiency}%` }}
                                    transition={{ duration: 0.8, delay: skillIndex * 0.05 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Hover Glow Effect */}
                          {hoveredSkill === skill.name && (
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8245ec]/10 to-transparent"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Scroll Indicator - Responsive */}
              <div className="p-3 md:p-4 border-t border-white/10 bg-gradient-to-r from-gray-900/50 to-transparent">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 text-xs md:text-sm text-gray-500">
                  <span>Scroll to explore all skills</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 sm:w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#8245ec] to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${scrollPosition}%` }}
                      />
                    </div>
                    <span className="w-8 text-right">{Math.round(scrollPosition)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-12 lg:mt-16"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#8245ec]/20 to-purple-500/20">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#8245ec]" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-white">Core Expertise</h4>
              </div>
              <p className="text-gray-400 text-xs md:text-sm">
                Specialized in MERN stack with deep understanding of modern web architecture and scalable solutions.
              </p>
            </div>
            
            <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-white">Continuous Learning</h4>
              </div>
              <p className="text-gray-400 text-xs md:text-sm">
                Actively exploring: <span className="text-[#8245ec]">Next.js, TypeScript, GraphQL</span>
              </p>
            </div>
            
            <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-white/10 backdrop-blur-sm col-span-full sm:col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-white">Problem Solving</h4>
              </div>
              <p className="text-gray-400 text-xs md:text-sm">
                Strong foundation in algorithms, data structures, and system design principles.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mobile Navigation Arrows */}
        {isMobile && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => {
                const prevIndex = activeCategory > 0 ? activeCategory - 1 : SkillsInfo.length - 1;
                handleMobileCategorySelect(prevIndex);
              }}
              className="p-3 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700"
            >
              <ChevronLeft className="w-5 h-5 text-[#8245ec]" />
            </button>
            <div className="flex items-center gap-2">
              {SkillsInfo.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleMobileCategorySelect(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCategory === index 
                      ? 'w-8 bg-gradient-to-r from-[#8245ec] to-blue-500' 
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => {
                const nextIndex = activeCategory < SkillsInfo.length - 1 ? activeCategory + 1 : 0;
                handleMobileCategorySelect(nextIndex);
              }}
              className="p-3 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700"
            >
              <ChevronRight className="w-5 h-5 text-[#8245ec]" />
            </button>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8245ec, #a855f7);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a855f7, #c084fc);
        }
        
        /* Extra small devices */
        @media (min-width: 475px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;





// // src/components/Skills/Skills.jsx
// import React from "react";
// import { SkillsInfo } from "../../constants";
// import Tilt from "react-parallax-tilt";

// const Skills = () => (
//   <section
//     id="skills"
//     className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient clip-path-custom"
//   >
//     {/* Section Title */}
//     <div className="text-center mb-8">
//       <h2 className="text-3xl sm:text-4xl font-bold text-white">SKILLS</h2>
//       <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-2"></div>
//       <p className="text-gray-400 mt-4 text-lg font-semibold">
//         A collection of my technical skills and expertise honed through various
//         projects and experiences
//       </p>
//     </div>

//     {/* Skill Categories */}
//     <div className="flex flex-wrap gap-1 lg:gap-5 py-10 justify-between">
//       {SkillsInfo.map((category) => (
//         <div
//           key={category.title}
//           className="bg-gray-900 backdrop-blur-md px-6 sm:px-10 py-8 mb-10 w-full sm:w-[48%] rounded-2xl border border-white 
//           shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]"
//         >
//           <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
//             {category.title}
//           </h3>

//           {/* Skill Items */}
//           <Tilt
//             tiltMaxAngleX={20}
//             tiltMaxAngleY={20}
//             perspective={1000}
//             scale={1.05}
//             transitionSpeed={1000}
//             gyroscope={true}
//           >
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
//               {category.skills.map((skill) => (
//                 <div
//                   key={skill.name}
//                   className="flex items-center justify-center space-x-2 bg-transparent border-2 border-gray-700 rounded-3xl py-2 px-2 text-center"
//                 >
//                   <img
//                     src={skill.logo}
//                     alt={`${skill.name} logo`}
//                     className="w-6 h-6 sm:w-8 sm:h-8"
//                   />
//                   <span className="text-xs sm:text-sm text-gray-300">
//                     {skill.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </Tilt>
//         </div>
//       ))}
//     </div>
//   </section>
// );

// export default Skills;
