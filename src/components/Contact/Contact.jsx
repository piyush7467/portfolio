import React, { useRef, useState } from "react";
import { FiMail, FiUser, FiEdit3, FiMessageSquare, FiSend, FiCheck, FiMapPin, FiPhone, FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_email: '',
    user_name: '',
    subject: '',
    message: ''
  });

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

  const contactInfo = [
    {
      icon: <FiMail />,
      title: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com"
    },
    {
      icon: <FiPhone />,
      title: "Phone",
      value: "+1 (234) 567-8900",
      link: "tel:+12345678900"
    },
    {
      icon: <FiMapPin />,
      title: "Location",
      value: "San Francisco, CA",
      link: "#"
    },
    {
      icon: <FiGlobe />,
      title: "Timezone",
      value: "PST (UTC-8)",
      link: "#"
    }
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
    <section
      id="contact"
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-600/10 rounded-full blur-xl md:blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-pink-600/10 rounded-full blur-xl md:blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-blue-600/10 rounded-full blur-lg md:blur-2xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: 'clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)'
        }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#8245ec]/20 to-blue-500/20 backdrop-blur-sm border border-[#8245ec]/30 mb-4 sm:mb-6">
            <FiSend className="w-3 h-3 sm:w-4 sm:h-4 text-[#8245ec]" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">Let's Connect</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
              Get In
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] via-purple-400 to-[#8245ec]">
              Touch
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
            <div className="hidden sm:block h-px w-8 md:w-12 lg:w-20 bg-gradient-to-r from-transparent via-[#8245ec] to-transparent"></div>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
            <div className="hidden sm:block h-px w-8 md:w-12 lg:w-20 bg-gradient-to-l from-transparent via-[#8245ec] to-transparent"></div>
          </div>
        </motion.div>

        <ToastContainer />

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group block"
              >
                <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 hover:border-[#8245ec]/30 p-5 sm:p-6 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8245ec]/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="text-[#8245ec] text-lg sm:text-xl">
                          {info.icon}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-400 mb-1">{info.title}</h4>
                      <p className="text-base sm:text-lg font-semibold text-white truncate">
                        {info.value}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 rounded-full bg-[#8245ec] animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Availability Note */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-2">Response Time</h4>
                  <p className="text-sm text-gray-400">
                    I typically respond within 24 hours. For urgent matters, please mention "URGENT" in your subject line.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm md:backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/10 p-6 sm:p-8 overflow-hidden">
              {/* Form Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#8245ec]/5 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl"></div>

              <motion.h3 
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8"
              >
                Send a Message
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#8245ec] to-transparent mt-3"></div>
              </motion.h3>

              <form ref={form} onSubmit={sendEmail} className="space-y-5 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Name */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Your Name <span className="text-[#8245ec]">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <FiUser className="text-gray-500 group-focus-within:text-[#8245ec] transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 focus:border-transparent transition-all"
                      />
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Your Email <span className="text-[#8245ec]">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <FiMail className="text-gray-500 group-focus-within:text-[#8245ec] transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 focus:border-transparent transition-all"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Subject */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <FiEdit3 className="text-gray-500 group-focus-within:text-[#8245ec] transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project Inquiry"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 focus:border-transparent transition-all"
                    />
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message <span className="text-[#8245ec]">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-4">
                      <FiMessageSquare className="text-gray-500 group-focus-within:text-[#8245ec] transition-colors" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, timeline, and requirements..."
                      rows="5"
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 focus:border-transparent transition-all resize-none"
                    />
                    <div className="absolute bottom-3 right-3">
                      <span className={`text-xs ${formData.message.length > 450 ? 'text-red-400' : 'text-gray-500'}`}>
                        {formData.message.length}/500
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={loading || isSent}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                      isSent 
                        ? 'bg-gradient-to-r from-emerald-600 to-green-500 cursor-default' 
                        : loading
                        ? 'bg-gradient-to-r from-[#8245ec]/70 to-purple-500/70'
                        : 'bg-gradient-to-r from-[#8245ec] to-purple-500 hover:shadow-lg hover:shadow-[#8245ec]/20'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : isSent ? (
                      <>
                        <FiCheck className="text-xl" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <FiSend />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Form Note */}
                <motion.div variants={itemVariants}>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our privacy policy. I'll never share your information.
                  </p>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20"
        >
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-400 mb-6">
              Trusted by professionals and teams worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="opacity-50 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-10 sm:w-24 sm:h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-medium">LOGO {i}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;





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
