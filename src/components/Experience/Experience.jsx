import React from "react";
import { experiences } from "../../constants";
import { motion } from "framer-motion";
import { Calendar, Briefcase, ChevronRight, Award, Sparkles, Zap } from "lucide-react";

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative py-10 sm:py-14 md:py-16 px-3 sm:px-6 md:px-8 lg:px-16 xl:px-32 font-sans overflow-hidden bg-gray-950"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header with Floating Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#8245ec]/20 to-blue-500/20 backdrop-blur-sm border border-[#8245ec]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8245ec]" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">Career Timeline</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
              Professional
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec] animate-gradient">
              Journey
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="h-px w-8 sm:w-12 md:w-20 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
            <p className="text-xs sm:text-base md:text-xl text-gray-400 max-w-2xl px-2">
              From hackathons to production projects - every step in my development journey
            </p>
            <div className="h-px w-8 sm:w-12 md:w-20 bg-gradient-to-l from-transparent via-[#8245ec] to-transparent"></div>
          </div>
        </motion.div>

        {/* Timeline Container with Floating Orbs */}
        <div className="relative">
          {/* Floating Orbs along timeline */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-4 sm:left-6 md:left-1/2 top-1/4 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-[#8245ec] to-blue-500 blur-sm"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-4 sm:left-6 md:left-1/2 top-3/4 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-blue-500 to-[#8245ec] blur-sm"
          ></motion.div>

          {/* Animated Timeline Line */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8245ec]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#8245ec] via-transparent to-[#8245ec] animate-pulse"></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                viewport={{ once: true, amount: 0.2 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Animated Timeline Dot */}
                <div className="absolute left-4 sm:left-6 md:left-1/2 transform -translate-x-1/2 z-20 top-6 md:top-auto">
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-[#8245ec] to-blue-500 shadow-lg shadow-[#8245ec]/40"
                    ></motion.div>
                    <div className="absolute inset-0 rounded-full bg-[#8245ec] animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Date Indicator (Desktop) */}
                <div className={`hidden md:flex absolute top-4 items-center gap-2 ${
                  index % 2 === 0 ? "left-[calc(50%+3rem)]" : "right-[calc(50%+3rem)]"
                }`}>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-sm border border-white/10">
                    <Calendar className="w-4 h-4 text-[#8245ec]" />
                    <span className="text-sm text-gray-300">{experience.date}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8245ec]" />
                </div>

                {/* Experience Card Wrapper */}
                <div className={`w-full md:w-[calc(50%-4rem)] ${
                  index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                } pl-8 sm:pl-12 md:pl-0`}>
                  <motion.div
                    whileHover={{ scale: 1.01, y: -4 }}
                    className="group relative"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8245ec] to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                    
                    {/* Main Card */}
                    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                          backgroundSize: '20px 20px'
                        }}></div>
                      </div>

                      <div className="relative p-4 sm:p-6 md:p-8">
                        {/* Card Header */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4 sm:mb-6">
                          {/* Enhanced Logo Container */}
                          <div className="flex-shrink-0 relative self-start sm:self-auto">
                            <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 p-1.5 sm:p-2">
                              <img
                                src={experience.img}
                                alt={experience.company}
                                className="w-full h-full object-contain rounded-lg"
                              />
                              {/* Logo Glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-[#8245ec]/10 to-transparent rounded-lg"></div>
                            </div>
                            
                            {/* Role Indicator Badge */}
                            <div className={`absolute -top-2 -right-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                              index === 0 ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30" :
                              index === 1 ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30" :
                              index === 2 ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30" :
                              "bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-400 border border-orange-500/30"
                            }`}>
                              {index === 0 ? "Current" : "Previous"}
                            </div>
                          </div>

                          {/* Title and Info */}
                          <div className="flex-1">
                            <div className="space-y-1 sm:space-y-2">
                              <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                                {experience.role}
                              </h3>
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                                <span className="text-sm sm:text-lg text-gray-300 font-medium">{experience.company}</span>
                              </div>
                              
                              {/* Mobile Date Tag */}
                              <div className="flex items-center gap-1.5 md:hidden pt-0.5">
                                <Calendar className="w-3.5 h-3.5 text-[#8245ec] flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-purple-300">{experience.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4 sm:mb-6 relative">
                          <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8245ec] to-transparent"></div>
                          <p className="text-gray-400 pl-3 sm:pl-4 text-xs sm:text-sm md:text-base leading-relaxed">
                            {experience.desc}
                          </p>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-[#8245ec]/20 to-purple-500/20">
                              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8245ec]" />
                            </div>
                            <span className="font-semibold text-white text-xs sm:text-sm md:text-base">Technologies & Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {experience.skills.map((skill, skillIndex) => (
                              <motion.span
                                key={skillIndex}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: skillIndex * 0.04 }}
                                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs md:text-sm font-medium bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 hover:text-white hover:from-[#8245ec]/20 hover:to-purple-500/20 transition-all duration-300 border border-white/10 hover:border-[#8245ec]/30 cursor-pointer group"
                              >
                                <span className="flex items-center gap-1">
                                  {skill}
                                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300 hidden sm:inline" />
                                </span>
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Achievement Badge */}
                        {index === 0 && (
                          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                              <span className="text-xs sm:text-sm text-green-300 font-medium">Latest Experience</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-[#8245ec] to-blue-500 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full bg-[#8245ec] animate-ping opacity-30"></div>
              </div>
              <span className="text-xs sm:text-sm md:text-base text-gray-300">Always expanding my expertise</span>
            </div>
            <div className="h-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden sm:block"></div>
            <span className="text-xs sm:text-sm text-gray-400">
              Currently exploring: <span className="text-[#8245ec] font-medium">Next.js, TypeScript, AWS</span>
            </span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Experience;