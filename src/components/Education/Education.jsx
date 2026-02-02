import React from "react";
import { education } from "../../constants";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen, ChevronRight, Sparkles } from "lucide-react";

const Education = () => {
  return (
    <section
      id="education"
      className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 xl:px-32 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8245ec]/20 to-blue-500/20 backdrop-blur-sm border border-[#8245ec]/30 mb-6">
            <GraduationCap className="w-4 h-4 text-[#8245ec]" />
            <span className="text-sm font-medium text-gray-300">Academic Journey</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
              Education &
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec]">
              Learning Path
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              My academic foundation that shaped my technical expertise and problem-solving approach
            </p>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-[#8245ec] to-transparent"></div>
          </div>
        </motion.div>

        {/* Education Timeline - Modern Design */}
        <div className="relative">
          {/* Decorative Timeline Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#8245ec]/30 to-transparent"></div>

          {/* Education Cards */}
          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* Timeline Indicator - Modern Design */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#8245ec] flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-[#8245ec]" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#8245ec] animate-ping opacity-20"></div>
                    
                    {/* Year Badge */}
                    <div className={`absolute top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 ${
                      index % 2 === 0 ? "left-16" : "right-16"
                    }`}>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10">
                        <Calendar className="w-3 h-3 text-[#8245ec]" />
                        <span className="text-xs text-gray-300">{edu.date}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#8245ec]" />
                    </div>
                  </div>
                </div>

                {/* Education Card */}
                <div className={`w-full md:w-[calc(50%-3rem)] ml-16 md:ml-0 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}>
                  <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#8245ec]/30 transition-all duration-300 overflow-hidden">
                    {/* Card Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>

                    <div className="relative p-6 md:p-8">
                      {/* Card Header */}
                      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                        {/* School Logo */}
                        <div className="flex-shrink-0">
                          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-800 to-gray-900">
                            <img
                              src={edu.img}
                              alt={edu.school}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8245ec]/10 to-transparent"></div>
                          </div>
                        </div>

                        {/* School Info */}
                        <div className="flex-1">
                          <div className="space-y-2">
                            <h3 className="text-xl md:text-2xl font-bold text-white">
                              {edu.degree}
                            </h3>
                            <div className="flex items-center gap-2">
                              <div className="p-1 rounded bg-gradient-to-r from-[#8245ec]/20 to-purple-500/20">
                                <BookOpen className="w-4 h-4 text-[#8245ec]" />
                              </div>
                              <span className="text-gray-300">{edu.school}</span>
                            </div>
                            
                            {/* Mobile Date */}
                            <div className="flex items-center gap-2 md:hidden">
                              <Calendar className="w-4 h-4 text-[#8245ec]" />
                              <span className="text-sm text-gray-400">{edu.date}</span>
                            </div>
                          </div>
                        </div>

                        {/* Grade Badge */}
                        <div className="self-start">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                            <Award className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-semibold text-green-300">{edu.grade}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8245ec] to-transparent"></div>
                        <p className="text-gray-400 pl-4 leading-relaxed">
                          {edu.desc}
                        </p>
                      </div>

                      {/* Key Learnings */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#8245ec]" />
                          <span className="font-medium text-white">Key Focus Areas</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {getFocusAreas(edu.degree).map((area, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 border border-white/10"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      {index === 0 && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Currently Pursuing</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#8245ec] to-blue-500 rounded-full"
                                  style={{ width: '85%' }}
                                />
                              </div>
                              <span className="text-[#8245ec] font-medium">85%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#8245ec]/20 to-purple-500/20">
                  <Award className="w-5 h-5 text-[#8245ec]" />
                </div>
                <h4 className="text-lg font-semibold text-white">Academic Excellence</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Consistent academic performance with focus on practical implementation of concepts
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Continuous Learning</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Beyond curriculum exploration of modern technologies and development practices
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <GraduationCap className="w-5 h-5 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Future Focus</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Combining academic knowledge with real-world experience to build innovative solutions
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper function to get focus areas based on degree
const getFocusAreas = (degree) => {
  if (degree.includes("Computer Science")) {
    return ["Data Structures", "Algorithms", "Web Development", "Database Systems", "Software Engineering"];
  }
  if (degree.includes("PCM") || degree.includes("Science")) {
    return ["Mathematics", "Physics", "Chemistry", "Problem Solving", "Logical Thinking"];
  }
  return ["Core Subjects", "Practical Skills", "Theoretical Knowledge", "Research"];
};

export default Education;







// import React from "react";
// import { education } from "../../constants"; // Import the education data

// const Education = () => {
//   return (
//     <section
//       id="education"
//       className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-3"
//     >
//       {/* Section Title */}
//       <div className="text-center mb-16">
//         <h2 className="text-4xl font-bold text-white">EDUCATION</h2>
//         <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
//         <p className="text-gray-400 mt-4 text-lg font-semibold">
//           My education has been a journey of learning and development. Here are the details of my academic background
//         </p>
//       </div>

//       {/* Education Timeline */}
//       <div className="relative">
//         {/* Vertical line */}
//         <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 sm:-translate-x-0 w-1 bg-white h-full"></div>

//         {/* Education Entries */}
//         {education.map((edu, index) => (
//           <div
//             key={edu.id}
//             className={`flex flex-col sm:flex-row items-center mb-16 ${index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
//               }`}
//           >
//             {/* Timeline Circle */}
//             <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 bg-gray-400 border-4 border-[#8245ec] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center z-0">
//               <img
//                 src={edu.img}
//                 alt={edu.school}
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>

//             {/* Content Section */}
//             <div
//               className={`w-full sm:max-w-md p-4 sm:p-8 rounded-2xl border border-white bg-gray-900 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] ${index % 2 === 0 ? "sm:ml-0" : "sm:mr-0"
//                 } sm:ml-44 sm:mr-44 ml-14 transform transition-transform duration-300 hover:scale-105`}
//             >
//               {/* Flex container for image and text */}
//               <div className="flex items-center space-x-6">
//                 {/* School Logo/Image */}
//                 <div className="w-40 h-16  bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden">
//                   <img
//                     src={edu.img}
//                     alt={edu.school}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>


//                 {/* Degree, School Name, and Date */}
//                 <div className="flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-xl sm:text-xl font-semibold text-white">
//                       {edu.degree}
//                     </h3>
//                     <h4 className="text-md sm:text-sm text-gray-300">
//                       {edu.school}
//                     </h4>
//                   </div>
//                   {/* Date at the bottom */}
//                   <p className="text-sm text-gray-500 mt-2">{edu.date}</p>
//                 </div>
//               </div>

//               <p className="mt-4 text-gray-400 font-bold">Grade: {edu.grade}</p>
//               <p className="mt-4 text-gray-400">{edu.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Education;