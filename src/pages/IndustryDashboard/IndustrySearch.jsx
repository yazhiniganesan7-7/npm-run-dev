import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProgressBar from '../../components/ProgressBar';
import {
  Search,
  GraduationCap,
  CheckCircle,
  X,
  Layers,
  Star,
  CheckCircle2,
  AlertTriangle,
  FolderGit2
} from 'lucide-react';

const IndustrySearch = () => {
  const {
    students,
    opportunities,
    currentUser,
    institutions,
    applications,
    shortlistCandidate
  } = useApp();

  const companyOpps = opportunities.filter(o => o.companyId === currentUser?.id);
  const availableOpps = companyOpps.length > 0 ? companyOpps : opportunities;

  const [compareOppId, setCompareOppId] = useState(availableOpps[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('All');

  // Detailed profile modal state
  const [selectedStudent, setSelectedStudent] = useState(null);

  const activeOpp = opportunities.find(o => o.id === compareOppId) || availableOpps[0];

  // Calculate detailed match for a candidate against active job
  const getCandidateMatch = (student, opp) => {
    if (!student || !opp) return { score: 0, verifiedMatches: [], missingSkills: [] };
    const req = opp.requiredSkills || [];
    const verifiedList = student.verifiedSkills || [];
    const studentAllSkills = student.skills || [];

    const verifiedMatches = req.filter(s =>
      verifiedList.some(v => v.name.toLowerCase() === s.toLowerCase())
    );

    const claimedMatches = req.filter(s =>
      !verifiedMatches.includes(s) &&
      studentAllSkills.some(cs => cs.toLowerCase() === s.toLowerCase())
    );

    const missingSkills = req.filter(s =>
      !verifiedMatches.includes(s) && !claimedMatches.includes(s)
    );

    // Score: 100% weight for verified, 60% for claimed
    const score = req.length > 0
      ? Math.round(((verifiedMatches.length * 1.0 + claimedMatches.length * 0.6) / req.length) * 100)
      : 85;

    return { score, verifiedMatches, missingSkills };
  };

  // Filter and sort students (strictly ranked descending by match score)
  const rankedStudents = students
    .map(student => {
      const match = getCandidateMatch(student, activeOpp);
      return {
        ...student,
        matchPercentage: match.score,
        verifiedMatches: match.verifiedMatches,
        missingSkills: match.missingSkills
      };
    })
    .filter(student => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.targetRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.education.degree.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSkill =
        skillFilter === '' ||
        student.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));
      const matchesCollege =
        selectedCollege === 'All' ||
        student.institutionName?.toLowerCase().includes(selectedCollege.toLowerCase()) ||
        student.institutionId === selectedCollege;
      return matchesSearch && matchesSkill && matchesCollege;
    })
    // Rank descending by match score
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div className="space-y-6">
      
      {/* Title & Job Target Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Recruiter Talent Engine
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Candidates & Matching
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Candidates automatically ranked by match score with verified skills, projects, and 1-click shortlisting.
          </p>
        </div>

        {/* Job selector for comparison mapping */}
        {availableOpps.length > 0 && (
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap">Rank Against Job:</span>
            <select
              value={compareOppId}
              onChange={(e) => setCompareOppId(e.target.value)}
              className="text-xs font-bold bg-transparent text-indigo-900 focus:outline-none cursor-pointer"
            >
              {availableOpps.map(opp => (
                <option key={opp.id} value={opp.id}>
                  {opp.companyName ? `${opp.companyName} - ` : ''}{opp.title}
                </option>
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
            className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
            className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Engineering College Filter */}
        <div className="relative">
          <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
          >
            <option value="All">All Engineering Colleges</option>
            {institutions?.map(inst => (
              <option key={inst.id} value={inst.name}>{inst.name.split(' (')[0]}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Active Job Target Banner */}
      {activeOpp && (
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Active Ranking Target Position
            </span>
            <h3 className="text-base font-black tracking-tight">{activeOpp.title}</h3>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold mr-1">Required Skills:</span>
              {activeOpp.requiredSkills.map(sk => (
                <span key={sk} className="bg-white/15 text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 flex-shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Ranked Candidates</span>
            <span className="text-2xl font-black text-white">{rankedStudents.length} Profiles</span>
          </div>
        </div>
      )}

      {/* Candidates List Grid (Ranked) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rankedStudents.length === 0 ? (
          <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs italic">
            No candidate profiles found matching your criteria.
          </div>
        ) : (
          rankedStudents.map((student, rankIdx) => {
            const isShortlisted = applications.some(
              a => a.studentId === student.id && a.opportunityId === activeOpp?.id && a.status === 'Shortlisted'
            );

            return (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-0.5 relative overflow-hidden"
              >
                
                {/* Header Info */}
                <div className="space-y-3">
                  
                  {/* Top Row: Rank, Avatar, Match Score */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-slate-100 to-indigo-50 flex items-center justify-center font-black text-sm text-indigo-900 border border-slate-200 shadow-2xs">
                          {student.avatar}
                        </div>
                        <span className="absolute -top-1.5 -left-1.5 bg-slate-900 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-xs">
                          #{rankIdx + 1}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-tight">{student.name}</h4>
                        <span className="text-[10px] text-slate-500 block font-semibold truncate max-w-[130px]">
                          {student.education.degree}
                        </span>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-black shadow-2xs ${
                        student.matchPercentage >= 80 
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' 
                          : student.matchPercentage >= 50 
                          ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {student.matchPercentage}% Match
                      </span>
                    </div>
                  </div>

                  {/* Engineering College Badge */}
                  <div className="flex items-center space-x-1.5 text-[10px] text-indigo-700 bg-indigo-50/80 border border-indigo-100 px-2.5 py-1 rounded-lg font-semibold w-fit">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span className="truncate">{student.institutionName}</span>
                  </div>

                  {/* Match Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>Match Quality</span>
                      <span className="text-indigo-600">{student.matchPercentage}%</span>
                    </div>
                    <ProgressBar value={student.matchPercentage} showPercentage={false} color="dynamic" />
                  </div>

                  {/* 1. Verified Skills Display */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Skills ({student.verifiedSkills?.length || 0})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(student.verifiedSkills || []).slice(0, 3).map(sk => (
                        <span
                          key={sk.name}
                          className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded text-[9px] font-bold flex items-center space-x-1"
                        >
                          <span>{sk.name}</span>
                          <span className="text-[8px] bg-emerald-100 text-emerald-900 px-1 rounded font-extrabold uppercase">
                            {sk.level}
                          </span>
                        </span>
                      ))}
                      {(student.verifiedSkills?.length || 0) > 3 && (
                        <span className="text-[9px] text-slate-400 font-bold px-1 py-0.5">
                          +{student.verifiedSkills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 2. Missing Skills Display */}
                  {student.missingSkills?.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-rose-800 font-bold uppercase tracking-wider flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                        <span>Missing Skills ({student.missingSkills.length})</span>
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {student.missingSkills.slice(0, 2).map(sk => (
                          <span
                            key={sk}
                            className="bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded text-[9px] font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                        {student.missingSkills.length > 2 && (
                          <span className="text-[9px] text-slate-400 font-semibold px-1 py-0.5">
                            +{student.missingSkills.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 3. Featured Project Display */}
                  {student.projects && student.projects[0] && (
                    <div className="space-y-1 pt-1 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                        <FolderGit2 className="w-3 h-3 text-slate-400" />
                        <span>Project:</span>
                      </span>
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {student.projects[0].title}
                      </p>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                        {student.projects[0].desc}
                      </p>
                    </div>
                  )}

                </div>

                {/* 4. One-Click Shortlist Button */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (activeOpp && !isShortlisted) {
                        shortlistCandidate(student.id, activeOpp.id);
                      }
                    }}
                    disabled={isShortlisted}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs ${
                      isShortlisted
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 cursor-default'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 hover:shadow-md'
                    }`}
                  >
                    {isShortlisted ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Shortlisted</span>
                      </>
                    ) : (
                      <>
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                        <span>Shortlist Candidate (1-Click)</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })
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
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Match against {activeOpp.title}
                    </h4>
                    <span className="text-xs font-black text-indigo-600">
                      {selectedStudent.matchPercentage}% Match
                    </span>
                  </div>
                  <ProgressBar value={selectedStudent.matchPercentage} color="dynamic" />
                  
                  <div className="pt-2">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Required Skills Status</p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeOpp.requiredSkills.map(skill => {
                        const vObj = selectedStudent.verifiedSkills?.find(v => v.name.toLowerCase() === skill.toLowerCase());
                        const hasClaimed = selectedStudent.skills?.includes(skill);
                        return (
                          <span
                            key={skill}
                            className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-bold border ${
                              vObj
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                : hasClaimed
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                                : 'bg-rose-50 border-rose-200 text-rose-800'
                            }`}
                          >
                            {vObj ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <X className="w-3.5 h-3.5 text-rose-500" />
                            )}
                            <span>{skill}</span>
                            {vObj && (
                              <span className="text-[9px] bg-emerald-100 text-emerald-900 px-1 rounded font-extrabold uppercase ml-1">
                                {vObj.level}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Verified skills list */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Verified Skills Portfolio</span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedStudent.verifiedSkills || []).map(sk => (
                    <span
                      key={sk.name}
                      className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{sk.name}</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-900 px-1 rounded font-black uppercase ml-1">
                        {sk.level} ({sk.score}%)
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects List */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Engineering Projects</span>
                <div className="space-y-3">
                  {selectedStudent.projects?.map((proj, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                      <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <FolderGit2 className="w-4 h-4 text-indigo-600" />
                        <span>{proj.title}</span>
                      </h4>
                      <p className="text-slate-600 leading-relaxed">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications verification */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Certifications</span>
                <div className="space-y-2">
                  {selectedStudent.certifications?.map(cert => (
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

            </div>

            {/* Modal Footer with One-Click Shortlist Button */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-white hover:bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs border border-slate-200 transition-colors"
              >
                Close Profile
              </button>

              {activeOpp && (
                <button
                  onClick={() => {
                    shortlistCandidate(selectedStudent.id, activeOpp.id);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-md transition-colors flex items-center space-x-1.5"
                >
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span>Shortlist for {activeOpp.title}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default IndustrySearch;
