import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Save, Globe, MapPin, Layers } from 'lucide-react';

const IndustryProfile = () => {
  const { currentUser, updateCompanyProfile } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [sector, setSector] = useState(currentUser?.sector || 'Ayush / Wellness');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [website, setWebsite] = useState(currentUser?.website || '');
  const [desc, setDesc] = useState(currentUser?.desc || '');

  if (!currentUser) return <div className="text-center py-12">Loading Recruiter...</div>;

  const handleSave = (e) => {
    e.preventDefault();
    updateCompanyProfile(currentUser.id, {
      name,
      sector,
      location,
      website,
      desc
    });
  };

  const sectors = [
    'Software & Cloud Infrastructure',
    'AI & Enterprise Distributed Systems',
    'Semiconductor, AI & GPU Acceleration',
    'Embedded Systems & Wireless SoC',
    'Enterprise Architecture & Applied AI',
    'Cloud Engineering & Digital Transformation',
    'Fintech & Quantitative Engineering',
    'Robotics & Autonomous Systems'
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Company Profile Setup</h2>
        <p className="text-sm text-slate-500">Configure your organization details and sector tagging to attract relevant students.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Decorative Top header */}
        <div className="h-24 bg-gradient-to-r from-emerald-700 to-teal-500 relative flex items-end px-8 pb-4">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-30" />
          <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-bold text-xl text-slate-800 -mb-8 relative z-10">
            {currentUser.logoText}
          </div>
        </div>

        <form onSubmit={handleSave} className="p-8 pt-12 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Name */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 block">Company / Recruiter Name</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Sector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Industry Sector</label>
              <div className="relative">
                <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold"
                >
                  {sectors.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">HQ Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Website */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 block">Website URL</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="e.g. himalayawellness.in"
                  required
                  className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* About / Description */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 block">About / Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                required
                className="w-full border border-slate-300 rounded-lg p-3 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
              />
            </div>

          </div>

          {/* Submit */}
          <div className="flex items-center justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors text-xs flex items-center space-x-1"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Configs</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default IndustryProfile;
