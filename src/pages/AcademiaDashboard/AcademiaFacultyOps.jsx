import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Calendar, MapPin, CheckCircle, HelpCircle } from 'lucide-react';

const AcademiaFacultyOps = () => {
  const { facultyOpportunities, expressInterestInFacultyOpportunity } = useApp();

  const handleExpressInterest = (fopId) => {
    // Simulated faculty email representing the college dean/faculty
    const facultyEmail = 'prof.sharma@nia.edu.in';
    expressInterestInFacultyOpportunity(fopId, facultyEmail);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Faculty & Research Opportunities</h2>
        <p className="text-sm text-slate-500">Apply for industry-sponsored research fellowships, summer sabbaticals, and Faculty Development Programs (FDPs).</p>
      </div>

      {/* Grid of opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {facultyOpportunities.map((fop) => {
          // Check if already applied
          const hasExpressedInterest = fop.appliedFaculty.includes('prof.sharma@nia.edu.in');

          return (
            <div key={fop.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-5 hover:shadow-md transition-all">
              
              <div className="space-y-3">
                {/* Meta details */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                      {fop.type}
                    </span>
                    <span className="text-xs text-slate-400 font-bold uppercase">{fop.companyName}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">{fop.title}</h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">{fop.description}</p>

                {/* Scope parameters */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl text-center text-xs font-semibold text-slate-700">
                  <div className="border-r border-slate-200 py-1">
                    <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wider">Duration</span>
                    <span className="text-[11px] text-slate-800">{fop.duration}</span>
                  </div>
                  <div className="border-r border-slate-200 py-1">
                    <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wider">Stipend</span>
                    <span className="text-[11px] text-slate-800 truncate block px-1">{fop.stipend.split(' ')[0]}</span>
                  </div>
                  <div className="py-1">
                    <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wider">Location</span>
                    <span className="text-[11px] text-slate-800 truncate block px-1">{fop.location}</span>
                  </div>
                </div>
              </div>

              {/* Express Interest Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400">Deadline: {fop.deadline}</span>
                {hasExpressedInterest ? (
                  <span className="inline-flex items-center space-x-1 bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg font-bold text-xs">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Interest Registered</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleExpressInterest(fop.id)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-all"
                  >
                    Express Interest
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AcademiaFacultyOps;
