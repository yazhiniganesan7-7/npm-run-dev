import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Trash2, AlertTriangle, FileSpreadsheet, Eye, Plus, PowerOff, Sparkles } from 'lucide-react';

const IndustryManageOpportunities = () => {
  const { opportunities, applications, deleteOpportunity, updateOpportunity, currentUser } = useApp();

  if (!currentUser) return <div className="text-center py-12">Loading...</div>;

  // Filter company postings
  const companyOpps = opportunities.filter(o => o.companyId === currentUser.id);

  const handleToggleStatus = (oppId, currentStatus) => {
    const nextStatus = currentStatus === 'Open' ? 'Closed' : 'Open';
    updateOpportunity(oppId, { status: nextStatus });
  };

  const getApplicantCount = (oppId) => {
    return applications.filter(a => a.opportunityId === oppId).length;
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Job Postings</h2>
          <p className="text-sm text-slate-500">Edit, close, or delete your active internship and job placement listings.</p>
        </div>
        <Link
          to="/industry/post"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors text-xs flex items-center space-x-1 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </Link>
      </div>

      {companyOpps.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs shadow-xs space-y-4">
          <p className="italic">You haven't posted any job opportunities yet.</p>
          <Link
            to="/industry/post"
            className="text-xs font-semibold text-emerald-600 hover:underline inline-block"
          >
            Create your first posting now
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              
              {/* Table Header */}
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4">Opportunity details</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Stipend</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Applicants</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {companyOpps.map((opp) => {
                  const applicantCount = getApplicantCount(opp.id);
                  const isOpen = opp.status === 'Open';

                  return (
                    <tr key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                      
                      {/* Title & location */}
                      <td className="px-6 py-4 max-w-[200px]">
                        <h4 className="font-bold text-slate-900 truncate">{opp.title}</h4>
                        <span className="text-[10px] text-slate-400 block truncate mt-0.5">{opp.location}</span>
                      </td>

                      {/* Type format */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-600">{opp.type}</span>
                      </td>

                      {/* Stipend */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-800">{opp.stipend.split(' ')[0]}</span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                          isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {opp.status}
                        </span>
                      </td>

                      {/* Applicant Count Link */}
                      <td className="px-6 py-4 text-center">
                        <Link 
                          to={`/industry/applicants?job=${opp.id}`}
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-slate-600`}
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                          <span>{applicantCount} view</span>
                        </Link>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right space-x-2">
                        {/* Toggle Status */}
                        <button
                          onClick={() => handleToggleStatus(opp.id, opp.status)}
                          title={isOpen ? 'Close position' : 'Open position'}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isOpen 
                              ? 'border-slate-200 hover:bg-amber-50 text-amber-600' 
                              : 'border-slate-200 hover:bg-emerald-50 text-emerald-600'
                          }`}
                        >
                          <PowerOff className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Opportunity */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${opp.title}"?`)) {
                              deleteOpportunity(opp.id);
                            }
                          }}
                          title="Delete posting"
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryManageOpportunities;
