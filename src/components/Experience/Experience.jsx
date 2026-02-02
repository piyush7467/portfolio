import React from "react";
import { experiences } from "../../constants";
import { motion } from "framer-motion";
import { Calendar, Briefcase, ChevronRight, Award, Sparkles, Zap } from "lucide-react";

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 font-sans overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
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
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8245ec]/20 to-blue-500/20 backdrop-blur-sm border border-[#8245ec]/30 mb-4">
            <Sparkles className="w-4 h-4 text-[#8245ec]" />
            <span className="text-sm font-medium text-gray-300">Career Timeline</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
              Professional
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec] animate-gradient">
              Journey
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl">
              From hackathons to production projects - every step in my development journey
            </p>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-[#8245ec] to-transparent"></div>
          </div>
        </motion.div>

        {/* Timeline Container with Floating Orbs */}
        <div className="relative">
          {/* Floating Orbs along timeline */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/4 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-[#8245ec] to-blue-500 blur-sm"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-1/2 top-3/4 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-[#8245ec] blur-sm"
          ></motion.div>

          {/* Animated Timeline Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8245ec]/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#8245ec] via-transparent to-[#8245ec] animate-pulse"></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Animated Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 z-20">
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-[#8245ec] to-blue-500 shadow-lg shadow-[#8245ec]/30"
                    ></motion.div>
                    <div className="absolute inset-0 rounded-full bg-[#8245ec] animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Date Indicator */}
                <div className={`hidden md:flex absolute top-4 items-center gap-2 ${
                  index % 2 === 0 ? "left-[calc(50%+3rem)]" : "right-[calc(50%+3rem)]"
                }`}>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-sm border border-white/10">
                    <Calendar className="w-4 h-4 text-[#8245ec]" />
                    <span className="text-sm text-gray-300">{experience.date}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8245ec]" />
                </div>

                {/* Experience Card */}
                <div className={`w-full md:w-[calc(50%-4rem)] ${
                  index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                } ml-8 md:ml-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8245ec] to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                    
                    {/* Main Card */}
                    <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                          backgroundSize: '20px 20px'
                        }}></div>
                      </div>

                      <div className="relative p-6 md:p-8">
                        {/* Card Header */}
                        <div className="flex flex-col sm:flex-row gap-6 mb-6">
                          {/* Enhanced Logo Container */}
                          <div className="flex-shrink-0 relative">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 p-2">
                              <img
                                src={experience.img}
                                alt={experience.company}
                                className="w-full h-full object-contain rounded-lg"
                              />
                              {/* Logo Glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-[#8245ec]/10 to-transparent rounded-lg"></div>
                            </div>
                            
                            {/* Role Indicator */}
                            <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold ${
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
                            <div className="space-y-2">
                              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                {experience.role}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                                <span className="text-lg md:text-xl text-gray-300">{experience.company}</span>
                              </div>
                              
                              {/* Mobile Date */}
                              <div className="flex items-center gap-2 md:hidden">
                                <Calendar className="w-4 h-4 text-[#8245ec]" />
                                <span className="text-sm text-gray-400">{experience.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 relative">
                          <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8245ec] to-transparent"></div>
                          <p className="text-gray-400 pl-4 leading-relaxed">
                            {experience.desc}
                          </p>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-[#8245ec]/20 to-purple-500/20">
                              <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#8245ec]" />
                            </div>
                            <span className="font-semibold text-white">Technologies & Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill, skillIndex) => (
                              <motion.span
                                key={skillIndex}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                                className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 hover:text-white hover:from-[#8245ec]/20 hover:to-purple-500/20 transition-all duration-300 border border-white/10 hover:border-[#8245ec]/30 cursor-pointer group"
                              >
                                <span className="flex items-center gap-1">
                                  {skill}
                                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                                </span>
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Achievement Badge */}
                        {index === 0 && (
                          <div className="mt-6 pt-6 border-t border-white/10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                              <Award className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-green-300">Latest Experience</span>
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
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#8245ec] to-blue-500 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full bg-[#8245ec] animate-ping opacity-30"></div>
              </div>
              <span className="text-gray-300">Always expanding my expertise</span>
            </div>
            <div className="h-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden sm:block"></div>
            <span className="text-sm text-gray-400">
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



// import React from "react";
// import { experiences } from "../../constants"; // Import your data

// const Experience = () => {
//   return (
//     <section
//       id="experience"
//       className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-2"
//     >
//       {/* Section Title */}
//       <div className="text-center mb-16">
//         <h2 className="text-4xl font-bold text-white">EXPERIENCE</h2>
//         <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
//         <p className="text-gray-400 mt-4 text-lg font-semibold">
//           A collection of my practical experiences, from full-stack projects to hackathons, showcasing my growth as a developer.
//         </p>

//       </div>

//       {/* Experience Timeline */}
//       <div className="relative">
//         {/* Vertical line */}
//         <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 sm:-translate-x-0 w-1 bg-white h-full"></div>

//         {/* Experience Entries */}
//         {experiences.map((experience, index) => (
//           <div
//             key={experience.id}
//             className={`flex flex-col sm:flex-row items-center mb-16 ${index % 2 === 0 ? "sm:justify-end" : "sm:justify-start"
//               }`}
//           >
//             {/* Timeline Circle */}
//             <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 bg-gray-400 border-4 border-[#8245ec] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center ">
//               <img
//                 src={experience.img}
//                 alt={experience.company}
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>

//             {/* Content Section */}
//             <div
//               className={`w-full sm:max-w-md p-4 sm:p-8 rounded-2xl  border border-white bg-gray-900 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] ${index % 2 === 0 ? "sm:ml-0" : "sm:mr-0"
//                 } sm:ml-44 sm:mr-44 ml-14 transform transition-transform duration-300 hover:scale-105`}
//             >
//               {/* Flex container for image and text */}
//               <div className="flex items-center space-x-6">
//                 {/* Company Logo/Image */}
//                 <div className="w-16 h-16 bg-white rounded-md overflow-hidden">
//                   <img
//                     src={experience.img}
//                     alt={experience.company}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>

//                 {/* Role, Company Name, and Date */}
//                 <div className="flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-xl sm:text-2xl font-semibold text-white">
//                       {experience.role}
//                     </h3>
//                     <h4 className="text-md sm:text-sm text-gray-300">
//                       {experience.company}
//                     </h4>
//                   </div>
//                   {/* Date at the bottom */}
//                   <p className="text-sm text-gray-500 mt-2">{experience.date}</p>
//                 </div>
//               </div>

//               <p className="mt-4 text-gray-400">{experience.desc}</p>
//               <div className="mt-4">
//                 <h5 className="font-medium text-white">Skills:</h5>
//                 <ul className="flex flex-wrap mt-2">
//                   {experience.skills.map((skill, index) => (
//                     <li
//                       key={index}
//                       className="bg-[#8245ec] text-gray-300 px-4 py-1 text-xs sm:text-sm rounded-lg mr-2 mb-2 border border-gray-400"
//                     >
//                       {skill}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Experience;