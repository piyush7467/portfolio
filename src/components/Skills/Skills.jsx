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
  ChevronRight
} from "lucide-react";

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  
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
              Skills & 
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec]">
              Technologies
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive showcase of my technical stack, refined through real-world projects and continuous learning
            </p>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-[#8245ec] to-transparent"></div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {SkillsInfo.map((category, index) => (
            <motion.button
              key={category.title}
              variants={itemVariants}
              onClick={() => setActiveCategory(index)}
              className={`group relative px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 ${
                activeCategory === index
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={{
                background: activeCategory === index 
                  ? `linear-gradient(135deg, ${categoryColors[category.title] || '#8245ec'}20, transparent)`
                  : 'transparent'
              }}
            >
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                activeCategory === index ? 'scale-110' : ''
              }`} style={{
                backgroundColor: activeCategory === index 
                  ? `${categoryColors[category.title] || '#8245ec'}20`
                  : 'rgba(255,255,255,0.05)'
              }}>
                <div style={{ color: categoryColors[category.title] || '#8245ec' }}>
                  {categoryIcons[category.title] || <Cpu className="w-6 h-6" />}
                </div>
              </div>
              <span className="font-semibold">{category.title}</span>
              {activeCategory === index && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full border border-white/20 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {SkillsInfo.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className={`relative rounded-2xl p-6 border transition-all duration-500 ${
                activeCategory === categoryIndex
                  ? 'border-[#8245ec]/50 bg-gradient-to-br from-gray-900/50 to-gray-900/30 shadow-2xl shadow-[#8245ec]/10'
                  : 'border-white/10 bg-gray-900/30 hover:border-[#8245ec]/30'
              }`}
              style={{
                opacity: activeCategory === categoryIndex ? 1 : 0.6,
                transform: activeCategory === categoryIndex ? 'translateY(-8px)' : 'none'
              }}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
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
                    <div className="h-px w-12 bg-gradient-to-r from-[#8245ec] to-transparent mt-2"></div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {category.skills.length} skills
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="group relative"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    whileHover={{ y: -4 }}
                  >
                    <div className={`relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                      hoveredSkill === skill.name
                        ? 'border-[#8245ec]/50 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-[#8245ec]/20'
                        : 'border-white/10 bg-gray-800/30'
                    }`}>
                      {/* Skill Icon */}
                      <div className="flex items-center justify-center mb-3">
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
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
                      </div>
                      
                      {/* Skill Name */}
                      <div className="text-center">
                        <span className={`font-medium transition-colors duration-300 ${
                          hoveredSkill === skill.name ? 'text-white' : 'text-gray-300'
                        }`}>
                          {skill.name}
                        </span>
                      </div>
                      
                      {/* Hover Indicator */}
                      {hoveredSkill === skill.name && (
                        <motion.div
                          layoutId="skillHover"
                          className="absolute inset-0 rounded-xl border-2 border-[#8245ec]/30"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Category Footer */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Proficiency Level</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i <= 4 ? 'bg-[#8245ec]' : 'bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Journey Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-gray-300">Always expanding my tech stack</span>
            </div>
            <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="text-sm text-gray-400">
              Currently exploring: <span className="text-[#8245ec]">Next.js, TypeScript, GraphQL</span>
            </div>
          </div>
        </motion.div>
      </div>
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
