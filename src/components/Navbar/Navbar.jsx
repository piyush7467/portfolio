import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowUp } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import { Code2, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse move effect for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Detect scroll for effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-active section detection
  useEffect(() => {
    const handleScrollActive = () => {
      const sections = ["about", "skills", "experience", "work", "education", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScrollActive);
    return () => window.removeEventListener("scroll", handleScrollActive);
  }, []);

  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { id: "about", label: "About", icon: "👤" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "work", label: "Projects", icon: "🚀" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "contact", label: "Contact", icon: "📧" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-gray-950/90 backdrop-blur-xl shadow-2xl border-b border-white/5" 
            : "bg-transparent"
        }`}
        style={{
          background: isScrolled 
            ? `linear-gradient(135deg, rgba(5, 4, 20, 0.95) 0%, rgba(15, 10, 40, 0.95) 100%)`
            : 'transparent'
        }}
      >
        {/* Interactive Background Glow */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(130, 69, 236, 0.2), transparent 50%)`
          }}
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-32">
          <div className="flex justify-between items-center py-4 md:py-5">
            {/* Enhanced Logo with Gradient */}
            <motion.div 
              className="cursor-pointer group"
              onClick={() => handleMenuItemClick("about")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2 mr-5 ">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#8245ec]/20 to-blue-500/20 border border-white/10">
                  <Code2 className="w-5 h-5 text-[#8245ec]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
                      Piyush
                    </span>
                    <span className="text-[#8245ec] font-bold">/</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec]">
                      Shakya
                    </span>
                  </div>
                  <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#8245ec] to-transparent transition-all duration-500 mt-1"></div>
                </div>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 ml-5">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handleMenuItemClick(item.id)}
                    className="relative py-2 px-4 text-gray-300 hover:text-white transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm opacity-70">{item.icon}</span>
                      <span className={`font-medium relative z-10 ${activeSection === item.id ? "text-[#8245ec]" : ""}`}>
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Animated background */}
                    <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      activeSection === item.id 
                        ? "bg-gradient-to-r from-[#8245ec]/20 to-blue-500/20 border border-[#8245ec]/30" 
                        : "bg-transparent group-hover:bg-white/5"
                    }`}></div>
                    
                    {/* Glow effect */}
                    {activeSection === item.id && (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#8245ec]/10 to-blue-500/10 blur-md"></div>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Social Icons */}
              <motion.a
                href="https://github.com/piyush7467"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-2 text-gray-300 hover:text-white transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#8245ec]/0 via-[#8245ec]/10 to-[#8245ec]/0 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
                <FaGithub size={20} className="relative z-10" />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/piyush7467"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-2 text-gray-300 hover:text-white transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#8245ec]/0 via-[#8245ec]/10 to-[#8245ec]/0 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
                <FaLinkedin size={20} className="relative z-10" />
              </motion.a>
              
              {/* Resume Button */}
              <motion.a
                href="https://drive.google.com/file/d/1E3ieL3g0VFqNdTk6WvlFjkNlrgHgjS3E/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <FaFileDownload className="w-4 h-4 text-[#8245ec] relative" />
                <span className="relative text-white font-semibold text-sm">Resume</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-3 text-[#8245ec] hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8245ec]/10 to-blue-500/10 rounded-lg"></div>
              {isOpen ? (
                <FiX size={24} className="relative z-10" />
              ) : (
                <FiMenu size={24} className="relative z-10" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-gray-950/98 backdrop-blur-2xl border-t border-white/10 shadow-2xl md:hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleMenuItemClick(item.id)}
                        className={`w-full text-left py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-between ${
                          activeSection === item.id
                            ? "bg-gradient-to-r from-[#8245ec]/20 to-blue-500/20 text-[#8245ec] border border-[#8245ec]/30"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {activeSection === item.id && (
                          <Sparkles className="w-4 h-4 text-[#8245ec]" />
                        )}
                      </button>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Social Links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-6 border-t border-white/10"
                  >
                    <div className="flex items-center justify-center space-x-6">
                      <motion.a
                        href="https://github.com/piyush7467"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaGithub size={22} />
                      </motion.a>
                      <motion.a
                        href="https://www.linkedin.com/in/piyush7467"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaLinkedin size={22} />
                      </motion.a>
                      <motion.a
                        href="https://drive.google.com/file/d/1E3ieL3g0VFqNdTk6WvlFjkNlrgHgjS3E/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#8245ec] to-blue-600 text-white font-medium text-sm flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaFileDownload size={16} />
                        Resume
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 text-white rounded-full shadow-2xl hover:shadow-[#8245ec]/50 transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <FiArrowUp size={20} className="relative z-10" />
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8245ec] to-blue-600 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;







// import React, { useState, useEffect } from "react";
// import { FiMenu, FiX } from "react-icons/fi";
// import { FaGithub, FaLinkedin } from "react-icons/fa";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("");
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Detect scroll and change navbar background
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Smooth scroll function
//   const handleMenuItemClick = (sectionId) => {
//     setActiveSection(sectionId);
//     setIsOpen(false);

//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const menuItems = [
//     { id: "about", label: "About" },
//     { id: "skills", label: "Skills" },
//     { id: "experience", label: "Experience" },
//     { id: "work", label: "Projects" },
//     { id: "education", label: "Education" },
//     { id: "contact", label: "Contact" },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 transition duration-300 px-[7vw] md:px-[7vw] lg:px-[20vw] ${
//         isScrolled ? "bg-[#050414] bg-opacity-50 backdrop-blur-md shadow-md" : "bg-transparent"
//       }`}
//     >
//       <div className="text-white py-5 flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-lg font-semibold cursor-pointer">
//           <span className="text-[#8245ec]">&lt;</span>
//           <span className="text-white">Piyush</span>
//           <span className="text-[#8245ec]">/</span>
//           <span className="text-white">Shakya</span>
//           <span className="text-[#8245ec]">&gt;</span>
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-8 text-gray-300">
//           {menuItems.map((item) => (
//             <li
//               key={item.id}
//               className={`cursor-pointer hover:text-[#8245ec] ${
//                 activeSection === item.id ? "text-[#8245ec]" : ""
//               }`}
//             >
//               <button onClick={() => handleMenuItemClick(item.id)}>
//                 {item.label}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* Social Icons */}
//         <div className="hidden md:flex space-x-4">
//           <a
//             href="https://github.com/piyush7467"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-300 hover:text-[#8245ec]"
//           >
//             <FaGithub size={24} />
//           </a>
//           <a
//             href="https://www.linkedin.com/in/piyush7467"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-300 hover:text-[#8245ec]"
//           >
//             <FaLinkedin size={24} />
//           </a>
//         </div>

//         {/* Mobile Menu Icon */}
//         <div className="md:hidden">
//           {isOpen ? (
//             <FiX
//               className="text-3xl text-[#8245ec] cursor-pointer"
//               onClick={() => setIsOpen(false)}
//             />
//           ) : (
//             <FiMenu
//               className="text-3xl text-[#8245ec] cursor-pointer"
//               onClick={() => setIsOpen(true)}
//             />
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu Items */}
//       {isOpen && (
//         <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-[#050414] bg-opacity-50 backdrop-filter backdrop-blur-lg z-50 rounded-lg shadow-lg md:hidden">
//           <ul className="flex flex-col items-center space-y-4 py-4 text-gray-300">
//             {menuItems.map((item) => (
//               <li
//                 key={item.id}
//                 className={`cursor-pointer hover:text-white ${
//                   activeSection === item.id ? "text-[#8245ec]" : ""
//                 }`}
//               >
//                 <button onClick={() => handleMenuItemClick(item.id)}>
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//             <div className="flex space-x-4">
//               <a
//                 href="https://github.com/piyush7467"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-300 hover:text-white"
//               >
//                 <FaGithub size={24} />
//               </a>
//               <a
//                 href="https://www.linkedin.com/in/piyush7467"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-300 hover:text-white"
//               >
//                 <FaLinkedin size={24} />
//               </a>
//             </div>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;