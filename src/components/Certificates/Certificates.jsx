import React, { useState, useEffect } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Eye,
  FileCheck
} from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import SpotlightCard from "../ui/SpotlightCard";
import GlassBadge from "../ui/GlassBadge";

const Certificates = () => {
  const { certificates } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedCert) {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCert]);

  return (
    <section
      id="certificates"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 overflow-hidden bg-gray-950 font-sans"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Unified Section Header */}
        <SectionHeader
          badge="Verified Credentials"
          badgeIcon={Award}
          titlePrefix="Certifications"
          titleHighlight="& Accreditations"
          titleSuffix=""
          description="Industry-recognized certifications and professional credentials validating technical specializations."
        />

        {/* Certificates Grid or Empty State */}
        <div className="mt-12 sm:mt-16">
          {(!certificates || certificates.length === 0) ? (
            <div className="text-center py-16 px-6 rounded-3xl bg-white/[0.02] border border-white/5 max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto text-purple-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">No Certificates Available</h3>
              <p className="text-xs text-gray-400">
                Certifications and credentials stream live from the admin console.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="h-full"
                >
                  <SpotlightCard
                    spotlightColor="rgba(168, 85, 247, 0.15)"
                    className="p-5 sm:p-6 h-full flex flex-col justify-between group"
                  >
                    <div>
                      {/* Optional Credential Image Preview Header */}
                      {cert.image && (
                        <div
                          onClick={() => setSelectedCert(cert)}
                          className="relative h-44 rounded-xl overflow-hidden bg-gray-900 border border-white/10 mb-4 cursor-pointer group/img"
                        >
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-medium backdrop-blur-md">
                              <Eye className="w-3.5 h-3.5" />
                              Preview Credential
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <GlassBadge variant="purple">
                          <ShieldCheck className="w-3 h-3 mr-1 inline" />
                          {cert.issuer || "Verified Issuer"}
                        </GlassBadge>

                        {cert.date && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-400">
                            <Calendar className="w-3 h-3 text-purple-400" />
                            {cert.date}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors">
                        {cert.title}
                      </h3>

                      {/* Description */}
                      {cert.description && (
                        <p className="text-xs text-gray-400 line-clamp-3 mb-4 leading-relaxed">
                          {cert.description}
                        </p>
                      )}

                      {/* Skills */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {cert.skills.map((skill, sIdx) => (
                            <GlassBadge key={sIdx} variant="default">
                              {skill}
                            </GlassBadge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      {cert.certificateLink ? (
                        <a
                          href={cert.certificateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold font-mono transition-all"
                        >
                          <span>Verify Credential</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Archived Record</span>
                        </span>
                      )}

                      {cert.image && (
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                          title="View image"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="text-base font-bold text-white font-display">
                    {selectedCert.title}
                  </h4>
                  <p className="text-xs text-purple-400 font-mono">
                    {selectedCert.issuer} • {selectedCert.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedCert.image && (
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/50 max-h-[60vh] flex items-center justify-center">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[60vh] w-auto object-contain"
                  />
                </div>
              )}

              {selectedCert.description && (
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {selectedCert.description}
                </p>
              )}

              {selectedCert.certificateLink && (
                <div className="pt-2 flex justify-end">
                  <a
                    href={selectedCert.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30"
                  >
                    <span>Open Direct Credential Link</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
