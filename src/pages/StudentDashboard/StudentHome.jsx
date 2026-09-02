import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ProgressBar from '../../components/ProgressBar';
import { Award, Briefcase, FileCheck, Share2, ArrowRight, CheckCircle2, BookmarkCheck, HelpCircle } from 'lucide-react';

const StudentHome = () => {
  const { currentUser, opportunities, applications } = useApp();

  if (!currentUser) return <div className="text-center py-12">Loading Student profile...</div>;

  // 1. KPI Counts
  const studentApps = applications.filter(a => a.studentId === currentUser.id);
  const appliedCount = studentApps.length;
  const shortlistedCount = studentApps.filter(a => a.status === 'Shortlisted' || a.status === 'Interview' || a.status === 'Selected').length;
  const verifiedCertsCount = currentUser.certifications.filter(c => c.status === 'Verified').length;

  // 2. Mock Matching Logic (based on skill overlap)
  const getMatchScore = (opp) => {
    const reqSkills = opp.requiredSkills || [];
    const studentSkills = currentUser.skills || [];
    if (reqSkills.length === 0) return 0;
    const matches = reqSkills.filter(s => studentSkills.includes(s));
    return Math.round((matches.length / reqSkills.length) * 100);
  };

  const matchedOpps = opportunities
    .map(opp => ({ ...opp, matchScore: getMatchScore(opp) }))
    .filter(opp => opp.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  // Share profile card handler (mock)
  const handleShare = () => {
    navigator.clipboard.writeText(`https://ayush-skillbridge.gov.in/portfolio/${currentUser.id}`);
    alert('Shareable portfolio link copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      {/* Welcome & Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden border border-slate-800 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-teal-500/5 opacity-55" />
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">Student Hub</span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Welcome back, {currentUser.name}</h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Your skill mapping is {currentUser.assessmentScores ? 'completed' : 'incomplete'}. 
            {currentUser.assessmentScores 
              ? ' View your proficiency chart below or browse opportunities matched to your engineering skills.' 
              : ' Take the competency assessment to create your profile and map skills to open tech company internships.'}
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Applied Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-medium text-slate-500 block">Applied</span>
            <span className="text-3xl font-bold text-slate-900">{appliedCount}</span>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Shortlisted Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-medium text-slate-500 block">Shortlisted / Active</span>
            <span className="text-3xl font-bold text-slate-900">{shortlistedCount}</span>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Verified Certifications Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-medium text-slate-500 block">Verified Certifications</span>
            <span className="text-3xl font-bold text-slate-900">{verifiedCertsCount}</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-600">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 30-Day Skill Gap Plan Callout Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-indigo-500/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Sprint Roadmap
            </span>
            <span className="text-xs text-slate-300 font-semibold">Recommended for {currentUser.targetRole}</span>
          </div>
          <h3 className="text-lg font-bold">Personalized 30-Day Plan for Skill Deficiencies</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Follow our 4-week structured engineering curriculum designed to eliminate your missing skills and maximize match scoring with top recruiters like Google, Microsoft, and NVIDIA.
          </p>
        </div>
        <Link
          to="/student/assessment"
          className="bg-gradient-to-r from-amber-500 to-teal-400 hover:from-amber-600 hover:to-teal-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-md flex-shrink-0"
        >
          <span>Open 30-Day Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Content Layout (Portfolio on Left, Matches on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Digital Portfolio Card (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Verified Digital Portfolio</h3>
            <button 
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold border border-slate-200 hover:bg-slate-50 bg-white px-3 py-1.5 rounded-lg transition-colors text-slate-600 shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Profile</span>
            </button>
          </div>

          {/* Premium Portfolio Card UI */}
          <div className="bg-gradient-to-b from-white to-slate-50/40 rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
            <div className="h-2 bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-600 w-full" />
            
            {/* Header info */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-teal-500 flex items-center justify-center text-white font-black text-2xl shadow-sm">
                  {currentUser.avatar}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-xl text-slate-900">{currentUser.name}</h4>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase tracking-wide">
                      Verified User
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">{currentUser.targetRole}</p>
                  <p className="text-xs text-slate-400">{currentUser.education.degree} • {currentUser.education.year}</p>
                </div>
              </div>

              {/* Institution badge */}
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Institution</span>
                <span className="text-xs font-bold text-slate-700 block">{currentUser.institutionName || 'Indian Institute of Technology Delhi (IIT Delhi)'}</span>
                <span className="text-[10px] text-slate-500 block">CGPA: {currentUser.education.cgpa}</span>
              </div>
            </div>

            {/* Skills & Achievements */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Skills tags */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                  <BookmarkCheck className="w-4 h-4 text-emerald-500" />
                  <span>Mapped Skills & Expertise</span>
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.skills.map((skill) => (
                    <span key={skill} className="bg-slate-100 border border-slate-200/60 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium hover:bg-indigo-50 hover:text-indigo-800 hover:border-indigo-100 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Credentials */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Verified Credentials</span>
                </h5>
                <div className="space-y-2">
                  {currentUser.certifications.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-center p-2 rounded-lg bg-slate-100/60 border border-slate-200/30">
                      <div>
                        <p className="text-xs font-semibold text-slate-800 truncate max-w-[180px]">{cert.name}</p>
                        <p className="text-[10px] text-slate-400">{cert.issuer}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold ${
                        cert.status === 'Verified' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : cert.status === 'Pending' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Projects list */}
            <div className="px-6 sm:px-8 pb-8 border-t border-slate-100 pt-6">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Projects</h5>
              <div className="space-y-3">
                {currentUser.projects.map((proj, idx) => (
                  <div key={idx} className="p-3 bg-slate-50/50 border border-slate-200/50 rounded-lg">
                    <h6 className="text-xs font-bold text-slate-800">{proj.title}</h6>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Recommended Opportunities List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Matched For You</h3>
            <Link to="/student/opportunities" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-0.5">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {matchedOpps.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs">
                Take the assessment or add skills to get personalized matches.
              </div>
            ) : (
              matchedOpps.map((opp) => (
                <div key={opp.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden transition-all duration-300 hover:shadow-md">
                  {/* Matching overlay top banner */}
                  <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold rounded-bl-lg ${
                    opp.matchScore >= 80 ? 'bg-emerald-100 text-emerald-800' : opp.matchScore >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {opp.matchScore}% Match
                  </div>

                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{opp.companyName}</span>
                  <h4 className="font-bold text-sm text-slate-800 mt-1">{opp.title}</h4>
                  
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-2">
                    <span>{opp.location}</span>
                    <span>•</span>
                    <span>{opp.stipend}</span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">{opp.type} • Deadline: {opp.deadline}</span>
                    <Link
                      to={`/student/opportunities?open=${opp.id}`}
                      className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1 rounded text-xs font-semibold transition-colors"
                    >
                      View & Apply
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Assessment Call To Action */}
          {!currentUser.assessmentScores && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-amber-800">
                <HelpCircle className="w-5 h-5 flex-shrink-0" />
                <h4 className="font-bold text-xs">Unmapped Skill Gap</h4>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Take our quick skill mapping assessment to generate a visual radar chart showing your domain proficiency vs industry standard baselines.
              </p>
              <Link
                to="/student/assessment"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors inline-block text-center shadow-xs"
              >
                Start assessment
              </Link>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default StudentHome;
