import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPortfolioOverview } from '../api/portfolioApi';

const defaultPortfolioContextValue = {
  profile: null,
  projects: [],
  experiences: [],
  education: [],
  certificates: [],
  isLive: false,
  isLoading: true,
};

const PortfolioContext = createContext(defaultPortfolioContextValue);

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadLiveData() {
      setIsLoading(true);

      try {
        const data = await fetchPortfolioOverview();

        if (!isMounted) return;

        if (data) {
          console.log('[Portfolio Context] Loaded pure live database payload:', data);

          // 1. Profile Bio
          if (data.profile) {
            setProfile(data.profile);
          } else {
            setProfile(null);
          }

          // 2. Projects (from Studio applications & websites)
          if (Array.isArray(data.projects)) {
            const mappedProjects = data.projects.map((p, idx) => ({
              id: p.id || idx + 1,
              title: p.title || '',
              description: p.description || '',
              image: p.image || '',
              tags: Array.isArray(p.tags) ? p.tags : [],
              github: (p.isSourcePublic || p.sourcePublic) ? p.githubUrl : null,
              webapp: p.webappUrl || '',
              studioShowcaseUrl: p.studioShowcaseUrl || '',
              highlight: p.highlight || null,
              type: p.type || 'WEB',
            }));
            setProjects(mappedProjects);
          } else {
            setProjects([]);
          }

          // 3. Work Experiences
          if (Array.isArray(data.experiences)) {
            const mappedExp = data.experiences.map((exp, idx) => ({
              id: exp.id || idx,
              img: exp.companyLogoUrl || null,
              role: exp.role || '',
              company: exp.company || '',
              date: exp.duration || '',
              desc: exp.description || '',
              skills: Array.isArray(exp.skills) ? exp.skills : [],
            }));
            setExperiences(mappedExp);
          } else {
            setExperiences([]);
          }

          // 4. Academic Education
          if (Array.isArray(data.education)) {
            const mappedEdu = data.education.map((edu, idx) => ({
              id: edu.id || idx,
              img: edu.logoUrl || edu.img || null,
              school: edu.school || '',
              degree: edu.degree || '',
              date: edu.duration || edu.date || '',
              grade: edu.grade || '',
              desc: edu.description || edu.desc || '',
              keyFocus: Array.isArray(edu.keyFocus) ? edu.keyFocus : (Array.isArray(edu.keyFocusAreas) ? edu.keyFocusAreas : []),
            }));
            setEducation(mappedEdu);
          } else {
            setEducation([]);
          }

          // 5. Certificates
          if (Array.isArray(data.certificates)) {
            const mappedCert = data.certificates.map((cert, idx) => ({
              id: cert.id || idx,
              title: cert.title || '',
              issuer: cert.issuer || '',
              date: cert.date || '',
              image: cert.imageUrl || null,
              description: cert.description || '',
              skills: Array.isArray(cert.skills) ? cert.skills : [],
              certificateLink: cert.certificateLink || '',
            }));
            setCertificates(mappedCert);
          } else {
            setCertificates([]);
          }

          setIsLive(true);
        } else {
          // No data or offline -> Keep empty state, no fallback
          console.warn('[Portfolio Context] Backend returned no data. Using empty live state.');
          setProfile(null);
          setProjects([]);
          setExperiences([]);
          setEducation([]);
          setCertificates([]);
          setIsLive(false);
        }
      } catch (err) {
        console.error('[Portfolio Context] Failed to load live portfolio data:', err);
        if (isMounted) {
          setProfile(null);
          setProjects([]);
          setExperiences([]);
          setEducation([]);
          setCertificates([]);
          setIsLive(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadLiveData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects: projects || [],
        experiences: experiences || [],
        education: education || [],
        certificates: certificates || [],
        isLive,
        isLoading,
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
