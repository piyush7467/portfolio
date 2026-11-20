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
  resumeUrl: 'https://drive.google.com/file/d/1mf0JDbuaqyRqfu5-spnWs4cr2GW1OLRw/view?usp=drive_link',
  openToWork: true,
};

const defaultPortfolioContextValue = {
  profile: fallbackProfile,
  projects: fallbackProjects,
  experiences: fallbackExperiences,
  education: fallbackEducation,
  certificates: fallbackCertificates,
  skills: fallbackSkills,
  isLive: false,
  isLoading: true,
  usingFallback: true,
};

const PortfolioContext = createContext(defaultPortfolioContextValue);

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(fallbackProfile);
  const [projects, setProjects] = useState(fallbackProjects);
  const [experiences, setExperiences] = useState(fallbackExperiences);
  const [education, setEducation] = useState(fallbackEducation);
  const [certificates, setCertificates] = useState(fallbackCertificates);
  const [skills, setSkills] = useState(fallbackSkills);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPriorityData() {
      setIsLoading(true);

      // PRIORITY 1: Fetch live data from MongoDB Atlas via Spring Boot API
      const data = await fetchPortfolioOverview();

      if (!isMounted) return;

      if (data) {
        console.log('[Portfolio Context] Applying live database state:', data);

        // 1. Bio Profile
        if (data.profile && (data.profile.fullName || data.profile.bio)) {
          setProfile({
            fullName: data.profile.fullName || fallbackProfile.fullName,
            headline: data.profile.headline || fallbackProfile.headline,
            bio: data.profile.bio || fallbackProfile.bio,
            resumeUrl: data.profile.resumeUrl || fallbackProfile.resumeUrl,
            openToWork: data.profile.openToWork ?? true,
          });
        }

        // 2. Projects (from Studio Applications + Websites marked showOnPortfolio)
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          const mapped = data.projects.map((p, idx) => ({
            id: p.id || idx + 1,
            title: p.title,
            description: p.description,
            image: p.image,
            tags: p.tags || [],
            github: (p.isSourcePublic || p.sourcePublic) ? p.githubUrl : null,
            webapp: p.webappUrl,
            studioShowcaseUrl: p.studioShowcaseUrl,
            highlight: p.highlight,
            type: p.type,
          }));
          setProjects(mapped);
        } else {
          setProjects(fallbackProjects);
        }

        // 3. Work Experience (use DB if populated, otherwise constants.js fallback)
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
        } else {
          setExperiences(fallbackExperiences);
        }

        // 4. Education (use DB if populated, otherwise constants.js fallback)
        if (Array.isArray(data.education) && data.education.length > 0) {
          const mappedEdu = data.education.map((edu, idx) => ({
            id: edu.id || idx,
            img: edu.logoUrl || null,
            school: edu.school,
            degree: edu.degree,
            date: edu.duration,
            grade: edu.grade,
            desc: edu.description,
            keyFocus: edu.keyFocus || [],
          }));
          setEducation(mappedEdu);
        } else {
          setEducation(fallbackEducation);
        }

        // 5. Certificates (use DB if populated, otherwise constants.js fallback)
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
        } else {
          setCertificates(fallbackCertificates);
        }

        setSkills(fallbackSkills);
        setIsLive(true);
        setUsingFallback(false);
      } else {
        // PRIORITY 2: Network Error or Backend Offline -> Use constants.js
        console.info('[Portfolio Context] Backend unreachable or timed out. Serving offline constants.js fallback.');
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
        profile,
        projects,
        experiences,
        education,
        certificates,
        skills,
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
