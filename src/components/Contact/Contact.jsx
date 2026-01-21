import React, { useRef, useState } from "react";
import { FiMail, FiUser, FiEdit3, FiMessageSquare } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form=useRef();
  const [isSent, setIsSent]=useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_3kv6xs2",  // Replace with your EmailJS Service ID
        "template_dbxyewe",  // Replace with your EmailJS Template ID
        form.current,
        "KJQ_6SYfWEUGKoEJT"  // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset(); // Reset form fields after sending
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
          });
          setLoading(false);
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
            theme: "dark",

          });
        }
      );
    
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient clip-path-custom-2"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">CONTACT</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          I’d love to hear from you—reach out for any opportunities or questions!
        </p>
      </div>
      <ToastContainer/>

      {/* Contact Form */}
      <div className="mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-2xl shadow-xl border border-gray-700 hover:shadow-purple-500/20 transition">
        <h3 className="text-xl font-semibold text-white text-center">
          Connect With Me <span className="ml-1"></span>
        </h3>

        <form ref={form} onSubmit={sendEmail}className="mt-6 flex flex-col space-y-4">
          {/* Email */}
          <label htmlFor="email" className="sr-only">Your Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              id="email"
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full pl-10 p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Name */}
          <label htmlFor="name" className="sr-only">Your Name</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              id="name"
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full pl-10 p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Subject */}
          <label htmlFor="subject" className="sr-only">Subject</label>
          <div className="relative">
            <FiEdit3 className="absolute left-3 top-3 text-gray-400" />
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full pl-10 p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Message */}
          <label htmlFor="message" className="sr-only">Message</label>
          <div className="relative">
            <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows="4"
              required
              className="w-full pl-10 p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
