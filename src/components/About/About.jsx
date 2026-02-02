import React, { useEffect, useRef } from 'react'
import { Typewriter } from "react-simple-typewriter";
import Tilt from 'react-parallax-tilt';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowDown, Zap, ChevronDown } from 'lucide-react';
import profileImage from '../../assets/piyush.jpg'

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

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
        staggerChildren: 0.15,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const scrollToNext = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id='about'
      ref={ref}
      className='relative py-1 sm:py-1 md:py-1 lg:py-2 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-40 min-h-screen flex items-center justify-center bg-gray-950 font-sans overflow-hidden'
    >/
      {/* Advanced Background - Responsive */}
      <div className="absolute inset-0">
        {/* Mesh Gradient - Responsive */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 lg:to-purple-950/30"></div>
        
        {/* Geometric Pattern - Responsive */}
        <div className="absolute inset-0 opacity-[0.015] lg:opacity-[0.02]">
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
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-purple-600/3 to-blue-600/3 lg:from-purple-600/5 lg:to-blue-600/5 rounded-full blur-xl lg:blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-600/3 to-purple-600/3 lg:from-blue-600/5 lg:to-purple-600/5 rounded-full blur-xl lg:blur-3xl"
        />
        
        {/* Scan Lines - Responsive */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] lg:bg-[size:100px_100px]"></div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className='relative z-20 max-w-7xl mx-auto w-full px-2 sm:px-4'
      >
        {/* Mobile Layout (Badge → Image → Name → About) */}
        <div className="lg:hidden flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-12 ">
          {/* 1. Badge - Mobile Top */}
          <motion.div
            variants={itemVariants}
            className="inline-flex mt-2 md:mt-0  items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 md:pb-0 pb-5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center gap-1 sm:gap-2 ">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-mono text-gray-300 ">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* 2. Image Section - Mobile Second */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md"
          >
            {/* Outer Glow - Responsive */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
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
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
              gyroscope={true}
            >
              <div className="relative w-full pb-[100%]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
                
                <div className="absolute inset-3 sm:inset-4 md:inset-5 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src={profileImage}
                    alt="Piyush Shakya"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: 'center 25%',
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-gray-950/30"></div>
                </div>
              </div>

              {/* Bottom Info Bar - Mobile */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4 md:p-6 backdrop-blur-sm">
                <div className="flex items-center justify-center">
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

          {/* 3. Name - Mobile Third */}
          <motion.div variants={itemVariants} className="text-center w-full">
            <h2 className="text-5xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 md:mt-0 mt-5 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
                Piyush
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-400 to-blue-400">
                Shakya
              </span>
            </h2>
          </motion.div>

          {/* 4. Role - Mobile Fourth */}
          <motion.div variants={itemVariants} className="relative w-full">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-purple-500/30 to-transparent"></div>
              <span className="text-xl sm:text-2xl md:text-3xl font-medium text-white text-center">
                <Typewriter
                  words={[
                    "Full Stack Developer",
                    "MERN Stack Developer",
                    "JavaScript Developer",
                    "Software Engineer"
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
              <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-purple-500/30 to-transparent"></div>
            </div>
          </motion.div>

          {/* 5. Description - Mobile Fifth */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 w-full">
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed font-light text-center px-2 sm:px-0">
              I am a full-stack developer with over 1 year of experience in
              building scalable web applications. Skilled in both front-end and
              back-end development, I specialize in the MERN stack and other
              modern technologies to create seamless user experiences and
              efficient solutions.
            </p>
          </motion.div>

          {/* 6. CTA Buttons - Mobile Sixth */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:mb-0 mb-16">
            <a
              href="https://drive.google.com/file/d/1E3ieL3g0VFqNdTk6WvlFjkNlrgHgjS3E/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className=" group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-4 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500 transition-all duration-300 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative text-white font-semibold text-sm sm:text-base">View Resume</span>
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 relative" />
            </a>

            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 relative" />
              <span className="relative text-sm sm:text-base">Start a Project</span>
            </a>
          </motion.div>
        </div>

        {/* Desktop Layout (Keep exactly as you had it) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column */}
          <div className="space-y-12">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-mono text-gray-300">Available for opportunities</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                  Piyush
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-400 to-blue-400">
                  Shakya
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-purple-500 rounded-full"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                <span className="text-3xl md:text-4xl font-medium text-white">
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
                    typeSpeed={90}
                    deleteSpeed={60}
                    delaySpeed={2000}
                    cursorColor="#8245ec"
                  />
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-purple-500/50 to-transparent"></div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                With over a year of professional experience, I specialize in architecting and implementing 
                high-performance web applications using modern technologies. My approach combines technical 
                excellence with strategic thinking to deliver scalable solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                Passionate about clean code, system design, and performance optimization. I thrive in 
                challenging environments where I can contribute to complex projects and mentor team members.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-8">
              <motion.a
                href="https://drive.google.com/file/d/1E3ieL3g0VFqNdTk6WvlFjkNlrgHgjS3E/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative text-white font-semibold">View Resume</span>
                <ArrowDown className="w-5 h-5 text-purple-500 relative" />
              </motion.a>

              <motion.a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Zap className="w-5 h-5 relative" />
                <span className="relative">Start a Project</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Image Section */}
          <div className="relative">
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              {/* Outer Glow */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-[3rem]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, #8245ec, #00b4d8, #8245ec, transparent)',
                  padding: '2px',
                }}
              >
                <div className="w-full h-full rounded-[3rem] bg-gray-950"></div>
              </motion.div>

              {/* Main Profile Container */}
              <Tilt
                className="relative rounded-[3rem] overflow-hidden"
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={2000}
                scale={1.02}
                transitionSpeed={2000}
                gyroscope={true}
              >
                {/* Container for perfect circle within rounded rectangle */}
                <div className="relative w-full pb-[100%]">
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
                  
                  {/* Image Container with Circle Mask */}
                  <div className="absolute inset-6 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-gray-950/30"></div>
                    
                    {/* Floating Elements - Desktop Only */}
                    {/* <motion.div
                      variants={floatVariants}
                      animate="float"
                      className="absolute top-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl shadow-2xl z-10"
                    >
                      <div className="text-white font-bold text-base">1+ Years</div>
                      <div className="text-white/80 text-xs">Experience</div>
                    </motion.div> */}

                    {/* <motion.div
                      variants={floatVariants}
                      animate="float"
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-6 left-6 bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-xl shadow-2xl border border-gray-700 z-10"
                    >
                      <div className="text-white font-bold text-base">MERN Stack</div>
                      <div className="text-gray-400 text-xs">Specialized</div>
                    </motion.div> */}
                  </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Status</div>
                      <div className="flex items-center gap-2 text-green-500 font-medium">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Available
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Gradient - Responsive */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-28 lg:h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>

      {/* Stats Bar - Responsive */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-0  sm:bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2"
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
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={scrollToNext}
        className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer lg:hidden"
      >
        <div className="flex flex-col items-center gap-1">
          <ChevronDown className="w-5 h-5 text-[#8245ec]" />
          <span className="text-xs text-gray-500 tracking-widest">EXPLORE</span>
        </div>
      </motion.div>
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
