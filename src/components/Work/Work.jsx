import React, { useState } from "react";
import { projects } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight, Zap, Cpu, Database, Layout } from "lucide-react";

const Work = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [viewMode, setViewMode] = useState("grid"); // grid, carousel, detailed

  const currentProject = projects[activeProject];

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="work" className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 xl:px-32">
      {/* Background with Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #8245ec 0px, transparent 50%),
                           radial-gradient(circle at 80% 70%, #00b4d8 0px, transparent 50%)`,
          backgroundSize: '400px 400px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Minimal Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-[#8245ec] to-transparent mx-auto"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="text-[#8245ec]">/</span>
            <span className="text-white">projects</span>
          </h2>
          
          <p className="text-gray-400 max-w-xl mx-auto">
            Selected works showcasing technical depth and creative solutions
          </p>
        </div>

        {/* Unique Project Viewer - Split Screen Design */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px]">
          {/* Left Column - Project Info */}
          <div className="space-y-8">
            {/* Project Navigation */}
            <div className="flex items-center gap-4">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProject(idx)}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    idx === activeProject 
                      ? 'bg-gradient-to-r from-[#8245ec] to-purple-500' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                />
              ))}
            </div>

            {/* Project Details */}
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#8245ec] animate-pulse"></div>
                  <span className="text-sm text-gray-400">Project {activeProject + 1} of {projects.length}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {currentProject.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              {/* Tech Stack Preview */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5">
                    <Cpu className="w-5 h-5 text-[#8245ec]" />
                  </div>
                  <span className="text-white font-medium">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {currentProject.tags.slice(0, 5).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 text-sm border border-white/10 hover:border-[#8245ec]/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Actions */}
              <div className="flex gap-4 pt-6">
                {currentProject.github && (
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
                  >
                    <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    <span className="text-gray-300 group-hover:text-white">Code</span>
                  </a>
                )}
                {currentProject.webapp && (
                  <a
                    href={currentProject.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-[#8245ec] to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevProject}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
              </button>
              <span className="text-sm text-gray-400 flex-1 text-center">
                Navigate projects
              </span>
              <button
                onClick={nextProject}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Right Column - Project Visual */}
          <div className="relative">
            {/* Project Image Container */}
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900 to-gray-800"
            >
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Project Stats */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#8245ec]" />
                    <span className="text-xs text-gray-300">{currentProject.tags.length} technologies</span>
                  </div>
                  <div className="h-4 w-px bg-gray-700"></div>
                  <div className="text-xs text-gray-400">
                    {currentProject.tags.includes('MongoDB') ? 'Full Stack' : 'Frontend'}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {activeProject + 1}/{projects.length}
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-r from-[#8245ec]/20 to-transparent blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-r from-transparent to-blue-500/20 blur-xl"></div>
          </div>
        </div>

        {/* Quick Project Grid */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-white">All Projects</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  viewMode === "grid" 
                    ? "bg-[#8245ec] text-white" 
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("detailed")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  viewMode === "detailed" 
                    ? "bg-[#8245ec] text-white" 
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                Detailed
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(idx)}
                className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  idx === activeProject
                    ? "border-[#8245ec] bg-[#8245ec]/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Layout className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{project.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${
                        idx === activeProject ? "bg-[#8245ec]" : "bg-gray-600"
                      }`} />
                      <span className="text-xs text-gray-400">
                        {project.tags.slice(0, 2).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Stats */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{projects.length}</div>
              <div className="text-gray-400">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {projects.filter(p => p.tags.includes('MongoDB')).length}
              </div>
              <div className="text-gray-400">Full Stack Apps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {projects.reduce((acc, p) => acc + p.tags.length, 0)}
              </div>
              <div className="text-gray-400">Technologies Used</div>
            </div>
          </div>
        </div>
      </div>
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