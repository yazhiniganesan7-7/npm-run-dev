import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, ChevronUp, FileText, CheckCircle2, MessageSquare, Clock, XCircle } from 'lucide-react';

const StudentApplications = () => {
  const { applications, opportunities, currentUser } = useApp();
  const [expandedAppId, setExpandedAppId] = useState(null);

  // Filter student's applications
  const studentApps = applications.filter(a => a.studentId === currentUser?.id);

  const toggleExpand = (appId) => {
    setExpandedAppId(expandedAppId === appId ? null : appId);
  };

  // Define steps for the stepper
  const steps = ['Applied', 'Shortlisted', 'Interview', 'Selected'];

  const getStepStatus = (currentStatus, stepName) => {
    const statuses = ['Applied', 'Shortlisted', 'Interview', 'Selected'];
    const currentIdx = statuses.indexOf(currentStatus);
    const stepIdx = statuses.indexOf(stepName);

    if (currentStatus === 'Rejected') {
      // Special treatment for rejection
      if (stepName === 'Applied') return 'completed';
      if (stepIdx < 3) return 'completed'; // Highlight path before rejection
      return 'rejected';
    }

    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'active';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Applications</h2>
        <p className="text-sm text-slate-500">Track and monitor your submission status and interview schedules.</p>
      </div>

      {studentApps.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs italic shadow-xs">
          You haven't applied to any opportunities yet.
        </div>
      ) : (
        <div className="space-y-4">
          {studentApps.map((app) => {
            const opp = opportunities.find(o => o.id === app.opportunityId);
            const isExpanded = expandedAppId === app.id;
            const currentStatus = app.status;

            return (
              <div key={app.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200 hover:shadow-md">
                
                {/* Main Card Row */}
                <div 
                  onClick={() => toggleExpand(app.id)}
                  className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{opp?.companyName}</span>
                      <h3 className="font-bold text-base text-slate-900 leading-tight">{opp?.title}</h3>
                      <p className="text-xs text-slate-400">Applied on {app.appliedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      currentStatus === 'Selected' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : currentStatus === 'Rejected' 
                        ? 'bg-rose-100 text-rose-800' 
                        : currentStatus === 'Interview' 
                        ? 'bg-amber-100 text-amber-800 font-bold' 
                        : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {currentStatus === 'Interview' ? 'Interviewing' : currentStatus}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details / Stepper & Timeline */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-slate-100 pt-6 space-y-8 bg-slate-50/40">
                    
                    {/* Visual Stepper */}
                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-4">Application Progress</p>
                      
                      <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto px-4">
                        {/* Connecting Line */}
                        <div className="absolute left-8 right-8 top-4 h-1 bg-slate-200 z-0" />
                        <div 
                          className="absolute left-8 top-4 h-1 bg-indigo-600 transition-all duration-500 ease-out z-0"
                          style={{
                            width: currentStatus === 'Rejected' 
                              ? '50%' 
                              : currentStatus === 'Applied' 
                              ? '0%' 
                              : currentStatus === 'Shortlisted' 
                              ? '33%' 
                              : currentStatus === 'Interview' 
                              ? '66%' 
                              : '100%'
                          }}
                        />

                        {/* Steps circles */}
                        {steps.map((step, idx) => {
                          const state = getStepStatus(currentStatus, step);
                          return (
                            <div key={step} className="flex flex-col items-center relative z-10 space-y-2">
                              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-xs transition-colors duration-300 ${
                                state === 'completed'
                                  ? 'bg-indigo-600 border-indigo-600 text-white'
                                  : state === 'active'
                                  ? 'bg-white border-indigo-600 text-indigo-600 ring-4 ring-indigo-50'
                                  : state === 'rejected' && step === 'Selected'
                                  ? 'bg-rose-500 border-rose-500 text-white'
                                  : 'bg-white border-slate-200 text-slate-400'
                              }`}>
                                {state === 'completed' ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : state === 'rejected' && step === 'Selected' ? (
                                  <XCircle className="w-4 h-4" />
                                ) : (
                                  idx + 1
                                )}
                              </div>
                              <span className={`text-[10px] font-semibold ${
                                state === 'active' 
                                  ? 'text-indigo-600 font-bold' 
                                  : state === 'rejected' && step === 'Selected' 
                                  ? 'text-rose-600 font-bold' 
                                  : 'text-slate-500'
                              }`}>
                                {state === 'rejected' && step === 'Selected' ? 'Rejected' : step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline Log and Feedback */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                      
                      {/* Recruiter Feedback */}
                      <div className="space-y-2 p-4 bg-white rounded-xl border border-slate-200">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                          <MessageSquare className="w-4 h-4 text-indigo-500" />
                          <span>Recruiter Notes & Feedback</span>
                        </h4>
                        <p className="text-xs text-slate-600 italic leading-relaxed pt-1">
                          "{app.feedback}"
                        </p>
                      </div>

                      {/* Detail Logs list */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span>Activity Timeline</span>
                        </h4>
                        <div className="space-y-3 relative pl-4 border-l border-slate-200 ml-2">
                          {app.timeline.map((event, idx) => (
                            <div key={idx} className="relative space-y-1">
                              {/* Left dot indicator */}
                              <div className="absolute -left-[20px] top-1.5 w-2 h-2 rounded-full bg-slate-400 border border-white" />
                              <div className="flex justify-between items-baseline">
                                <span className="text-xs font-semibold text-slate-800">{event.status}</span>
                                <span className="text-[10px] text-slate-400">{event.date}</span>
                              </div>
                              <p className="text-[11px] text-slate-500">{event.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentApplications;
