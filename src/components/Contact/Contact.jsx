import React, { useRef, useState } from "react";
import { FiMail, FiUser, FiEdit3, FiMessageSquare, FiSend, FiCheck } from "react-icons/fi";
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
    
    // Basic validation
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
          
          // Reset sent state after 5 seconds
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
      className="relative flex flex-col items-center justify-center py-24 px-[5vw] md:px-[7vw] lg:px-[15vw] font-sans bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Section Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Get In <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Touch</span>
        </h2>
        <div className="w-48 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Have a project in mind? Let's collaborate! I'm always open to discussing 
          new opportunities and creative ideas.
        </p>
      </motion.div>

      <ToastContainer />

      {/* Contact Form */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mt-8 w-full max-w-2xl"
      >
        <div className="relative backdrop-blur-sm bg-gray-900/70 border border-gray-700/50 rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          {/* Form header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 mb-4">
              <FiSend className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Send me a message
            </h3>
            <p className="text-gray-400 mt-2">
              I'll respond as soon as possible
            </p>
          </motion.div>

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name <span className="text-pink-500">*</span>
                </label>
                <div className="relative group">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    id="name"
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-400/50"
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email <span className="text-pink-500">*</span>
                </label>
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    id="email"
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-400/50"
                  />
                </div>
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div variants={itemVariants}>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <div className="relative group">
                <FiEdit3 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Project Inquiry"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-400/50"
                />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message <span className="text-pink-500">*</span>
              </label>
              <div className="relative group">
                <FiMessageSquare className="absolute left-4 top-4 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-400/50 resize-none"
                />
              </div>
            </motion.div>

            {/* Send Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading || isSent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                  isSent 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 cursor-default' 
                    : 'bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30'
                } ${loading || isSent ? 'opacity-90' : ''}`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : isSent ? (
                  <>
                    <FiCheck className="text-xl" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </motion.button>
              
              {/* Character count */}
              <div className="flex justify-between items-center mt-3 px-1">
                <span className="text-sm text-gray-400">
                  All fields marked with <span className="text-pink-500">*</span> are required
                </span>
                <span className={`text-sm ${formData.message.length > 400 ? 'text-red-400' : 'text-gray-400'}`}>
                  {formData.message.length}/500
                </span>
              </div>
            </motion.div>
          </form>

          {/* Additional contact info */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 pt-8 border-t border-gray-700/50"
          >
            <p className="text-center text-gray-400 text-sm">
              Prefer email? Reach me directly at{" "}
              <a 
                href="mailto:your.email@example.com" 
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                your.email@example.com
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative bottom element */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      ></motion.div>
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
