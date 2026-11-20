import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPortfolioOverview } from '../api/portfolioApi';
import { 
  projects as fallbackProjects, 
  experiences as fallbackExperiences, 
  education as fallbackEducation, 
  certificates as fallbackCertificates,
  SkillsInfo as fallbackSkills
} from '../constants';

const fallbackProfile = {
  fullName: 'Piyush Shakya',
  headline: 'Full Stack Engineer & Android Developer',
  bio: 'I build production-grade web applications, microservices, and mobile platforms with clean architecture and modern user experience.',
  resumeUrl: '',
  openToWork: true,
};

const defaultPortfolioContextValue = {
  profile: fallbackProfile,
  projects: [],
  experiences: [],
  education: [],
  certificates: [],
  skills: fallbackSkills,
  isLive: false,
  isLoading: true,
};

const PortfolioContext = createContext(defaultPortfolioContextValue);

export function PortfolioProvider({ children }) {
  // Start empty so backend has 1st priority
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [skills, setSkills] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPriorityData() {
      setIsLoading(true);

      // 1. ATTEMPT LIVE BACKEND FETCH FIRST (Priority 1)
      const data = await fetchPortfolioOverview();

      if (!isMounted) return;

      if (data) {
        // Backend Success: Use Live Database Data
        if (data.profile) {
          setProfile(data.profile);
        } else {
          setProfile(fallbackProfile);
        }

        if (Array.isArray(data.projects)) {
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

        if (Array.isArray(data.experiences)) {
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

        if (Array.isArray(data.education)) {
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

        if (Array.isArray(data.certificates)) {
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

        setSkills(fallbackSkills);
        setIsLive(true);
        setUsingFallback(false);
      } else {
        // Priority 2: NETWORK ERROR / BACKEND OFFLINE -> Use constants.js fallback
        console.info('Backend unreachable or returned null. Serving data from constants.js fallback.');
        setProfile(fallbackProfile);
        setProjects(fallbackProjects);
        setExperiences(fallbackExperiences);
        setEducation(fallbackEducation);
        setCertificates(fallbackCertificates);
        setSkills(fallbackSkills);
        setIsLive(false);
        setUsingFallback(true);
      }

      setIsLoading(false);
    }

    loadPriorityData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        profile: profile || fallbackProfile,
        projects: projects.length > 0 || !usingFallback ? projects : fallbackProjects,
        experiences: experiences.length > 0 || !usingFallback ? experiences : fallbackExperiences,
        education: education.length > 0 || !usingFallback ? education : fallbackEducation,
        certificates: certificates.length > 0 || !usingFallback ? certificates : fallbackCertificates,
        skills: skills.length > 0 ? skills : fallbackSkills,
        isLive,
        isLoading,
        usingFallback,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  return ctx || defaultPortfolioContextValue;
}


