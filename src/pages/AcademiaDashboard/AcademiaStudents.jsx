import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, GraduationCap, X, CheckCircle, ShieldAlert, Award, FileText } from 'lucide-react';

const AcademiaStudents = () => {
  const { students } = useApp();
  
  const [search, setSearch] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('All');
  
  // Modal state
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter students list
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) ||
                          student.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    
    let matchesDegree = true;
    if (degreeFilter !== 'All') {
      if (degreeFilter === 'CSE') matchesDegree = student.education.degree.includes('Computer Science');
      else if (degreeFilter === 'AI_DS') matchesDegree = student.education.degree.includes('Data Science') || student.education.degree.includes('Artificial Intelligence');
      else if (degreeFilter === 'EEE') matchesDegree = student.education.degree.includes('Electrical');
      else if (degreeFilter === 'MECH') matchesDegree = student.education.degree.includes('Mechanical');
      else if (degreeFilter === 'MTECH') matchesDegree = student.education.degree.includes('M.Tech');
    }

    return matchesSearch && matchesDegree;
  });

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Student Directory</h2>
        <p className="text-sm text-slate-500">Monitor and search academic records, verified skills, and job readiness status across engineering departments.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Name / Skill search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students by name, skill tag..."
            className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Degree filter */}
        <div>
          <select
            value={degreeFilter}
            onChange={(e) => setDegreeFilter(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold"
          >
            <option value="All">All Engineering Degrees</option>
            <option value="CSE">B.Tech Computer Science</option>
            <option value="AI_DS">B.Tech Data Science & AI</option>
            <option value="EEE">B.Tech Electrical & Electronics</option>
            <option value="MECH">B.Tech Mechanical & Automation</option>
            <option value="MTECH">M.Tech Software Systems</option>
          </select>
        </div>

      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Degree & Year</th>
                <th className="px-6 py-4">CGPA</th>
                <th className="px-6 py-4">Skills Count</th>
                <th className="px-6 py-4">Certs Verified</th>
                <th className="px-6 py-4 text-right">Portfolio</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-400 italic">
                    No student records matching filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const verifiedCerts = student.certifications.filter(c => c.status === 'Verified').length;
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                      
                      {/* Name */}
                      <td className="px-6 py-4 flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-700 text-xs border border-indigo-100">
                          {student.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{student.name}</h4>
                          <span className="text-[9px] text-slate-400 block truncate mt-0.5">{student.email}</span>
                        </div>
                      </td>

                      {/* Degree */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-600 block">{student.education.degree.split(' ')[0]}</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5">{student.education.year}</span>
                      </td>

                      {/* CGPA */}
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800">{student.education.cgpa}</span>
                      </td>

                      {/* Skills count */}
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                          {student.skills.length} Skills
                        </span>
                      </td>

                      {/* Verified Certs */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center space-x-0.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                          verifiedCerts > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {verifiedCerts} Verified
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold px-3 py-1.5 rounded-lg transition-colors text-[10px]"
                        >
                          View Card
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Student Portfolio Detail Modal popup */}
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
                  <p className="text-xs text-slate-400">{selectedStudent.education.degree} • Year: {selectedStudent.education.year}</p>
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
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Career Path</span>
                <p className="text-xs font-semibold text-slate-700">{selectedStudent.targetRole}</p>
              </div>

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
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Certifications Verification statuses</span>
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

export default AcademiaStudents;
