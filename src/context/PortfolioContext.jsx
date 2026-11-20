import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPortfolioOverview } from '../api/portfolioApi';
import { 
  projects as defaultProjects, 
  experiences as defaultExperiences, 
  education as defaultEducation, 
  certificates as defaultCertificates,
  SkillsInfo as defaultSkills
} from '../constants';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState({
    fullName: 'Piyush Shakya',
    headline: 'Full Stack Engineer & Android Developer',
    bio: 'I build production-grade web applications, microservices, and mobile platforms with clean architecture and modern user experience.',
    resumeUrl: '',
    openToWork: true,
  });

  const [projects, setProjects] = useState(defaultProjects);
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [education, setEducation] = useState(defaultEducation);
  const [certificates, setCertificates] = useState(defaultCertificates);
  const [skills] = useState(defaultSkills);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function loadLiveData() {
      const data = await fetchPortfolioOverview();
      if (!data) return;

      if (data.profile) {
        setProfile((prev) => ({ ...prev, ...data.profile }));
      }

      // Convert backend projects to portfolio card format
      if (Array.isArray(data.projects) && data.projects.length > 0) {
        const mapped = data.projects.map((p, idx) => ({
          id: p.id || idx + 1,
          title: p.title,
          description: p.description,
          image: p.image,
          tags: p.tags || [],
          github: p.isSourcePublic ? p.githubUrl : null,
          webapp: p.webappUrl,
          studioShowcaseUrl: p.studioShowcaseUrl,
          highlight: p.highlight,
          type: p.type,
        }));
        setProjects(mapped);
      }

      if (Array.isArray(data.experiences) && data.experiences.length > 0) {
        const mappedExp = data.experiences.map((exp, idx) => ({
          id: exp.id || idx,
          img: exp.companyLogoUrl || null,
          role: exp.role,
          company: exp.company,
          date: exp.duration,
          desc: exp.description,
          skills: exp.skills || [],
        }));
        setExperiences(mappedExp);
      }

      if (Array.isArray(data.education) && data.education.length > 0) {
        const mappedEdu = data.education.map((edu, idx) => ({
          id: edu.id || idx,
          img: edu.logoUrl || null,
          school: edu.school,
          degree: edu.degree,
          date: edu.duration,
          grade: edu.grade,
          desc: edu.description,
        }));
        setEducation(mappedEdu);
      }

      if (Array.isArray(data.certificates) && data.certificates.length > 0) {
        const mappedCert = data.certificates.map((cert, idx) => ({
          id: cert.id || idx,
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          image: cert.imageUrl,
          description: cert.description,
          skills: cert.skills || [],
          certificateLink: cert.certificateLink,
        }));
        setCertificates(mappedCert);
      }

      setIsLive(true);
    }

    loadLiveData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        experiences,
        education,
        certificates,
        skills,
        isLive,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
}

