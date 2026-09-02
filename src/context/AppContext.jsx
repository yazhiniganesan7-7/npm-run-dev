import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_STUDENTS,
  MOCK_COMPANIES,
  MOCK_OPPORTUNITIES,
  MOCK_APPLICATIONS,
  MOCK_COLLABORATIONS,
  MOCK_FACULTY_OPPORTUNITIES,
  MOCK_INSTITUTIONS,
  SKILL_TAXONOMY
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Clear legacy Ayurvedic localStorage data once on upgrade to v2.0
  if (typeof window !== 'undefined' && localStorage.getItem('sb_version') !== '2.0') {
    localStorage.removeItem('sih_students');
    localStorage.removeItem('sih_companies');
    localStorage.removeItem('sih_opportunities');
    localStorage.removeItem('sih_applications');
    localStorage.removeItem('sih_collaborations');
    localStorage.removeItem('sih_faculty_ops');
    localStorage.removeItem('sih_user');
    localStorage.removeItem('sih_rec_programs');
    localStorage.setItem('sb_version', '2.0');
  }

  // Helper to load from localStorage or fallback
  const getInitialState = (key, fallback) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
      console.error(`Failed to load ${key} from localStorage`, e);
      return fallback;
    }
  };

  // Auth / Role Session State
  const [currentRole, setCurrentRole] = useState(() => getInitialState('sih_role', 'none')); // 'student', 'recruiter', 'academic', 'none'
  const [currentUser, setCurrentUser] = useState(() => {
    const user = getInitialState('sih_user', null);
    const role = getInitialState('sih_role', 'none');
    if (!user && role === 'academic') {
      return {
        id: 'inst-1',
        name: 'Indian Institute of Technology Delhi (IIT Delhi)',
        role: 'academic-admin',
        adminName: 'Prof. Arvind Sharma (Dean, Placements & Internships)',
        code: 'IITD-110016',
        email: 'tpo@admin.iitd.ac.in',
        avatar: 'IIT'
      };
    }
    return user;
  });

  // Core Data States
  const [students, setStudents] = useState(() => getInitialState('sih_students', MOCK_STUDENTS));
  const [companies, setCompanies] = useState(() => getInitialState('sih_companies', MOCK_COMPANIES));
  const [opportunities, setOpportunities] = useState(() => getInitialState('sih_opportunities', MOCK_OPPORTUNITIES));
  const [applications, setApplications] = useState(() => getInitialState('sih_applications', MOCK_APPLICATIONS));
  const [collaborations, setCollaborations] = useState(() => getInitialState('sih_collaborations', MOCK_COLLABORATIONS));
  const [facultyOpportunities, setFacultyOpportunities] = useState(() => getInitialState('sih_faculty_ops', MOCK_FACULTY_OPPORTUNITIES));

  // Toast System State
  const [toasts, setToasts] = useState([]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('sih_role', JSON.stringify(currentRole));
    localStorage.setItem('sih_user', JSON.stringify(currentUser));
  }, [currentRole, currentUser]);

  useEffect(() => {
    localStorage.setItem('sih_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('sih_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('sih_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('sih_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('sih_collaborations', JSON.stringify(collaborations));
  }, [collaborations]);

  useEffect(() => {
    localStorage.setItem('sih_faculty_ops', JSON.stringify(facultyOpportunities));
  }, [facultyOpportunities]);

  // Sync currentUser details when student/company state updates
  useEffect(() => {
    if (currentRole === 'student' && currentUser) {
      const freshStudent = students.find(s => s.id === currentUser.id);
      if (freshStudent) setCurrentUser(freshStudent);
    } else if (currentRole === 'recruiter' && currentUser) {
      const freshCompany = companies.find(c => c.id === currentUser.id);
      if (freshCompany) setCurrentUser(freshCompany);
    }
  }, [students, companies, currentRole]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Mock Login / Role Switch
  const loginAs = (role, id) => {
    if (role === 'student') {
      const student = students.find(s => s.id === id);
      if (student) {
        setCurrentRole('student');
        setCurrentUser(student);
        showToast(`Logged in as Student: ${student.name}`);
      }
    } else if (role === 'recruiter') {
      const company = companies.find(c => c.id === id);
      if (company) {
        setCurrentRole('recruiter');
        setCurrentUser(company);
        showToast(`Logged in as Recruiter for ${company.name}`);
      }
    } else if (role === 'academic') {
      // Mock login for Academic admin (Indian Institute of Technology Delhi)
      const institute = {
        id: 'inst-1',
        name: 'Indian Institute of Technology Delhi (IIT Delhi)',
        role: 'academic-admin',
        adminName: 'Prof. Arvind Sharma (Dean, Placements & Internships)',
        code: 'IITD-110016',
        email: 'tpo@admin.iitd.ac.in',
        avatar: 'IIT'
      };
      setCurrentRole('academic');
      setCurrentUser(institute);
      showToast(`Logged in as Academic Admin for ${institute.name}`);
    } else {
      setCurrentRole('none');
      setCurrentUser(null);
    }
  };

  const logout = () => {
    setCurrentRole('none');
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  // Reset Mock Data to Default State
  const resetMockData = () => {
    setStudents(MOCK_STUDENTS);
    setCompanies(MOCK_COMPANIES);
    setOpportunities(MOCK_OPPORTUNITIES);
    setApplications(MOCK_APPLICATIONS);
    setCollaborations(MOCK_COLLABORATIONS);
    setFacultyOpportunities(MOCK_FACULTY_OPPORTUNITIES);
    setCurrentRole('none');
    setCurrentUser(null);
    localStorage.clear();
    showToast('Mock Database has been reset to defaults', 'info');
  };

  // Student Actions
  const updateStudentProfile = (studentId, updatedProfile) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, ...updatedProfile };
      }
      return s;
    }));
    if (currentUser?.id === studentId) {
      setCurrentUser(prev => ({ ...prev, ...updatedProfile }));
    }
    showToast('Profile updated successfully');
  };

  const verifySkillWithTest = (studentId, skillName, score, level) => {
    const today = new Date().toISOString().split('T')[0];
    const updateHelper = (student) => {
      const existingVerified = student.verifiedSkills || [];
      const filteredVerified = existingVerified.filter(v => v.name !== skillName);
      const newVerified = [
        ...filteredVerified,
        { name: skillName, level, score, date: today }
      ];
      const existingClaimed = student.claimedSkills || [];
      const newClaimed = existingClaimed.filter(c => c !== skillName);
      const existingSkills = student.skills || [];
      const newSkills = existingSkills.includes(skillName) ? existingSkills : [...existingSkills, skillName];

      return {
        ...student,
        verifiedSkills: newVerified,
        claimedSkills: newClaimed,
        skills: newSkills
      };
    };

    setStudents(prev => prev.map(s => s.id === studentId ? updateHelper(s) : s));
    if (currentUser?.id === studentId) {
      setCurrentUser(prev => updateHelper(prev));
    }

    showToast(`🎉 Verified "${skillName}" as ${level} (${score}%)!`, 'success');
  };

  const claimSkill = (studentId, skillName) => {
    const claimHelper = (student) => {
      const claimed = student.claimedSkills || [];
      if (!claimed.includes(skillName)) {
        return { ...student, claimedSkills: [...claimed, skillName] };
      }
      return student;
    };

    setStudents(prev => prev.map(s => s.id === studentId ? claimHelper(s) : s));
    if (currentUser?.id === studentId) {
      setCurrentUser(prev => claimHelper(prev));
    }
    showToast(`Claimed "${skillName}". Ready to take 5-question test!`, 'info');
  };

  const shortlistCandidate = (studentId, opportunityId) => {
    const opp = opportunities.find(o => o.id === opportunityId);
    const student = students.find(s => s.id === studentId);
    const existing = applications.find(a => a.studentId === studentId && a.opportunityId === opportunityId);
    const today = new Date().toISOString().split('T')[0];

    if (existing) {
      if (existing.status === 'Shortlisted') {
        showToast(`${student?.name || 'Candidate'} is already shortlisted`, 'info');
        return;
      }
      updateApplicationStatus(existing.id, 'Shortlisted', 'Shortlisted by recruiter via Candidate Matching');
    } else {
      const newApp = {
        id: `app-${Date.now()}`,
        studentId,
        opportunityId,
        status: 'Shortlisted',
        appliedDate: today,
        feedback: 'Directly shortlisted by recruiter via Candidate Matching engine.',
        timeline: [
          { status: 'Applied', date: today, description: 'Profile imported into pipeline' },
          { status: 'Shortlisted', date: today, description: 'Directly shortlisted by hiring team' }
        ]
      };
      setApplications(prev => [newApp, ...prev]);
    }

    showToast(`⭐ Shortlisted ${student?.name || 'Candidate'} for ${opp?.title || 'the role'}!`, 'success');
  };

  const applyForOpportunity = (studentId, opportunityId) => {
    // Check if already applied
    const exists = applications.find(a => a.studentId === studentId && a.opportunityId === opportunityId);
    if (exists) {
      showToast('You have already applied for this opportunity', 'warning');
      return;
    }

    const opp = opportunities.find(o => o.id === opportunityId);
    const newApp = {
      id: `app-${Date.now()}`,
      studentId,
      opportunityId,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      feedback: 'Application received and under review.',
      timeline: [
        { status: 'Applied', date: new Date().toISOString().split('T')[0], description: 'Application submitted online' }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Successfully applied for ${opp ? opp.title : 'the position'}`);
  };

  // Recruiter Actions
  const updateCompanyProfile = (companyId, updatedData) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === companyId) {
        return { ...c, ...updatedData };
      }
      return c;
    }));
    showToast('Company profile updated successfully');
  };

  const addOpportunity = (oppData) => {
    const newOpp = {
      id: `job-${Date.now()}`,
      companyId: currentUser.id,
      companyName: currentUser.name,
      logoText: currentUser.logoText,
      logoBg: currentUser.logoBg,
      status: 'Open',
      ...oppData
    };

    setOpportunities(prev => [newOpp, ...prev]);
    showToast(`Opportunity "${newOpp.title}" posted successfully`);
  };

  const updateOpportunity = (oppId, updatedData) => {
    setOpportunities(prev => prev.map(o => {
      if (o.id === oppId) {
        return { ...o, ...updatedData };
      }
      return o;
    }));
    showToast('Opportunity updated successfully');
  };

  const deleteOpportunity = (oppId) => {
    setOpportunities(prev => prev.filter(o => o.id !== oppId));
    // Cancel applications linked to it
    setApplications(prev => prev.filter(a => a.opportunityId !== oppId));
    showToast('Opportunity deleted successfully');
  };

  const updateApplicationStatus = (appId, newStatus, feedback) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        const dateStr = new Date().toISOString().split('T')[0];
        const newTimeline = [
          ...a.timeline,
          { status: newStatus, date: dateStr, description: feedback || `Status changed to ${newStatus}` }
        ];
        return {
          ...a,
          status: newStatus,
          feedback: feedback || a.feedback,
          timeline: newTimeline
        };
      }
      return a;
    }));
    showToast(`Application status updated to ${newStatus}`);
  };

  // Academia / Admin Actions
  const verifyStudentCertification = (studentId, certId, status) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          certifications: s.certifications.map(c => {
            if (c.id === certId) {
              return { ...c, status }; // 'Verified' or 'Rejected'
            }
            return c;
          })
        };
      }
      return s;
    }));
    showToast(`Certification was marked as ${status}`);
  };

  const addCollaboration = (collabData) => {
    const newCollab = {
      id: `col-${Date.now()}`,
      dateSigned: new Date().toISOString().split('T')[0],
      status: 'Active',
      mouDocument: 'MoU_Signed_Draft.pdf',
      ...collabData
    };
    setCollaborations(prev => [newCollab, ...prev]);
    showToast(`MoU Collaboration with ${collabData.companyName} created!`);
  };

  const expressInterestInFacultyOpportunity = (fopId, facultyEmail) => {
    setFacultyOpportunities(prev => prev.map(f => {
      if (f.id === fopId) {
        if (f.appliedFaculty.includes(facultyEmail)) {
          showToast('You have already expressed interest in this program', 'info');
          return f;
        }
        showToast('Interest registered. The sponsoring company will contact you.');
        return { ...f, appliedFaculty: [...f.appliedFaculty, facultyEmail] };
      }
      return f;
    }));
  };

  return (
    <AppContext.Provider value={{
      currentRole,
      currentUser,
      students,
      companies,
      opportunities,
      applications,
      collaborations,
      facultyOpportunities,
      institutions: MOCK_INSTITUTIONS,
      skillsTaxonomy: SKILL_TAXONOMY,
      toasts,
      loginAs,
      logout,
      resetMockData,
      updateStudentProfile,
      verifySkillWithTest,
      claimSkill,
      shortlistCandidate,
      applyForOpportunity,
      updateCompanyProfile,
      addOpportunity,
      updateOpportunity,
      deleteOpportunity,
      updateApplicationStatus,
      verifyStudentCertification,
      addCollaboration,
      expressInterestInFacultyOpportunity,
      showToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
