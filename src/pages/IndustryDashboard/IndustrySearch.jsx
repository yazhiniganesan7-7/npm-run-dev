import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProgressBar from '../../components/ProgressBar';
import { Search, MapPin, GraduationCap, Award, FileText, CheckCircle, X, Layers, Briefcase } from 'lucide-react';

const IndustrySearch = () => {
  const { students, opportunities, currentUser, institutions } = useApp();

  const companyOpps = opportunities.filter(o => o.companyId === currentUser?.id);
  const [compareOppId, setCompareOppId] = useState(companyOpps[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('All');

  // Detailed profile modal state
  const [selectedStudent, setSelectedStudent] = useState(null);

  const activeOpp = opportunities.find(o => o.id === compareOppId);

  // Calculate skill match percentage against active comparison opp
  const calculateMatch = (student, opp) => {
    if (!student || !opp) return 0;
    const req = opp.requiredSkills || [];
    const studentSkills = student.skills || [];
    if (req.length === 0) return 0;
    const matches = req.filter(s => studentSkills.includes(s));
    return Math.round((matches.length / req.length) * 100);
  };

  // Filter and sort students
  const filteredStudents = students
    .map(student => ({
      ...student,
      matchPercentage: activeOpp ? calculateMatch(student, activeOpp) : 0
    }))
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.targetRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.education.degree.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSkill = skillFilter === '' || student.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));
      const matchesCollege = selectedCollege === 'All' || 
                             student.institutionName?.toLowerCase().includes(selectedCollege.toLowerCase()) ||
                             student.institutionId === selectedCollege;
      return matchesSearch && matchesSkill && matchesCollege;
    })
    // Sort by match percentage (descending) if an opportunity is chosen, otherwise by name
    .sort((a, b) => activeOpp ? b.matchPercentage - a.matchPercentage : a.name.localeCompare(b.name));

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Candidate Search & Mapping</h2>
          <p className="text-sm text-slate-500">Screen verified student digital portfolios and run comparison analyses against active job profiles.</p>
        </div>

        {/* Job selector for comparison mapping */}
        {companyOpps.length > 0 && (
          <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400">Map against post:</span>
            <select
              value={compareOppId}
              onChange={(e) => setCompareOppId(e.target.value)}
              className="text-xs font-semibold bg-transparent text-slate-700 focus:outline-none"
            >
              {companyOpps.map(opp => (
                <option key={opp.id} value={opp.id}>{opp.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Filter panel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Name / Role search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, role, degree..."
            className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Skill filter */}
        <div className="relative">
          <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            placeholder="Filter by skill (e.g. DSA, Python, ML)..."
            className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Engineering College Filter */}
        <div className="relative">
          <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
          >
            <option value="All">All Engineering Colleges</option>
            <option value="IIT Delhi">IIT Delhi</option>
            <option value="IIT Bombay">IIT Bombay</option>
            <option value="IIT Madras">IIT Madras</option>
            <option value="IIT Kharagpur">IIT Kharagpur</option>
            <option value="NIT Trichy">NIT Trichy</option>
            <option value="BITS Pilani">BITS Pilani</option>
          </select>
        </div>

      </div>

      {/* Candidates List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs italic">
            No student profiles found matching your criteria.
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-0.5"
            >
              
              {/* Header Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-indigo-900 border border-slate-200">
                      {student.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">{student.name}</h4>
                      <span className="text-[9px] text-slate-400 block font-semibold truncate max-w-[120px]">{student.education.degree}</span>
                    </div>
                  </div>

                  {activeOpp && (
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      student.matchPercentage >= 80 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : student.matchPercentage >= 50 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {student.matchPercentage}% match
                    </span>
                  )}
                </div>

                {/* Engineering College Badge */}
                <div className="flex items-center space-x-1.5 text-[10px] text-indigo-700 bg-indigo-50/80 border border-indigo-100 px-2.5 py-1 rounded-lg font-semibold w-fit">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                  <span className="truncate">{student.institutionName || 'Indian Institute of Technology'}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Career</span>
                  <p className="text-xs font-semibold text-slate-700 truncate leading-snug">{student.targetRole}</p>
                </div>
              </div>

              {/* Mapped Skills Summary */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Top Skills Tags</span>
                <div className="flex flex-wrap gap-1">
                  {student.skills.slice(0, 4).map(skill => (
                    <span key={skill} className="bg-slate-50 text-slate-600 border border-slate-200/50 px-2 py-0.5 rounded text-[9px]">
                      {skill}
                    </span>
                  ))}
                  {student.skills.length > 4 && (
                    <span className="text-[9px] text-slate-400 font-bold px-1.5 py-0.5">+{student.skills.length - 4} more</span>
                  )}
                </div>
              </div>

              {/* Comparative match bar */}
              {activeOpp && (
                <div className="pt-2 border-t border-slate-100">
                  <ProgressBar value={student.matchPercentage} showPercentage={false} color="dynamic" />
                </div>
              )}

            </div>
          ))
        )}
      </div>

      {/* Student Detail Modal popup */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-slate-200 shadow-2xl flex flex-col relative animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-base text-indigo-700 border border-indigo-100">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-400">{selectedStudent.education.degree} • CGPA {selectedStudent.education.cgpa}</p>
                  <p className="text-[11px] font-semibold text-indigo-600 flex items-center space-x-1 mt-0.5">
                    <GraduationCap className="w-3 h-3 inline mr-1" />
                    <span>{selectedStudent.institutionName}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Target career */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Specialization Intent</span>
                <p className="text-xs font-semibold text-slate-700">{selectedStudent.targetRole}</p>
              </div>

              {/* Comparative mapping if opp active */}
              {activeOpp && (
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Skill Mapping match against {activeOpp.title}</h4>
                  <ProgressBar value={selectedStudent.matchPercentage} color="dynamic" />
                  
                  <div className="pt-2">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Detailed skill check</p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeOpp.requiredSkills.map(skill => {
                        const hasIt = selectedStudent.skills.includes(skill);
                        return (
                          <span
                            key={skill}
                            className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                              hasIt 
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                                : 'bg-rose-50 border-rose-100 text-rose-800'
                            }`}
                          >
                            <CheckCircle className={`w-3 h-3 ${hasIt ? 'text-emerald-500' : 'text-rose-400'}`} />
                            <span>{skill}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Skills taxonomy tags */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Full Skills Tag List</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.skills.map(skill => (
                    <span key={skill} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications verification */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Certifications</span>
                <div className="space-y-2">
                  {selectedStudent.certifications.map(cert => (
                    <div key={cert.id} className="flex justify-between items-center p-2.5 border border-slate-100 rounded-lg bg-slate-50/50">
                      <div>
                        <p className="text-xs font-bold text-slate-800">{cert.name}</p>
                        <p className="text-[9px] text-slate-400">{cert.issuer}</p>
                      </div>
                      <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold ${
                        cert.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Projects</span>
                <div className="space-y-2">
                  {selectedStudent.projects.map((proj, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs leading-relaxed">
                      <h4 className="font-bold text-slate-800">{proj.title}</h4>
                      <p className="text-slate-600 mt-1">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-end space-x-2 bg-slate-50">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default IndustrySearch;
