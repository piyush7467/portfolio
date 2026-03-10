import React, { useRef, useState, useEffect } from "react";
import { 
  FiMail, FiUser, FiEdit3, FiMessageSquare, FiSend, FiCheck,
  FiMapPin, FiPhone, FiClock, FiGithub, FiLinkedin, FiTwitter,
  FiArrowLeft, FiArrowRight
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();
  const scrollContainerRef = useRef(null);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeSection, setActiveSection] = useState(0); // 0 for form, 1 for info
  const [formData, setFormData] = useState({
    user_email: '',
    user_name: '',
    subject: '',
    message: ''
  });

  // Handle scroll arrows visibility
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    if (!formData.user_email || !formData.user_name || !formData.message) {
      toast.error("Please fill in all required fields", {
        position: "top-right",
        theme: "dark"
      });
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        "service_3kv6xs2",
        "template_dbxyewe",
        form.current,
        "KJQ_6SYfWEUGKoEJT"
      )
      .then(
        () => {
          setIsSent(true);
          setFormData({
            user_email: '',
            user_name: '',
            subject: '',
            message: ''
          });
          
          toast.success("Message sent successfully! 🎉", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
          });
          setLoading(false);
          
          setTimeout(() => setIsSent(false), 5000);
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
          });
          setLoading(false);
        }
      );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Contact information data
  const contactInfo = [
    {
      icon: <FiMail className="w-5 h-5" />,
      label: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com",
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: <FiPhone className="w-5 h-5" />,
      label: "Phone",
      value: "+1 (234) 567-890",
      link: "tel:+1234567890",
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-500/10"
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      label: "Location",
      value: "San Francisco, CA",
      color: "from-red-500 to-pink-500",
      bg: "bg-red-500/10"
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      label: "Working Hours",
      value: "Mon-Fri, 9AM-6PM PST",
      color: "from-purple-500 to-indigo-500",
      bg: "bg-purple-500/10"
    }
  ];

  const socialLinks = [
    { icon: <FiGithub className="w-5 h-5" />, href: "https://github.com", label: "GitHub", color: "hover:bg-gray-700" },
    { icon: <FiLinkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-blue-600" },
    { icon: <FiTwitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter", color: "hover:bg-sky-500" }
  ];

  return (
    <div id="contact" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToastContainer />
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-purple-600/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-pink-600/5 rounded-full blur-xl"></div>
      </div>

      {/* Section Header */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] to-purple-400">Touch</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? Let's work together to create something amazing.
        </p>
      </motion.div>

      {/* Mobile View Toggle (for small screens) */}
      <div className="flex sm:hidden justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveSection(0)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeSection === 0 
              ? 'bg-gradient-to-r from-[#8245ec] to-purple-500 text-white' 
              : 'bg-gray-800 text-gray-400'
          }`}
        >
          Contact Form
        </button>
        <button
          onClick={() => setActiveSection(1)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeSection === 1 
              ? 'bg-gradient-to-r from-[#8245ec] to-purple-500 text-white' 
              : 'bg-gray-800 text-gray-400'
          }`}
        >
          Information
        </button>
      </div>

      {/* Main Container with Horizontal Scroll for Desktop */}
      <div className="relative">
        {/* Scroll Arrows - Hidden on mobile, shown on sm and up */}
        <div className="hidden sm:block">
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#8245ec] transition-all shadow-lg"
              >
                <FiArrowLeft />
              </motion.button>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#8245ec] transition-all shadow-lg"
              >
                <FiArrowRight />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 sm:pb-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Contact Form Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`flex-shrink-0 w-full sm:w-[calc(100%-2rem)] md:w-[600px] snap-start ${
              activeSection === 0 ? 'block' : 'hidden sm:block'
            }`}
          >
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden">
              {/* Form Header */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#8245ec]/20 to-blue-500/20 backdrop-blur-sm border border-[#8245ec]/30 mb-4">
                  <FiSend className="w-4 h-4 text-[#8245ec]" />
                  <span className="text-sm font-medium text-gray-300">Send Message</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Let's Start a Conversation
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#8245ec] to-transparent"></div>
              </motion.div>

              {/* Form */}
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <div className="relative group">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8245ec]" />
                      <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleInputChange}
                        placeholder="Your Name *"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 text-sm"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="relative group">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8245ec]" />
                      <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleInputChange}
                        placeholder="Your Email *"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 text-sm"
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <div className="relative group">
                    <FiEdit3 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8245ec]" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 text-sm"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="relative group">
                    <FiMessageSquare className="absolute left-3 top-3 text-gray-500 group-focus-within:text-[#8245ec]" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message *"
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 text-sm resize-none"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={loading || isSent}
                    className={`w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 text-sm ${
                      isSent 
                        ? 'bg-gradient-to-r from-emerald-600 to-green-500' 
                        : loading
                        ? 'bg-gradient-to-r from-[#8245ec]/70 to-purple-500/70'
                        : 'bg-gradient-to-r from-[#8245ec] to-purple-500 hover:shadow-lg hover:shadow-[#8245ec]/20'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : isSent ? (
                      <>
                        <FiCheck />
                        <span>Sent!</span>
                      </>
                    ) : (
                      <>
                        <FiSend />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Information Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`flex-shrink-0 w-full sm:w-[400px] snap-start ${
              activeSection === 1 ? 'block' : 'hidden sm:block'
            }`}
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 h-full">
              <motion.div variants={itemVariants} className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Contact Information
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#8245ec] to-transparent"></div>
              </motion.div>

              {/* Contact Info Grid */}
              <div className="space-y-4 mb-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                  >
                    {info.link ? (
                      <a
                        href={info.link}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-[#8245ec]/30 transition-all"
                      >
                        <div className={`p-2 rounded-lg ${info.bg} group-hover:scale-110 transition-transform`}>
                          <div className={`text-transparent bg-clip-text bg-gradient-to-r ${info.color}`}>
                            {info.icon}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{info.label}</p>
                          <p className="text-sm text-white">{info.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
                        <div className={`p-2 rounded-lg ${info.bg}`}>
                          <div className={`text-transparent bg-clip-text bg-gradient-to-r ${info.color}`}>
                            {info.icon}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{info.label}</p>
                          <p className="text-sm text-white">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Connect on Social Media</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl bg-gray-800/30 border border-gray-700/50 text-gray-400 ${social.color} transition-all hover:scale-110 hover:text-white`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Response Time Badge */}
              <motion.div
                variants={itemVariants}
                className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#8245ec]/10 to-purple-500/10 border border-[#8245ec]/20"
              >
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <FiClock className="text-[#8245ec]" />
                  <span>Typically responds within 24 hours</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator Dots - Visible on mobile */}
        <div className="flex sm:hidden justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveSection(0)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSection === 0 ? 'w-6 bg-[#8245ec]' : 'bg-gray-600'
            }`}
          />
          <button
            onClick={() => setActiveSection(1)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSection === 1 ? 'w-6 bg-[#8245ec]' : 'bg-gray-600'
            }`}
          />
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;


