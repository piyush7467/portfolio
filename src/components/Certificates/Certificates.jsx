import React, { useState } from "react";
import { certificates } from "../../constants";

const Certificates = () => {
    const [selectedCertificates, setSelectedCertificates] = useState(null);

    const handleOpenModal = (certificate) => {
        setSelectedCertificates(certificate);
    };

    const handleCloseModal = () => {
        setSelectedCertificates(null);
    };

    return (
        <section
            id="certificates"
            className="py-24 pb-28 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative bg-skills-gradient clip-path-custom"
        >
            {/* Section Title */}
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white">CERTIFICATES</h2>
                <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
                <p className="text-gray-400 mt-4 text-lg font-semibold">
                    A showcase of the certificates I have obtained, highlighting my skills
                    and experience in various technologies
                </p>
            </div>

            {/* Certificates Grid */}
            <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {certificates.map((certificate) => (
                    <div
                        key={certificate.id}
                        onClick={() => handleOpenModal(certificate)}
                        className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="p-4">
                            <img
                                src={certificate.image}
                                alt={certificate.title}
                                className="w-full h-auto max-h-[400px] object-cover rounded-xl"
                            />
                        </div>

                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-1">
                                {certificate.title}
                            </h3>

                            <p className="text-sm text-gray-400 mb-3">
                                {certificate.issuer} • {certificate.date}
                            </p>

                            <p className="text-gray-500 mb-4 line-clamp-3">
                                {certificate.description}
                            </p>

                            <div className="mb-4">
                                {certificate.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1 mr-2 mb-2"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedCertificates && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
                    <div className="bg-gray-900 rounded-xl shadow-2xl lg:w-full w-[90%] max-w-3xl overflow-hidden relative">

                        {/* Close Button */}
                        <div className="flex justify-end p-4">
                            <button
                                onClick={handleCloseModal}
                                className="text-white text-3xl font-bold hover:text-purple-500"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex flex-col">

                            {/* Certificate Image */}
                            <div className="w-full flex justify-center bg-gray-900 px-4">
                                <img
                                    src={selectedCertificates.image}
                                    alt={selectedCertificates.title}
                                    className="lg:w-full w-[95%] object-contain rounded-xl shadow-2xl"
                                />
                            </div>

                            {/* Details */}
                            <div className="lg:p-8 p-6">
                                <h3 className="lg:text-3xl font-bold text-white mb-2">
                                    {selectedCertificates.title}
                                </h3>

                                <p className="text-sm text-gray-400 mb-4">
                                    {selectedCertificates.issuer} • {selectedCertificates.date}
                                </p>

                                <p className="text-gray-400 mb-6">
                                    {selectedCertificates.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedCertificates.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4">

                                    {/* Preview Image */}
                                    <a
                                        href={selectedCertificates.image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-1/2 bg-gray-800 hover:bg-purple-800 text-gray-300 px-6 py-2 rounded-xl text-center font-semibold"
                                    >
                                        Preview
                                    </a>

                                    {/* Verify Certificate */}
                                    {selectedCertificates.certificateLink && (
                                        <a
                                            href={selectedCertificates.certificateLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-1/2 bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-xl text-center font-semibold"
                                        >
                                            View Certificate
                                        </a>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certificates;