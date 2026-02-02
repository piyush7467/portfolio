import React, { useState } from "react";
import { projects } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight, Eye, Zap, ArrowRight } from "lucide-react";

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Get unique categories from project tags
  const categories = ["all", "fullstack", "frontend", "backend"];

  // Filter projects based on active category
  const filteredProjects = projects.filter(project => {
    if (activeFilter === "all") return true;
    if (activeFilter === "fullstack") {
      return project.tags.some(tag => 
        ["MongoDB", "Express", "React", "Node.js"].includes(tag)
      );
    }
    if (activeFilter === "frontend") {
      return project.tags.some(tag => 
        ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"].includes(tag)
      );
    }
    return true;
  });

  return (
    <section id="work" className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 xl:px-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-[#8245ec]" />
            <span className="text-sm text-gray-300">Portfolio</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Featured
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] to-purple-400">
              Projects
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real-world applications that showcase my technical expertise and problem-solving skills
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-gradient-to-r from-[#8245ec] to-purple-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 hover:border-[#8245ec] transition-all duration-300 group">
            <span className="text-gray-300 group-hover:text-white">View More Projects</span>
            <ArrowRight className="w-5 h-5 text-[#8245ec] group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

// Project Card Component
const ProjectCard = ({ project, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="relative h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-[#8245ec]/30 transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        
        {/* View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-4 py-2 rounded-full bg-gray-900/90 backdrop-blur-sm border border-white/10">
            <Eye className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-xl font-bold text-white flex-1">{project.title}</h3>
          <ChevronRight className="w-5 h-5 text-[#8245ec] flex-shrink-0" />
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium bg-gray-800/50 text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Project Modal Component
const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 hover:bg-[#8245ec] transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Project Image */}
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-[#8245ec] transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span className="font-semibold">Code</span>
                  </a>
                )}
                {project.webapp && (
                  <a
                    href={project.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#8245ec] to-purple-500 text-white"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="font-semibold">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

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