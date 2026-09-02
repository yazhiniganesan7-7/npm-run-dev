import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GraduationCap, Building2, BookOpen, ChevronRight, Lock } from 'lucide-react';

const RoleSelect = () => {
  const { loginAs, students, companies } = useApp();
  const navigate = useNavigate();
  
  const [selectedRole, setSelectedRole] = useState('student'); // 'student', 'recruiter', 'academic'
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || '');

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedRole === 'student') {
      loginAs('student', selectedStudentId);
      navigate('/student');
    } else if (selectedRole === 'recruiter') {
      loginAs('recruiter', selectedCompanyId);
      navigate('/industry');
    } else if (selectedRole === 'academic') {
      loginAs('academic', 'inst-1');
      navigate('/academia');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Title Panel */}
        <div className="bg-slate-900 text-white p-8 text-center space-y-2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-teal-500/10 opacity-40" />
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto text-white shadow-md border border-indigo-500/30">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Collaborator Login</h2>
          <p className="text-slate-400 text-xs">Choose a role to access your personalized sandbox dashboard</p>
        </div>

        {/* Tab Selection */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            
            {/* Student Tab */}
            <button
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center text-center space-y-2 transition-all ${
                selectedRole === 'student'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-6 h-6 text-indigo-600" />
              <span className="text-xs">Student</span>
            </button>

            {/* Recruiter Tab */}
            <button
              type="button"
              onClick={() => setSelectedRole('recruiter')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center text-center space-y-2 transition-all ${
                selectedRole === 'recruiter'
                  ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-semibold'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-6 h-6 text-emerald-600" />
              <span className="text-xs">Recruiter</span>
            </button>

            {/* Academic Tab */}
            <button
              type="button"
              onClick={() => setSelectedRole('academic')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center text-center space-y-2 transition-all ${
                selectedRole === 'academic'
                  ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="text-xs">Academic</span>
            </button>

          </div>

          {/* Sandbox Configurations */}
          <div className="space-y-4 pt-4 border-t border-slate-100 min-h-[100px]">
            
            {/* Student Dropdown options */}
            {selectedRole === 'student' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Select Student Profile</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.education.degree.split(' ')[0]}) - {s.skills.length} Skills
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-indigo-600 italic mt-1">
                  💡 Aarav has full-stack SWE skills, Priyanka has ML/AI research skills.
                </p>
              </div>
            )}

            {/* Recruiter Dropdown options */}
            {selectedRole === 'recruiter' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Select Recruiter Account</label>
                <select
                  value={selectedCompanyId}
                  onChange={(e) => setSelectedCompanyId(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} - {c.sector} ({c.location.split(',')[0]})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-emerald-600 italic mt-1">
                  💡 Google India has SDE Intern roles; Microsoft India has AI/ML research postings.
                </p>
              </div>
            )}

            {/* Academic default details */}
            {selectedRole === 'academic' && (
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start space-x-3 text-slate-700">
                <div className="bg-white p-1 rounded border border-blue-200 text-blue-600 flex-shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-xs text-blue-900">Indian Institute of Technology Delhi (IIT Delhi)</h4>
                  <p className="text-xs text-slate-600">
                    Entering as IIT Delhi Placement & Training Office administrator account. You will have full access to engineering student directories, campus placement statistics, and skill certificate verifications.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1 hover:shadow-lg"
          >
            <span>Proceed to Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </form>
      </div>
    </div>
  );
};

export default RoleSelect;
