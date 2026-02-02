import React, { useRef, useState } from "react";
import { FiMail, FiUser, FiEdit3, FiMessageSquare, FiSend, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
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

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <ToastContainer />
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-purple-600/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-pink-600/5 rounded-full blur-xl"></div>
      </div>

      {/* Form Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#8245ec]/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl"></div>

        {/* Form Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#8245ec]/20 to-blue-500/20 backdrop-blur-sm border border-[#8245ec]/30 mb-4">
            <FiSend className="w-4 h-4 text-[#8245ec]" />
            <span className="text-sm font-medium text-gray-300">Get In Touch</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Send a Message
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#8245ec] to-transparent"></div>
        </motion.div>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          {/* Name & Email Row */}
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
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
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 focus:border-transparent transition-all hover:border-gray-600"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
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
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 focus:border-transparent transition-all hover:border-gray-600"
                />
              </div>
            </motion.div>
          </div>

          {/* Subject */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
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
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 focus:border-transparent transition-all hover:border-gray-600"
              />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
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
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50 focus:border-transparent transition-all hover:border-gray-600 resize-none"
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
            
            <p className="text-xs text-gray-500 text-center mt-4">
              I'll respond within 24 hours. All information is kept confidential.
            </p>
          </motion.div>
        </form>
      </motion.div>
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
