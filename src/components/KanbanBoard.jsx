import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ArrowLeft, MessageSquare, Check, X, ShieldAlert } from 'lucide-react';

const KanbanBoard = ({ opportunityId }) => {
  const { applications, students, opportunities, updateApplicationStatus } = useApp();

  // Filter applications for this job
  const jobApplications = applications.filter(a => a.opportunityId === opportunityId);
  const opp = opportunities.find(o => o.id === opportunityId);

  const columns = [
    { id: 'Applied', title: 'Applied', color: 'bg-slate-100 border-t-slate-400 text-slate-800' },
    { id: 'Shortlisted', title: 'Shortlisted', color: 'bg-indigo-50 border-t-indigo-400 text-indigo-800' },
    { id: 'Interview', title: 'Interviewing', color: 'bg-amber-50 border-t-amber-400 text-amber-800' },
    { id: 'Selected', title: 'Selected', color: 'bg-emerald-50 border-t-emerald-400 text-emerald-800' },
    { id: 'Rejected', title: 'Rejected', color: 'bg-rose-50 border-t-rose-400 text-rose-800' },
  ];

  // Helper matching percentage
  const calculateMatchPercentage = (student, opp) => {
    if (!student || !opp) return 0;
    const reqSkills = opp.requiredSkills || [];
    const studentSkills = student.skills || [];
    if (reqSkills.length === 0) return 100;
    const matches = reqSkills.filter(s => studentSkills.includes(s));
    return Math.round((matches.length / reqSkills.length) * 100);
  };

  const moveStatus = (appId, currentStatus, direction) => {
    const statuses = ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];
    const idx = statuses.indexOf(currentStatus);
    
    let newStatus = currentStatus;
    if (direction === 'forward' && idx < statuses.length - 1) {
      // Don't go from Selected to Rejected or vice versa directly without going back
      newStatus = statuses[idx + 1];
    } else if (direction === 'backward' && idx > 0) {
      newStatus = statuses[idx - 1];
    } else if (direction === 'reject') {
      newStatus = 'Rejected';
    } else if (direction === 'select') {
      newStatus = 'Selected';
    }

    const feedbacks = {
      Shortlisted: 'Profile screened. Shortlisted for technical assessments.',
      Interview: 'Scheduled for video panel interview round.',
      Selected: 'Congratulations, you have been selected! Sending onboarding schedule.',
      Rejected: 'Thank you for your interest. We will not be moving forward at this time.',
      Applied: 'Application returned to review state.'
    };

    updateApplicationStatus(appId, newStatus, feedbacks[newStatus]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
      {columns.map(col => {
        const colApps = jobApplications.filter(a => a.status === col.id);
        return (
          <div key={col.id} className="bg-slate-100/60 rounded-xl p-3 border border-slate-200 min-h-[500px] flex flex-col">
            {/* Column Header */}
            <div className={`p-2.5 rounded-lg border-t-4 shadow-xs font-semibold text-xs flex justify-between items-center ${col.color} mb-3`}>
              <span>{col.title}</span>
              <span className="bg-white/70 px-1.5 py-0.5 rounded-md text-[10px]">{colApps.length}</span>
            </div>

            {/* Column Body / Cards */}
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[600px] pr-1">
              {colApps.length === 0 ? (
                <div className="text-center text-slate-400 py-8 text-xs italic">
                  No applicants here
                </div>
              ) : (
                colApps.map(app => {
                  const student = students.find(s => s.id === app.studentId);
                  if (!student) return null;
                  const match = calculateMatchPercentage(student, opp);

                  return (
                    <div key={app.id} className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs hover:shadow-md transition-all duration-200">
                      
                      {/* Name & Match */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-xs text-slate-800">{student.name}</h4>
                          <p className="text-[10px] text-slate-500 leading-tight truncate max-w-[110px]">{student.education.degree}</p>
                        </div>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          match >= 80 ? 'bg-emerald-100 text-emerald-800' : match >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {match}% Match
                        </span>
                      </div>

                      {/* Skills match summary */}
                      <div className="mb-3">
                        <p className="text-[9px] text-slate-400 uppercase font-medium">Top Skills</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {student.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="bg-slate-100 text-slate-600 px-1 py-0.5 rounded text-[9px]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Dropdown status update */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.id, e.target.value, `Status updated to ${e.target.value}`)}
                          className="text-[10px] font-medium border border-slate-200 rounded px-1.5 py-0.5 bg-slate-50 text-slate-700 focus:outline-none"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interview">Interviewing</option>
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                        </select>

                        {/* Fast Shift Buttons */}
                        <div className="flex items-center space-x-1">
                          {app.status !== 'Applied' && (
                            <button
                              onClick={() => moveStatus(app.id, app.status, 'backward')}
                              title="Move back"
                              className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {app.status !== 'Selected' && app.status !== 'Rejected' && (
                            <>
                              <button
                                onClick={() => moveStatus(app.id, app.status, 'forward')}
                                title="Advance"
                                className="p-1 hover:bg-slate-100 rounded text-indigo-600 transition-colors"
                              >
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => moveStatus(app.id, app.status, 'reject')}
                                title="Reject"
                                className="p-1 hover:bg-rose-50 rounded text-rose-500 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
