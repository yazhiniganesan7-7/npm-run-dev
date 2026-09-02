import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import KanbanBoard from '../../components/KanbanBoard';
import { FileSpreadsheet, Sparkles } from 'lucide-react';

const IndustryApplicants = () => {
  const { opportunities, currentUser } = useApp();
  const [searchParams] = useSearchParams();

  // Company opportunities
  const companyOpps = opportunities.filter(o => o.companyId === currentUser?.id);
  const [selectedOppId, setSelectedOppId] = useState('');

  // Handle routing link from Manage postings page
  useEffect(() => {
    const jobParamId = searchParams.get('job');
    if (jobParamId) {
      setSelectedOppId(jobParamId);
    } else if (companyOpps.length > 0 && !selectedOppId) {
      setSelectedOppId(companyOpps[0].id);
    }
  }, [searchParams, companyOpps]);

  const activeOpp = companyOpps.find(o => o.id === selectedOppId);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Applicant Pipeline Tracker</h2>
          <p className="text-sm text-slate-500">Track candidates across evaluation stages. Drag or select status dropdowns to advance candidates.</p>
        </div>

        {/* Dropdown selector for active job */}
        {companyOpps.length > 0 && (
          <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400">Listing:</span>
            <select
              value={selectedOppId}
              onChange={(e) => setSelectedOppId(e.target.value)}
              className="text-xs font-semibold bg-transparent text-slate-700 focus:outline-none"
            >
              {companyOpps.map(opp => (
                <option key={opp.id} value={opp.id}>
                  {opp.title} ({opp.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {companyOpps.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs shadow-xs italic">
          No opportunities created to track applicants. Post a position first.
        </div>
      ) : activeOpp ? (
        <div className="space-y-4">
          
          {/* Active Job Meta Info */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Currently tracking pipeline for</span>
              <h3 className="font-bold text-sm text-indigo-900">{activeOpp.title}</h3>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
              <span>{activeOpp.location}</span>
              <span>•</span>
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">{activeOpp.type}</span>
            </div>
          </div>

          {/* Kanban board component */}
          <KanbanBoard opportunityId={activeOpp.id} />

        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs shadow-xs italic">
          Please select an opportunity posting from the dropdown to load the applicants board.
        </div>
      )}
    </div>
  );
};

export default IndustryApplicants;
