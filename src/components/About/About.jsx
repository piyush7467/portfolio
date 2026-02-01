import React, { useEffect, useRef, useState } from 'react'
import { Typewriter } from "react-simple-typewriter";
import Tilt from 'react-parallax-tilt';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowDown, Zap, ChevronDown } from 'lucide-react';
import profileImage from '../../assets/piyush.jpg'

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const scrollToSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id='about'
      ref={ref}
      className='relative pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-40 min-h-screen flex items-center justify-center bg-gray-950 font-sans overflow-hidden'
    >
      {/* Advanced Background - Responsive */}
      <div className="absolute inset-0">
        {/* Mesh Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 md:to-purple-950/30"></div>
        
        {/* Geometric Pattern - Simplified for mobile */}
        <div className="absolute inset-0 opacity-[0.015] md:opacity-[0.02]">
          <svg className="w-full h-full">
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Orbs - Responsive */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-r from-purple-600/3 to-blue-600/3 md:from-purple-600/5 md:to-blue-600/5 rounded-full blur-xl md:blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-600/3 to-purple-600/3 md:from-blue-600/5 md:to-purple-600/5 rounded-full blur-xl md:blur-3xl"
        />
        
        {/* Scan Lines - Simplified for mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] lg:bg-[size:100px_100px]"></div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className='relative z-20 max-w-7xl mx-auto w-full px-2'
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20">
          
          {/* Left Column - Responsive */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 lg:space-y-10 order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs md:text-sm font-mono text-gray-300">
                  Available for opportunities
                </span>
              </div>
            </motion.div>

            {/* Title - Responsive */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 md:mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
                  Piyush
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-400 to-blue-400">
                  Shakya
                </span>
              </h1>
            </motion.div>

            {/* Role - Responsive */}
            <motion.div variants={itemVariants} className="relative">
              {!isMobile && (
                <div className="absolute -left-6 md:-left-8 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="w-3 h-3 md:w-4 md:h-4 border-2 border-purple-500 rounded-full"
                  />
                </div>
              )}
              
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 md:from-purple-500/50 to-transparent"></div>
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white text-center">
                  <Typewriter
                    words={[
                      "Full Stack Engineer",
                      "System Architect",
                      "Technical Lead",
                      "Software Developer",
                      "Solutions Architect"
                    ]}
                    loop={0}
                    cursor
                    cursorStyle='▌'
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1800}
                    cursorColor="#8245ec"
                  />
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-purple-500/30 md:from-purple-500/50 to-transparent"></div>
              </div>
            </motion.div>

            {/* Description - Responsive */}
            <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed md:leading-relaxed font-light">
                With over a year of professional experience, I specialize in architecting and implementing 
                high-performance web applications using modern technologies. My approach combines technical 
                excellence with strategic thinking to deliver scalable solutions.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed md:leading-relaxed font-light">
                Passionate about clean code, system design, and performance optimization. I thrive in 
                challenging environments where I can contribute to complex projects and mentor team members.
              </p>
            </motion.div>

            {/* Tech Highlights - Mobile Only */}
            {isMobile && (
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-2 mt-4"
              >
                {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800/50 text-gray-300 hover:bg-[#8245ec]/20 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            )}

            {/* CTA Buttons - Responsive */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 lg:pt-8">
              <motion.a
                href="https://drive.google.com/file/d/1E3ieL3g0VFqNdTk6WvlFjkNlrgHgjS3E/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 md:gap-3 px-5 py-3 md:px-6 md:py-4 lg:px-8 lg:py-4 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative text-white font-semibold text-sm md:text-base">View Resume</span>
                <ArrowDown className="w-4 h-4 md:w-5 md:h-5 text-purple-500 relative" />
              </motion.a>

              <motion.a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 md:gap-3 px-5 py-3 md:px-6 md:py-4 lg:px-8 lg:py-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Zap className="w-4 h-4 md:w-5 md:h-5 relative" />
                <span className="relative text-sm md:text-base">Start a Project</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Image Section - Responsive */}
          <div className="w-full lg:w-1/2 relative order-1 lg:order-2">
            <motion.div
              variants={itemVariants}
              className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full"
            >
              {/* Outer Glow - Responsive */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, #8245ec, #00b4d8, #8245ec, transparent)',
                  padding: '1.5px',
                }}
              >
                <div className="w-full h-full rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] bg-gray-950"></div>
              </motion.div>

              {/* Main Profile Container */}
              <Tilt
                className="relative rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden"
                tiltMaxAngleX={isMobile ? 5 : 10}
                tiltMaxAngleY={isMobile ? 5 : 10}
                perspective={isMobile ? 1000 : 2000}
                scale={isMobile ? 1.01 : 1.02}
                transitionSpeed={isMobile ? 1500 : 2000}
                gyroscope={true}
                tiltEnable={!isMobile} // Disable tilt on mobile for better performance
              >
                {/* Container for perfect circle within rounded rectangle */}
                <div className="relative w-full pb-[100%]"> {/* Creates perfect square aspect ratio */}
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 md:from-purple-500/10 md:via-transparent md:to-blue-500/10"></div>
                  
                  {/* Image Container with Circle Mask */}
                  <div className="absolute inset-3 sm:inset-4 md:inset-5 lg:inset-6 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    {/* Image with proper object fit */}
                    <img
                      src={profileImage}
                      alt="Piyush Shakya"
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: 'center 25%',
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-gray-950/20 md:from-gray-950/60 md:via-transparent md:to-gray-950/30"></div>
                    
                    {/* Floating Elements - Only on larger screens */}
                    {!isMobile && (
                      <>
                        <motion.div
                          variants={floatVariants}
                          animate="float"
                          className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 bg-gradient-to-r from-purple-600 to-blue-600 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-2xl z-10 border border-purple-500/30"
                        >
                          <div className="text-white font-bold text-xs sm:text-sm md:text-base">1+ Years</div>
                          <div className="text-white/80 text-xs">Experience</div>
                        </motion.div>

                        <motion.div
                          variants={floatVariants}
                          animate="float"
                          transition={{ delay: 0.5 }}
                          className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 bg-gradient-to-r from-gray-800 to-gray-900 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-2xl border border-gray-700 z-10"
                        >
                          <div className="text-white font-bold text-xs sm:text-sm md:text-base">MERN Stack</div>
                          <div className="text-gray-400 text-xs">Specialized</div>
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom Info Bar - Responsive */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4 md:p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-end">
                    <div className="text-right">
                      <div className="text-xs sm:text-sm text-gray-400">Status</div>
                      <div className="flex items-center gap-1 sm:gap-2 text-green-500 font-medium text-sm sm:text-base">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Available
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            {/* Tech Highlights - Desktop Only */}
            {!isMobile && (
              <motion.div 
                variants={itemVariants}
                className="hidden lg:flex flex-wrap justify-center gap-3 mt-6"
              >
                {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800/50 text-gray-300 hover:bg-[#8245ec]/20 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bottom Gradient - Responsive */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>

      {/* Stats Bar - Responsive */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-500">
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-2xl font-bold text-white">10+</div>
            <div className="text-gray-400">Projects</div>
          </div>
          <div className="h-6 sm:h-8 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-2xl font-bold text-white">100%</div>
            <div className="text-gray-400">Satisfaction</div>
          </div>
          <div className="h-6 sm:h-8 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-2xl font-bold text-white">∞</div>
            <div className="text-gray-400">Learning</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Mobile Only */}
      {isMobile && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToSkills}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <div className="flex flex-col items-center gap-1">
            <ChevronDown className="w-5 h-5 text-[#8245ec]" />
            <span className="text-xs text-gray-500 tracking-widest">SCROLL</span>
          </div>
        </motion.div>
      )}
    </section>
  )
}

export default About




















// import React from 'react'
// import { Typewriter } from "react-simple-typewriter";
// import Tilt from 'react-parallax-tilt';
// import profileImage from '../../assets/piyush.jpg'
// const About = () => {
//   return (
//     <section
//       id='about'
//       className='py-4 px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans mt-16 md:mt-24 lg:mt-32'
//     >
//       <div className='flex flex-col-reverse md:flex-row justify-between items-center'>
//         {/* left */}
//         <div className='md:w-1/2 text-center md:text-left mt-8 md:mt-0'>
//           {/* Greeting */}
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
//             Hi, I am
//           </h1>

//           {/* Name */}
//           <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
//             Piyush Shakya
//           </h2>

//           {/* skill with typing effect */}
//           <h3 className='text-xl sm:text-2xl md:text-3xl font-semibold text-[#8245ec] leading-tight mb-4'>
//             <span className='text-white'>I am a </span>
//             <span className='text-[#8245ec]'>
//               <Typewriter
//                 words={[
//                   "Full Stack Developer",
//                   "MERN Stack Developer",
//                   "JavaScript Developer",
//                 ]}
//                 loop={0} // 0 = infinite loop
//                 cursor
//                 cursorStyle='|'
//                 typeSpeed={80}
//                 deleteSpeed={50}
//                 delaySpeed={2000}
//               />
//             </span>
//           </h3>
//           {/* About Me Paragraph */}
//           <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
//             I am a full-stack developer with over 1 year of experience in
//             building scalable web applications. Skilled in both front-end and
//             back-end development, I specialize in the MERN stack and other
//             modern technologies to create seamless user experiences and
//             efficient solutions.
//           </p>
//            {/* Resume Button */}
//           <a
//             href="https://drive.google.com/file/d/1E3ieL3g0VFqNdTk6WvlFjkNlrgHgjS3E/view?usp=drive_link"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block text-white py-3 px-8 rounded-full mt-5 text-lg font-bold transition duration-300 transform hover:scale-105"
//             style={{
//               background: 'linear-gradient(90deg, #8245ec, #a855f7)',
//               boxShadow: '0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec',
//             }}
//           >
//             DOWNLOAD CV
//           </a>
//         </div>

//         {/* Right Side */}
//         <div className="md:w-1/2 flex justify-center md:justify-end md:ml-4">
//           <Tilt
//             className="w-48 h-48 sm:w-64 sm:h-64 md:w-[30rem] md:h-[30rem] border-4 border-purple-700 rounded-full"
//             tiltMaxAngleX={20}
//             tiltMaxAngleY={20}
//             perspective={1000}
//             scale={1.05}
//             transitionSpeed={1000}
//             gyroscope={true}
//           >
//             <img
//               src={profileImage}
//               alt="Piyush Shakya"
//               className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
//             />
//           </Tilt>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default About