// import React, { useRef, useState } from "react";
// import { FiMail, FiUser, FiEdit3, FiMessageSquare } from "react-icons/fi";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import emailjs from '@emailjs/browser';

// const Contact = () => {
//   const form=useRef();
//   const [isSent, setIsSent]=useState(false);
//   const [loading, setLoading] = useState(false);

//   const sendEmail = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     emailjs
//       .sendForm(
//         "service_3kv6xs2",  // Replace with your EmailJS Service ID
//         "template_dbxyewe",  // Replace with your EmailJS Template ID
//         form.current,
//         "KJQ_6SYfWEUGKoEJT"  // Replace with your EmailJS Public Key
//       )
//       .then(
//         () => {
//           setIsSent(true);
//           form.current.reset(); // Reset form fields after sending
//           toast.success("Message sent successfully! ✅", {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "dark"
//           });
//           setLoading(false);
//         },
//         (error) => {
//           console.error("Error sending message:", error);
//           toast.error("Failed to send message. Please try again.", {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "dark",

//           });
//         }
//       );
    
//   };

//   return (
//     <section
//       id="contact"
//       className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient clip-path-custom-2"
//     >
//       {/* Section Title */}
//       <div className="text-center mb-16">
//         <h2 className="text-4xl font-bold text-white">CONTACT</h2>
//         <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
//         <p className="text-gray-400 mt-4 text-lg font-semibold">
//           I’d love to hear from you—reach out for any opportunities or questions!
//         </p>
//       </div>
//       <ToastContainer/>

//       {/* Contact Form */}
//       <div className="mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-2xl shadow-xl border border-gray-700 hover:shadow-purple-500/20 transition">
//         <h3 className="text-xl font-semibold text-white text-center">
//           Connect With Me <span className="ml-1"></span>
//         </h3>

//         <form ref={form} onSubmit={sendEmail}className="mt-6 flex flex-col space-y-4">
//           {/* Email */}
//           <label htmlFor="email" className="sr-only">Your Email</label>
//           <div className="relative">
//             <FiMail className="absolute left-3 top-3 text-gray-400" />
//             <input
//               id="email"
//               type="email"
//               name="user_email"
//               placeholder="Your Email"
//               required
//               className="w-full pl-10 p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition"
//             />
//           </div>

//           {/* Name */}
//           <label htmlFor="name" className="sr-only">Your Name</label>
//           <div className="relative">
//             <FiUser className="absolute left-3 top-3 text-gray-400" />
//             <input
//               id="name"
//               type="text"
//               name="user_name"
//               placeholder="Your Name"
//               required
//               className="w-full pl-10 p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition"
//             />
//           </div>

//           {/* Subject */}
//           <label htmlFor="subject" className="sr-only">Subject</label>
//           <div className="relative">
//             <FiEdit3 className="absolute left-3 top-3 text-gray-400" />
//             <input
//               id="subject"
//               type="text"
//               name="subject"
//               placeholder="Subject"
//               required
//               className="w-full pl-10 p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition"
//             />
//           </div>

//           {/* Message */}
//           <label htmlFor="message" className="sr-only">Message</label>
//           <div className="relative">
//             <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
//             <textarea
//               id="message"
//               name="message"
//               placeholder="Message"
//               rows="4"
//               required
//               className="w-full pl-10 p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition"
//             />
//           </div>

//           {/* Send Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send"}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Contact;
