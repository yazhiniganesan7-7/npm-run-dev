import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

// Base Pages
import Home from './pages/Home';
import RoleSelect from './pages/RoleSelect';

// Student Dashboard Pages
import StudentHome from './pages/StudentDashboard/StudentHome';
import StudentProfile from './pages/StudentDashboard/StudentProfile';
import StudentAssessment from './pages/StudentDashboard/StudentAssessment';
import StudentOpportunities from './pages/StudentDashboard/StudentOpportunities';
import StudentApplications from './pages/StudentDashboard/StudentApplications';

// Recruiter Dashboard Pages
import IndustryHome from './pages/IndustryDashboard/IndustryHome';
import IndustryProfile from './pages/IndustryDashboard/IndustryProfile';
import IndustryPostOpportunity from './pages/IndustryDashboard/IndustryPostOpportunity';
import IndustryManageOpportunities from './pages/IndustryDashboard/IndustryManageOpportunities';
import IndustryApplicants from './pages/IndustryDashboard/IndustryApplicants';
import IndustrySearch from './pages/IndustryDashboard/IndustrySearch';
import IndustryPrograms from './pages/IndustryDashboard/IndustryPrograms';

// Academic Dashboard Pages
import AcademiaHome from './pages/AcademiaDashboard/AcademiaHome';
import AcademiaStudents from './pages/AcademiaDashboard/AcademiaStudents';
import AcademiaAnalytics from './pages/AcademiaDashboard/AcademiaAnalytics';
import AcademiaVerify from './pages/AcademiaDashboard/AcademiaVerify';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Home and Login Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="role-select" element={<RoleSelect />} />

            {/* Student Dashboard nested routes */}
            <Route path="student">
              <Route index element={<StudentHome />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="assessment" element={<StudentAssessment />} />
              <Route path="opportunities" element={<StudentOpportunities />} />
              <Route path="applications" element={<StudentApplications />} />
            </Route>

            {/* Recruiter / Industry Dashboard nested routes */}
            <Route path="industry">
              <Route index element={<IndustryHome />} />
              <Route path="profile" element={<IndustryProfile />} />
              <Route path="post" element={<IndustryPostOpportunity />} />
              <Route path="manage" element={<IndustryManageOpportunities />} />
              <Route path="applicants" element={<IndustryApplicants />} />
              <Route path="search" element={<IndustrySearch />} />
              <Route path="programs" element={<IndustryPrograms />} />
            </Route>

            {/* Academic Dashboard nested routes */}
            <Route path="academia">
              <Route index element={<AcademiaHome />} />
              <Route path="students" element={<AcademiaStudents />} />
              <Route path="analytics" element={<AcademiaAnalytics />} />
              <Route path="verify" element={<AcademiaVerify />} />
            </Route>
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
