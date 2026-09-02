import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Handshake, FileText, Plus, X, Globe, Mail, Sparkles } from 'lucide-react';

const AcademiaCollabs = () => {
  const { collaborations, addCollaboration, companies } = useApp();
  const [showInviteForm, setShowInviteForm] = useState(false);

  // Invite form states
  const [selectedCompId, setSelectedCompanyId] = useState(companies[0]?.id || '');
  const [focus, setFocus] = useState('');
  const [recruiterMail, setRecruiterMail] = useState('');

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!focus || !recruiterMail) return;

    const company = companies.find(c => c.id === selectedCompId);
    if (!company) return;

    addCollaboration({
      institutionName: 'National Institute of Ayurveda (NIA)',
      companyName: company.name,
      focus
    });

    setShowInviteForm(false);
    setFocus('');
    setRecruiterMail('');
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Industry Collaboration Hub</h2>
          <p className="text-sm text-slate-500">Establish and review formal MoUs, student exchanges, and joint clinical validation programs.</p>
        </div>
        <button
          onClick={() => setShowInviteForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors text-xs flex items-center space-x-1 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Industry Partner</span>
        </button>
      </div>

      {/* Grid of signed collaborations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collaborations.map((collab) => (
          <div key={collab.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 p-2 rounded-xl">
                  <Handshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Corporate MoU</h3>
                  <h4 className="font-bold text-sm text-slate-800 leading-snug">{collab.companyName}</h4>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scope of Collaboration</span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{collab.focus}</p>
              </div>
            </div>

            {/* Document download */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>MoU Signed: {collab.dateSigned}</span>
              <a
                href={`#download-${collab.mouDocument}`}
                onClick={(e) => { e.preventDefault(); alert(`Downloading signed copy: ${collab.mouDocument}`); }}
                className="inline-flex items-center space-x-1 text-indigo-600 hover:underline"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Invite Corporate Partner Modal */}
      {showInviteForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div className="space-y-0.5">
                <h3 className="font-bold text-sm">Propose MoU Partnership</h3>
                <p className="text-[10px] text-slate-400">Establish corporate channels for student placements</p>
              </div>
              <button
                onClick={() => setShowInviteForm(false)}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleInviteSubmit} className="p-6 space-y-4">
              
              {/* Select Corporate */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Select Corporate Partner</label>
                <select
                  value={selectedCompId}
                  onChange={(e) => setSelectedCompanyId(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold"
                >
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.sector})</option>
                  ))}
                </select>
              </div>

              {/* Recruiter Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Corporate Recruiter Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    value={recruiterMail}
                    onChange={(e) => setRecruiterMail(e.target.value)}
                    placeholder="e.g. hr@himalayawellness.com"
                    required
                    className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Focus Scope */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Scope of Agreement (MoU Focus)</label>
                <textarea
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  rows={4}
                  required
                  placeholder="Describe joint goals, student sponsorship terms, and research resources..."
                  className="w-full border border-slate-300 rounded-lg p-3 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2 bg-slate-50 -mx-6 -mb-6 p-4">
                <button
                  type="button"
                  onClick={() => setShowInviteForm(false)}
                  className="text-slate-500 hover:text-slate-700 px-4 py-2 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-colors"
                >
                  Send Invitation
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AcademiaCollabs;
