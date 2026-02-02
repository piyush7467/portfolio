import React, { useState } from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaGithub,
  FaHeart 
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  const socialLinks = [
    { 
      icon: <FaLinkedin />, 
      link: "https://www.linkedin.com/in/piyush7467",
      label: "LinkedIn Profile",
      color: "hover:text-[#0077B5]"
    },
    { 
      icon: <FaGithub />, 
      link: "https://github.com/PiyushShakya7467",
      label: "GitHub Profile",
      color: "hover:text-gray-100"
    },
    { 
      icon: <FaTwitter />, 
      link: "https://x.com/shakya_piyush",
      label: "Twitter Profile",
      color: "hover:text-[#1DA1F2]"
    },
    { 
      icon: <FaInstagram />, 
      link: "https://www.instagram.com/p.iyush.522/",
      label: "Instagram Profile",
      color: "hover:text-[#E4405F]"
    },
    // { 
    //   icon: <FaFacebook />, 
    //   link: "https://www.facebook.com/piyush.shakya.7311",
    //   label: "Facebook Profile",
    //   color: "hover:text-[#1877F2]"
    // },
    // { 
    //   icon: <FiMail />, 
    //   link: "mailto:shakyapiyush610@gmail.com",
    //   label: "Send Email",
    //   color: "hover:text-[#EA4335]"
    // }
  ];

  const navigationLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "work" },
    { name: "Experience", id: "experience" },
    { name: "Education", id: "education" },
    { name: "Contact", id: "contact" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 border-t border-white/10 pt-12 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Logo/Name */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
                Piyush
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec]">
                Shakya
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
              Full Stack Developer & Problem Solver
            </p>
          </motion.div>

          {/* Navigation - No scroll functionality */}
          <motion.nav variants={itemVariants} className="mb-8">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              {navigationLinks.map((item, index) => (
                <li key={index}>
                  <span className="text-gray-300 text-sm sm:text-base font-medium px-2 py-1 rounded-lg">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-xl sm:text-2xl text-gray-400 ${social.color} transition-all duration-300 p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-white/10 hover:border-[#8245ec]/30`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent mx-auto"></div>
          </motion.div>

          {/* Copyright and Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Piyush Shakya. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-500 text-xs sm:text-sm">
              <p>Built with <FaHeart className="inline text-red-500 mx-1" /> using React & Tailwind CSS</p>
              <span className="hidden sm:block">•</span>
              <p>Designed for performance and accessibility</p>
            </div>
          </motion.div>

          {/* Quick Contact */}
          {/* <motion.div variants={itemVariants} className="mt-8">
            <a
              href="mailto:shakyapiyush610@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10 text-gray-300 hover:text-white hover:border-[#8245ec]/50 transition-all group"
            >
              <FiMail className="text-[#8245ec] group-hover:scale-110 transition-transform" />
              <span>shakyapiyush610@gmail.com</span>
            </a>
          </motion.div> */}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 text-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-500">
            <div>
              <p className="font-medium text-gray-400 mb-2">Location</p>
              <p>Based in Punjab, India</p>
            </div>
            <div>
              <p className="font-medium text-gray-400 mb-2">Availability</p>
              <p>Open to new opportunities</p>
            </div>
            <div>
              <p className="font-medium text-gray-400 mb-2">Commitment</p>
              <p>Passionate about clean code</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
    </footer>
  );
};

export default Footer;




// import React from "react";
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

// const Footer = () => {
//   // Smooth scroll function
//   const handleScroll = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <footer className="text-white py-8 px-[12vw] md:px-[7vw] lg:px-[20vw]">
//       <div className="container mx-auto text-center">
//         {/* Name / Logo */}
//         <h2 className="text-xl font-semibold text-purple-500">Piyush Shakya</h2>

//         {/* Navigation Links - Responsive */}
//         <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4">
//           {[
//             { name: "About", id: "about" },
//             { name: "Skills", id: "skills" },
//             { name: "Experience", id: "experience" },
//             { name: "Projects", id: "work" },
//             { name: "Education", id: "education" },
//             { name: "Contact", id: "contact" },
//           ].map((item, index) => (
//             <button
//               key={index}
//               onClick={() => handleScroll(item.id)}
//               className="hover:text-purple-500 text-sm sm:text-base my-1"
//             >
//               {item.name}
//             </button>
//           ))}
//         </nav>

//         {/* Social Media Icons - Responsive */}
//         <div className="flex flex-wrap justify-center space-x-4 mt-6">
//           {[
//             { icon: <FaFacebook />, link: "https://www.facebook.com/piyush.shakya.7311" },
//             { icon: <FaTwitter />, link: "https://x.com/shakya_piyush" },
//             { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/piyush7467" },
//             { icon: <FaInstagram />, link: "https://www.instagram.com/p.iyush.522/" },
//             // { icon: <FaYoutube />, link: "https://www.youtube.com/codingmasteryt" },
            
//           ].map((item, index) => (
//             <a
//               key={index}
//               href={item.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xl hover:text-purple-500 transition-transform transform hover:scale-110"
//             >
//               {item.icon}
//             </a>
//           ))}
//         </div>

//         {/* Copyright Text */}
//         <p className="text-sm text-gray-400 mt-6">
//           © 2025 Piyush Shakya. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;