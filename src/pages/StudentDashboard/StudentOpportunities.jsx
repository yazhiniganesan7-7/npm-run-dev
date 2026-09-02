import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ProgressBar from '../../components/ProgressBar';
import { Search, MapPin, DollarSign, Calendar, Briefcase, Filter, X, Check, ShieldAlert, AlertCircle } from 'lucide-react';

const StudentOpportunities = () => {
  const { opportunities, currentUser, applyForOpportunity, applications } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [selectedMode, setSelectedMode] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [minStipend, setMinStipend] = useState(0);

  // Active Job Detail state
  const [selectedOppId, setSelectedOppId] = useState(null);

  // Synchronize with URL search params (e.g., clicking "View & Apply" from Dashboard Home)
  useEffect(() => {
    const oppId = searchParams.get('open');
    if (oppId) {
      setSelectedOppId(oppId);
      // Clean query parameter after reading
      searchParams.delete('open');
      setSearchParams(searchParams);
    } else if (opportunities.length > 0 && !selectedOppId) {
      setSelectedOppId(opportunities[0].id);
    }
  }, [searchParams, opportunities]);

  // Filter listings
  const filteredOpps = opportunities.filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(search.toLowerCase()) || 
                          opp.companyName.toLowerCase().includes(search.toLowerCase()) ||
                          opp.requiredSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesMode = selectedMode === 'All' || opp.mode === selectedMode;
    const matchesType = selectedType === 'All' || opp.type === selectedType;
    const matchesStipend = opp.stipendNum >= minStipend;
    
    return matchesSearch && matchesMode && matchesType && matchesStipend;
  });

  const activeOpp = opportunities.find(o => o.id === selectedOppId) || filteredOpps[0];

  // Helper matching percentage
  const calculateMatchDetails = (opp) => {
    if (!opp || !currentUser) return { score: 0, verified: [], claimed: [], missing: [] };
    const req = opp.requiredSkills || [];
    const verifiedList = currentUser.verifiedSkills || [];
    const claimedList = currentUser.claimedSkills || [];

    const verified = req.filter(s => verifiedList.some(v => v.name.toLowerCase() === s.toLowerCase()));
    const claimed = req.filter(s => !verified.includes(s) && (
      claimedList.some(c => c.toLowerCase() === s.toLowerCase()) ||
      (currentUser.skills || []).some(cs => cs.toLowerCase() === s.toLowerCase())
    ));
    const missing = req.filter(s => !verified.includes(s) && !claimed.includes(s));
    
    // 100% weight for verified, 50% for claimed
    const score = req.length > 0 ? Math.round(((verified.length * 1.0 + claimed.length * 0.5) / req.length) * 100) : 100;
    
    return { score, verified, claimed, missing };
  };

  const matchDetails = calculateMatchDetails(activeOpp);

  // Check if student already applied to active opp
  const hasApplied = activeOpp && applications.some(a => a.studentId === currentUser?.id && a.opportunityId === activeOpp.id);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Internship & Placement Board</h2>
        <p className="text-sm text-slate-500">Search and filter active opportunities from partnered technology, software, and engineering firms.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, skills..."
            className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Mode */}
        <div>
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold"
          >
            <option value="All">All Modes (Remote/Onsite)</option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold"
          >
            <option value="All">All Formats (Internship/Job)</option>
            <option value="Internship">Internship</option>
            <option value="Placement">Placement</option>
          </select>
        </div>

        {/* Stipend Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Stipend Filter</span>
            <span>Min ₹{minStipend.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="40000"
            step="2000"
            value={minStipend}
            onChange={(e) => setMinStipend(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

      </div>

      {/* Main Board Layout (Split screen) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Side: Opportunity Cards List */}
        <div className="lg:col-span-2 space-y-4 max-h-[700px] overflow-y-auto pr-1">
          {filteredOpps.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-xs italic">
              No opportunities match your filter settings
            </div>
          ) : (
            filteredOpps.map((opp) => {
              const oppMatch = calculateMatchDetails(opp);
              const isSelected = selectedOppId === opp.id;
              const hasAppliedToCard = applications.some(a => a.studentId === currentUser?.id && a.opportunityId === opp.id);

              return (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOppId(opp.id)}
                  className={`bg-white rounded-xl border p-5 shadow-xs cursor-pointer transition-all duration-200 relative overflow-hidden ${
                    isSelected 
                      ? 'border-indigo-600 ring-2 ring-indigo-500/10 shadow-md' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">{opp.companyName}</span>
                      <h4 className="font-bold text-sm text-slate-800 mt-1 leading-snug">{opp.title}</h4>
                    </div>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      oppMatch.score >= 80 ? 'bg-emerald-100 text-emerald-800' : oppMatch.score >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {oppMatch.score}% Match
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-slate-500 mt-3">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[120px]">{opp.location}</span>
                    </span>
                    <span className="flex items-center space-x-0.5">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.stipend.split(' ')[0]}</span>
                    </span>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{opp.type} • {opp.duration}</span>
                    {hasAppliedToCard && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded border border-slate-200">
                        Applied
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Active Opportunity Detail Drawer */}
        <div className="lg:col-span-3">
          {activeOpp ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 sticky top-24">
              
              {/* Header */}
              <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold block">{activeOpp.companyName}</span>
                  <h3 className="text-xl font-black text-slate-900 mt-1 leading-snug">{activeOpp.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 font-medium">
                    <span className="bg-slate-100 px-2 py-1 rounded text-[10px] text-slate-600 font-semibold">{activeOpp.type}</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeOpp.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Deadline: {activeOpp.deadline}</span>
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl font-bold flex flex-col items-center justify-center border ${
                  matchDetails.score >= 80 ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : matchDetails.score >= 50 ? 'bg-amber-50 border-amber-100 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <span className="text-2xl font-black">{matchDetails.score}%</span>
                  <span className="text-[8px] uppercase tracking-wider block mt-0.5">Skill Fit</span>
                </div>
              </div>

              {/* Core Parameters Row */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-center space-y-0.5 border-r border-slate-200">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Stipend</span>
                  <span className="text-xs font-bold text-slate-800">{activeOpp.stipend}</span>
                </div>
                <div className="text-center space-y-0.5 border-r border-slate-200">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Duration</span>
                  <span className="text-xs font-bold text-slate-800">{activeOpp.duration}</span>
                </div>
                <div className="text-center space-y-0.5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Listing Mode</span>
                  <span className="text-xs font-bold text-slate-800">{activeOpp.mode}</span>
                </div>
              </div>

              {/* Skill Mapping Analysis */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Skill Mapping Breakdown</h4>
                <div className="space-y-3 p-4 border border-slate-100 rounded-xl bg-slate-50/20">
                  <ProgressBar value={matchDetails.score} label="Overall Match Level" color="dynamic" />
                  
                  <div className="pt-2 space-y-2">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Required Skills Breakdown</p>
                    
                    {/* Verified Skills */}
                    {matchDetails.verified.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Verified Skills:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {matchDetails.verified.map(skill => {
                            const vObj = currentUser?.verifiedSkills?.find(v => v.name.toLowerCase() === skill.toLowerCase());
                            return (
                              <span key={skill} className="inline-flex items-center space-x-1 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md text-xs font-bold">
                                <Check className="w-3 h-3 text-emerald-600" />
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
                    )}

                    {/* Claimed Skills */}
                    {matchDetails.claimed.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider block">Claimed (Needs 5-Q Test):</span>
                        <div className="flex flex-wrap gap-1.5">
                          {matchDetails.claimed.map(skill => (
                            <Link
                              key={skill}
                              to="/student/assessment"
                              className="inline-flex items-center space-x-1 bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 px-2 py-0.5 rounded-md text-xs font-bold transition-colors"
                              title="Click to take 5-question test"
                            >
                              <span>{skill}</span>
                              <span className="text-[9px] bg-indigo-100 text-indigo-800 px-1 rounded font-extrabold">Verify Test →</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Missing Skills */}
                    {matchDetails.missing.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">Missing Skills:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {matchDetails.missing.map(skill => (
                            <span key={skill} className="inline-flex items-center space-x-1 bg-rose-50 border border-rose-200 text-rose-800 px-2 py-0.5 rounded-md text-xs font-medium">
                              <X className="w-3 h-3 text-rose-600" />
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {matchDetails.missing.length > 0 && (
                      <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between">
                        <span className="text-[11px] text-rose-600 font-medium">
                          {matchDetails.missing.length} missing skill{matchDetails.missing.length > 1 ? 's' : ''} detected
                        </span>
                        <Link
                          to="/student/assessment?tab=plan"
                          className="inline-flex items-center space-x-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
                        >
                          <span>Start 30-Day Plan to Qualify</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Description</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{activeOpp.description}</p>
              </div>

              {/* Application CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {hasApplied ? (
                  <div className="flex items-center space-x-2 text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2.5 rounded-xl w-full text-center justify-center font-bold text-xs">
                    <Check className="w-4.5 h-4.5" />
                    <span>Application Submitted Successfully</span>
                  </div>
                ) : (
                  <button
                    onClick={() => applyForOpportunity(currentUser.id, activeOpp.id)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-md transition-colors text-xs"
                  >
                    Apply Now
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs italic">
              Select an opportunity to view its details
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default StudentOpportunities;
