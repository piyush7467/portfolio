import React, { useState } from "react";
import { projects } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  X, 
  Sparkles, 
  Code2,
  Eye,
  ChevronRight,
  Globe
} from "lucide-react";

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Prevent modal close when clicking inside modal content
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section
      id="work"
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 font-sans overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8245ec]/20 to-blue-500/20 backdrop-blur-sm border border-[#8245ec]/30 mb-4">
            <Sparkles className="w-4 h-4 text-[#8245ec]" />
            <span className="text-sm font-medium text-gray-300">Portfolio Showcase</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
              Featured
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec]">
              Projects
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl">
              A curated collection of my best work, showcasing real-world solutions and technical expertise
            </p>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-[#8245ec] to-transparent"></div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleOpenModal(project)}
              className="group relative cursor-pointer"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8245ec] to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden h-full">
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8245ec]/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/90 backdrop-blur-sm border border-white/10">
                      <Eye className="w-4 h-4 text-white" />
                      <span className="text-sm text-white font-medium">View Project</span>
                    </div>
                  </div>
                  
                  {/* Project Type Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-sm border border-white/10">
                    <span className="text-xs font-medium text-gray-300">
                      {project.tags.includes('MongoDB') ? 'Full Stack' : 
                       project.tags.includes('React') ? 'Frontend' : 'Web App'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-white flex-1">
                      {project.title}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-[#8245ec] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#8245ec]/20 to-purple-500/20 text-[#8245ec]">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:from-[#8245ec]/20 hover:to-purple-500/20 transition-all duration-300 border border-white/10"
                        >
                          <Github className="w-4 h-4 text-gray-400 hover:text-white" />
                        </a>
                      )}
                      {project.webapp && (
                        <a
                          href={project.webapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:from-[#8245ec]/20 hover:to-purple-500/20 transition-all duration-300 border border-white/10"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Code2 className="w-3 h-3" />
                      <span>{project.tags.length} technologies</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projects Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#8245ec]/20 to-purple-500/20">
                  <Globe className="w-5 h-5 text-[#8245ec]" />
                </div>
                <h4 className="text-lg font-semibold text-white">Full Stack Mastery</h4>
              </div>
              <p className="text-gray-400 text-sm">
                End-to-end development with modern MERN stack and cloud deployment
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                  <Code2 className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Real Solutions</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Production-ready applications solving real-world problems
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <Sparkles className="w-5 h-5 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Always Innovating</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Continuously exploring new technologies and best practices
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={handleModalClick}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-[#8245ec]/20 hover:to-purple-500/20 transition-all duration-300 border border-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                {/* Project Image */}
                <div className="relative rounded-xl overflow-hidden mb-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Code2 className="w-4 h-4" />
                        <span className="text-sm">Project Details</span>
                      </div>
                      <div className="h-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                      <div className="text-sm text-gray-400">
                        {selectedProject.tags.length} technologies
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 border border-white/10 hover:border-[#8245ec]/30 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:from-[#8245ec]/20 hover:to-purple-500/20 transition-all duration-300 border border-white/10"
                      >
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        <span className="font-semibold text-gray-300 group-hover:text-white">
                          View Source Code
                        </span>
                      </a>
                    )}
                    {selectedProject.webapp && (
                      <a
                        href={selectedProject.webapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-[#8245ec] to-blue-600 text-white hover:shadow-lg hover:shadow-[#8245ec]/30 transition-all duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="font-semibold">
                          Visit Live Website
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;









// import React, { useState } from "react";
// import { projects } from "../../constants";

// const Work = () => {
//   const [selectedProject, setSelectedProject] = useState(null);

//   const handleOpenModal = (project) => {
//     setSelectedProject(project);
//   };

//   const handleCloseModal = () => {
//     setSelectedProject(null);
//   };

//   return (
//     <section
//       id="work"
//       className="py-24 pb-28  px-[12vw] md:px-[7vw] lg:px-[20vw]  font-sans relative bg-skills-gradient clip-path-custom"
//     >
//       {/* Section Title */}
//       <div className="text-center mb-16">
//         <h2 className="text-4xl font-bold text-white">PROJECTS</h2>
//         <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
//         <p className="text-gray-400 mt-4 text-lg font-semibold">
//           A showcase of the projects I have worked on, highlighting my skills
//           and experience in various technologies
//         </p>
//       </div>

//       {/* Projects Grid */}
//       <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {projects.map((project) => (
//           <div
//             key={project.id}
//             onClick={() => handleOpenModal(project)}
//             className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 hover:-translate-y-2 transition-transform duration-300"
//           >
//             <div className="p-4">
//               <img
//                 src={project.image}
//                 alt={project.title}
//                 className="w-full h-auto max-h-[400px] object-cover rounded-xl"
//               />
//             </div>
//             <div className="p-6">
//               <h3 className="text-2xl font-bold text-white mb-2">
//                 {project.title}
//               </h3>
//               <p className="text-gray-500 mb-4 pt-4 line-clamp-3">
//                 {project.description}
//               </p>
//               <div className="mb-4">
//                 {project.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="inline-block bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1 mr-2 mb-2"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal Container */}
//       {selectedProject && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
//           <div className="bg-gray-900 rounded-xl shadow-2xl lg:w-full w-[90%] max-w-3xl overflow-hidden relative">
//             <div className="flex justify-end p-4">
//               <button
//                 onClick={handleCloseModal}
//                 className="text-white text-3xl font-bold hover:text-purple-500"
//               >
//                 &times;
//               </button>
//             </div>

//             <div className="flex flex-col">
//               <div className="w-full flex justify-center bg-gray-900 px-4">
//                 <img
//                   src={selectedProject.image}
//                   alt={selectedProject.title}
//                   className="lg:w-full w-[95%] object-contain rounded-xl shadow-2xl"
//                 />
//               </div>
//               <div className="lg:p-8 p-6">
//                 <h3 className="lg:text-3xl font-bold text-white mb-4 text-md">
//                   {selectedProject.title}
//                 </h3>
//                 <p className="text-gray-400 mb-6 lg:text-base text-xs">
//                   {selectedProject.description}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {selectedProject.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex gap-4">
//                   <a
//                     href={selectedProject.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-1/2 bg-gray-800 hover:bg-purple-800 text-gray-400 lg:px-6 lg:py-2 px-2 py-1 rounded-xl lg:text-xl text-sm font-semibold text-center"
//                   >
//                     View Code
//                   </a>
//                   <a
//                     href={selectedProject.webapp}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-1/2 bg-purple-600 hover:bg-purple-800 text-white lg:px-6 lg:py-2 px-2 py-1 rounded-xl lg:text-xl text-sm font-semibold text-center"
//                   >
//                     View Live
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Work; 