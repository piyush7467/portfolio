import React from "react";
import { experiences } from "../../constants";
import { motion } from "framer-motion";
import { Calendar, Briefcase, ChevronRight, Award } from "lucide-react";

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 font-sans overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4">
            <Briefcase className="w-4 h-4 text-[#8245ec]" />
            <span className="text-sm font-medium text-gray-300">Career Journey</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
              Professional
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec]">
              Experience
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl">
              A timeline of my professional growth through real-world projects and experiences
            </p>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-[#8245ec] to-transparent"></div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8245ec] to-transparent"></div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-[#8245ec] to-blue-500"></div>
                    <div className="absolute inset-0 rounded-full bg-[#8245ec] animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Date Badge - Desktop Only */}
                <div className={`hidden md:block absolute top-0 ${
                  index % 2 === 0 ? "left-[calc(50%+2.5rem)]" : "right-[calc(50%+2.5rem)]"
                }`}>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-white/10">
                    <Calendar className="w-4 h-4 text-[#8245ec]" />
                    <span className="text-sm text-gray-300">{experience.date}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                } ml-6 md:ml-0`}>
                  <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#8245ec]/30 transition-all duration-300 overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8245ec]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative p-6 md:p-8">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-2 border border-white/10">
                            <img
                              src={experience.img}
                              alt={experience.company}
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Title Info */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                                {experience.role}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">{experience.company}</span>
                              </div>
                            </div>
                            
                            {/* Date - Mobile Only */}
                            <div className="flex items-center gap-2 md:hidden">
                              <Calendar className="w-4 h-4 text-[#8245ec]" />
                              <span className="text-sm text-gray-400">{experience.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {experience.desc}
                      </p>

                      {/* Skills */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#8245ec]" />
                          <span className="font-medium text-white">Technologies Used</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#8245ec]/20 to-purple-500/20 text-gray-300 hover:text-white hover:from-[#8245ec]/30 hover:to-purple-500/30 transition-all duration-300 border border-[#8245ec]/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Connector Line */}
                      <div className={`absolute top-8 ${
                        index % 2 === 0 ? "-left-6" : "-right-6 md:hidden"
                      } md:hidden w-6 h-px bg-gradient-to-r ${
                        index % 2 === 0 ? "from-transparent to-[#8245ec]/50" : "from-[#8245ec]/50 to-transparent"
                      }`}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Progress */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-gray-300">Always growing and learning</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8245ec]" />
            <span className="text-sm text-gray-400">
              Currently open to new opportunities
            </span>
          </div>
        </div>
      </div>
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