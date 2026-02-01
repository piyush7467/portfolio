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
  Zap
} from "lucide-react";

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const categoryIcons = {
    'Frontend': <Globe className="w-6 h-6" />,
    'Backend': <Database className="w-6 h-6" />,
    'Languages': <Terminal className="w-6 h-6" />,
    'Tools': <Layers className="w-6 h-6" />
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
        staggerChildren: 0.1,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const handleScroll = (e, index) => {
    const container = e.currentTarget;
    const scrollPercentage = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
    setScrollPosition(scrollPercentage);
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 px-4 md:px-8 lg:px-16 xl:px-32 font-sans overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <Sparkles className="w-5 h-5 text-[#8245ec]" />
            <span className="text-sm font-medium text-gray-300">Technical Expertise</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
              Technical
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec]">
              Mastery
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A deep dive into my technical arsenal—tools and technologies I've mastered through extensive practice
            </p>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-[#8245ec] to-transparent"></div>
          </div>
        </motion.div>

        {/* Category Tabs with Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {SkillsInfo.map((category, index) => (
            <motion.button
              key={category.title}
              variants={itemVariants}
              onClick={() => setActiveCategory(index)}
              className={`group relative px-8 py-4 rounded-xl flex items-center gap-4 transition-all duration-500 ${
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
              <div className={`p-3 rounded-lg transition-all duration-500 ${
                activeCategory === index ? 'scale-110' : ''
              }`} style={{
                backgroundColor: activeCategory === index 
                  ? `${categoryColors[category.title] || '#8245ec'}20`
                  : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeCategory === index ? categoryColors[category.title] || '#8245ec' : 'transparent'}30`
              }}>
                <div style={{ color: categoryColors[category.title] || '#8245ec' }}>
                  {categoryIcons[category.title] || <Cpu className="w-6 h-6" />}
                </div>
              </div>

              {/* Category Info */}
              <div className="text-left">
                <span className="font-semibold text-lg">{category.title}</span>
                <div className="text-sm text-gray-500">
                  {category.skills.length} skills mastered
                </div>
              </div>

              {/* Active Indicator */}
              {activeCategory === index && (
                <>
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  />
                  <ChevronRight className="w-5 h-5 text-[#8245ec]" />
                </>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-8"
        >
          {SkillsInfo.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${
                activeCategory === categoryIndex
                  ? 'border-[#8245ec]/50 bg-gradient-to-br from-gray-900/60 to-gray-900/40 shadow-2xl shadow-[#8245ec]/20'
                  : 'border-white/10 bg-gray-900/30 hover:border-[#8245ec]/30'
              }`}
              style={{
                opacity: activeCategory === categoryIndex ? 1 : 0.7,
                transform: activeCategory === categoryIndex ? 'translateY(-4px)' : 'none'
              }}
            >
              {/* Category Header */}
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-gray-900/50 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{
                      backgroundColor: `${categoryColors[category.title] || '#8245ec'}20`,
                      border: `1px solid ${categoryColors[category.title] || '#8245ec'}30`
                    }}>
                      <div style={{ color: categoryColors[category.title] || '#8245ec' }}>
                        {categoryIcons[category.title] || <Code2 className="w-6 h-6" />}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{category.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="h-px w-12 bg-gradient-to-r from-[#8245ec] to-transparent"></div>
                        <span className="text-sm text-gray-400">
                          {category.skills.length} technologies
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#8245ec]" />
                    <span className="text-sm font-semibold text-[#8245ec]">
                      {Math.max(...category.skills.map(s => skillLevels[s.name] || 85))}% mastery
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollable Skills Container */}
              <div 
                className="p-6 max-h-96 overflow-y-auto custom-scrollbar"
                onScroll={(e) => handleScroll(e, categoryIndex)}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${categoryColors[category.title] || '#8245ec'} transparent`
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => {
                    const proficiency = skillLevels[skill.name] || 85;
                    return (
                      <motion.div
                        key={skill.name}
                        className="group relative"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: skillIndex * 0.05 }}
                      >
                        <div className={`relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                          hoveredSkill === skill.name
                            ? 'border-[#8245ec]/50 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-[#8245ec]/20'
                            : 'border-white/10 bg-gray-800/30'
                        }`}>
                          {/* Skill Content */}
                          <div className="flex items-center gap-4">
                            {/* Skill Icon */}
                            <div className={`p-3 rounded-lg transition-all duration-300 ${
                              hoveredSkill === skill.name ? 'scale-110' : ''
                            }`} style={{
                              backgroundColor: hoveredSkill === skill.name 
                                ? `${categoryColors[category.title] || '#8245ec'}20`
                                : 'rgba(255,255,255,0.05)'
                            }}>
                              <img
                                src={skill.logo}
                                alt={`${skill.name} logo`}
                                className="w-8 h-8 object-contain"
                              />
                            </div>
                            
                            {/* Skill Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <span className={`font-semibold truncate transition-colors duration-300 ${
                                  hoveredSkill === skill.name ? 'text-white' : 'text-gray-300'
                                }`}>
                                  {skill.name}
                                </span>
                                {hoveredSkill === skill.name && (
                                  <ArrowUpRight className="w-4 h-4 text-[#8245ec]" />
                                )}
                              </div>
                              
                              {/* Proficiency Bar */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Proficiency</span>
                                  <span className="font-semibold text-[#8245ec]">{proficiency}%</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{ 
                                      background: `linear-gradient(90deg, ${categoryColors[category.title] || '#8245ec'}, ${categoryColors[category.title] || '#8245ec'}80)`
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${proficiency}%` }}
                                    transition={{ duration: 1, delay: skillIndex * 0.1 }}
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

              {/* Scroll Indicator */}
              <div className="p-4 border-t border-white/10 bg-gradient-to-r from-gray-900/50 to-transparent">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Scroll to explore all skills</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#8245ec] to-blue-500 rounded-full"
                        style={{ width: `${scrollPosition}%` }}
                      />
                    </div>
                    <span>{Math.round(scrollPosition)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#8245ec]/20 to-purple-500/20">
                  <Sparkles className="w-5 h-5 text-[#8245ec]" />
                </div>
                <h4 className="text-lg font-semibold text-white">Core Expertise</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Specialized in MERN stack with deep understanding of modern web architecture and scalable solutions.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Continuous Learning</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Actively exploring: <span className="text-[#8245ec]">Next.js, TypeScript, GraphQL, Docker</span>
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <Code2 className="w-5 h-5 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Problem Solving</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Strong foundation in algorithms, data structures, and system design principles.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8245ec, #a855f7);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a855f7, #c084fc);
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
