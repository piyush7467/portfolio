import React, { useState, useEffect } from "react";
import { certificates } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Calendar, 
  X, 
  ExternalLink, 
  Eye, 
  Download,
  ChevronRight,
  BadgeCheck,
  Sparkles,
  Clock,
  Link2,
  FileText,
  ZoomIn
} from "lucide-react";

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  const handleOpenModal = (certificate) => {
    setSelectedCertificate(certificate);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = 'auto';
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section
      id="certificates"
      className="relative py-24 px-4 sm:px-6 lg:px-8 xl:px-16 font-sans overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 mb-6"
          >
            <Award className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-300">Professional Credentials</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
              Certifications &
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500">
              Achievements
            </span>
          </h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Industry-recognized certifications validating expertise across cloud platforms,
            development, and emerging technologies
          </motion.p>

          {/* Decorative Line */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <BadgeCheck className="w-5 h-5 text-purple-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-purple-500 to-transparent"></div>
          </div>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredId(certificate.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => handleOpenModal(certificate)}
              className="group relative cursor-pointer"
            >
              {/* Card Glow Effect */}
              <motion.div 
                animate={{ 
                  opacity: hoveredId === certificate.id ? 0.3 : 0 
                }}
                className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur transition-opacity duration-300"
              ></motion.div>

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden h-full">
                {/* Image Container with Loading State */}
                <div className="relative h-56 overflow-hidden bg-gray-800">
                  {!imageLoaded[certificate.id] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    onLoad={() => handleImageLoad(certificate.id)}
                    className={`w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ${
                      imageLoaded[certificate.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                  {/* Hover Overlay */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === certificate.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-blue-600/40 backdrop-blur-[2px] flex items-center justify-center"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/90 backdrop-blur-sm border border-white/20">
                      <ZoomIn className="w-4 h-4 text-white" />
                      <span className="text-sm text-white font-medium">View Details</span>
                    </div>
                  </motion.div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium shadow-lg">
                    {certificate.category || "Professional"}
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/10">
                    <span className="text-xs text-gray-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(certificate.issueDate) || certificate.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title and Issuer */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
                      {certificate.title}
                    </h3>
                    <p className="text-purple-400 text-sm font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {certificate.issuer}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {certificate.description}
                  </p>

                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(certificate.skills || certificate.tags || []).slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                    {(certificate.skills || certificate.tags || []).length > 3 && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 border border-purple-500/20">
                        +{(certificate.skills || certificate.tags || []).length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Footer with Credential ID */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <BadgeCheck className="w-3 h-3" />
                      <span>ID: {certificate.credentialId?.slice(0, 8) || "••••••"}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: Award, label: "Total Certificates", value: certificates.length, color: "purple" },
            { icon: BadgeCheck, label: "Active Credentials", value: certificates.filter(c => c.expiryDate !== "No Expiry").length, color: "blue" },
            { icon: Calendar, label: "Years of Learning", value: "3+", color: "green" },
            { icon: FileText, label: "Skills Covered", value: [...new Set(certificates.flatMap(c => c.skills || c.tags || []))].length, color: "orange" }
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-white/10">
              <stat.icon className={`w-8 h-8 text-${stat.color}-500 mb-3`} />
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={handleModalClick}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-purple-600/20 hover:to-blue-600/20 transition-all duration-300 border border-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              <div className="p-6 md:p-8">
                {/* Certificate Image with Preview Button */}
                <div className="relative rounded-xl overflow-hidden mb-8 group">
                  <img
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    className="w-full h-auto max-h-[400px] object-contain bg-gray-800/50 rounded-xl"
                  />
                  
                  {/* Image Preview Overlay */}
                  <a
                    href={selectedCertificate.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white">
                      <Eye className="w-4 h-4" />
                      <span>Preview Full Image</span>
                    </div>
                  </a>
                </div>

                {/* Certificate Details */}
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedCertificate.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-purple-400 font-medium flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {selectedCertificate.issuer}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(selectedCertificate.issueDate) || selectedCertificate.date}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {selectedCertificate.description}
                  </p>

                  {/* Credential Info */}
                  {(selectedCertificate.credentialId || selectedCertificate.certificateLink) && (
                    <div className="p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Credential Information</h4>
                      <div className="space-y-2">
                        {selectedCertificate.credentialId && (
                          <div className="flex items-center gap-2 text-sm">
                            <BadgeCheck className="w-4 h-4 text-purple-500" />
                            <span className="text-gray-300">ID: {selectedCertificate.credentialId}</span>
                          </div>
                        )}
                        {selectedCertificate.expiryDate && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-300">
                              {selectedCertificate.expiryDate === "No Expiry" 
                                ? "No Expiration Date" 
                                : `Expires: ${formatDate(selectedCertificate.expiryDate)}`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Skills & Competencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedCertificate.skills || selectedCertificate.tags || []).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                    {/* Preview Button */}
                    <a
                      href={selectedCertificate.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-purple-600/20 hover:to-blue-600/20 transition-all duration-300 border border-white/10 group"
                    >
                      <Eye className="w-5 h-5 text-gray-400 group-hover:text-white" />
                      <span className="font-semibold text-gray-300 group-hover:text-white">
                        Preview Certificate
                      </span>
                    </a>

                    {/* Verify/View Certificate Button */}
                    {selectedCertificate.certificateLink && (
                      <a
                        href={selectedCertificate.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-600/30 transition-all duration-300 group"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="font-semibold">Verify Credential</span>
                      </a>
                    )}

                    {/* Download Button (optional) */}
                    {selectedCertificate.downloadLink && (
                      <a
                        href={selectedCertificate.downloadLink}
                        download
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-purple-600/20 hover:to-blue-600/20 transition-all duration-300 border border-white/10 group"
                      >
                        <Download className="w-5 h-5 text-gray-400 group-hover:text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;














// import React, { useState } from "react";
// import { certificates } from "../../constants";

// const Certificates = () => {
//     const [selectedCertificates, setSelectedCertificates] = useState(null);

//     const handleOpenModal = (certificate) => {
//         setSelectedCertificates(certificate);
//     };

//     const handleCloseModal = () => {
//         setSelectedCertificates(null);
//     };

//     return (
//         <section
//             id="certificates"
//             className="py-24 pb-28 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative bg-skills-gradient clip-path-custom"
//         >
//             {/* Section Title */}
//             <div className="text-center mb-16">
//                 <h2 className="text-4xl font-bold text-white">CERTIFICATES</h2>
//                 <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
//                 <p className="text-gray-400 mt-4 text-lg font-semibold">
//                     A showcase of the certificates I have obtained, highlighting my skills
//                     and experience in various technologies
//                 </p>
//             </div>

//             {/* Certificates Grid */}
//             <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                 {certificates.map((certificate) => (
//                     <div
//                         key={certificate.id}
//                         onClick={() => handleOpenModal(certificate)}
//                         className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 hover:-translate-y-2 transition-transform duration-300"
//                     >
//                         <div className="p-4">
//                             <img
//                                 src={certificate.image}
//                                 alt={certificate.title}
//                                 className="w-full h-auto max-h-[400px] object-cover rounded-xl"
//                             />
//                         </div>

//                         <div className="p-6">
//                             <h3 className="text-2xl font-bold text-white mb-1">
//                                 {certificate.title}
//                             </h3>

//                             <p className="text-sm text-gray-400 mb-3">
//                                 {certificate.issuer} • {certificate.date}
//                             </p>

//                             <p className="text-gray-500 mb-4 line-clamp-3">
//                                 {certificate.description}
//                             </p>

//                             <div className="mb-4">
//                                 {certificate.skills.map((skill, index) => (
//                                     <span
//                                         key={index}
//                                         className="inline-block bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1 mr-2 mb-2"
//                                     >
//                                         {skill}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Modal */}
//             {selectedCertificates && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
//                     <div className="bg-gray-900 rounded-xl shadow-2xl lg:w-full w-[90%] max-w-3xl overflow-hidden relative">

//                         {/* Close Button */}
//                         <div className="flex justify-end p-4">
//                             <button
//                                 onClick={handleCloseModal}
//                                 className="text-white text-3xl font-bold hover:text-purple-500"
//                             >
//                                 &times;
//                             </button>
//                         </div>

//                         <div className="flex flex-col">

//                             {/* Certificate Image */}
//                             <div className="w-full flex justify-center bg-gray-900 px-4">
//                                 <img
//                                     src={selectedCertificates.image}
//                                     alt={selectedCertificates.title}
//                                     className="lg:w-full w-[95%] object-contain rounded-xl shadow-2xl"
//                                 />
//                             </div>

//                             {/* Details */}
//                             <div className="lg:p-8 p-6">
//                                 <h3 className="lg:text-3xl font-bold text-white mb-2">
//                                     {selectedCertificates.title}
//                                 </h3>

//                                 <p className="text-sm text-gray-400 mb-4">
//                                     {selectedCertificates.issuer} • {selectedCertificates.date}
//                                 </p>

//                                 <p className="text-gray-400 mb-6">
//                                     {selectedCertificates.description}
//                                 </p>

//                                 <div className="flex flex-wrap gap-2 mb-6">
//                                     {selectedCertificates.skills.map((skill, index) => (
//                                         <span
//                                             key={index}
//                                             className="bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1"
//                                         >
//                                             {skill}
//                                         </span>
//                                     ))}
//                                 </div>

//                                 {/* Buttons */}
//                                 <div className="flex gap-4">

//                                     {/* Preview Image */}
//                                     <a
//                                         href={selectedCertificates.image}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="w-1/2 bg-gray-800 hover:bg-purple-800 text-gray-300 px-6 py-2 rounded-xl text-center font-semibold"
//                                     >
//                                         Preview
//                                     </a>

//                                     {/* Verify Certificate */}
//                                     {selectedCertificates.certificateLink && (
//                                         <a
//                                             href={selectedCertificates.certificateLink}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="w-1/2 bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-xl text-center font-semibold"
//                                         >
//                                             View Certificate
//                                         </a>
//                                     )}
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// };

// export default Certificates;