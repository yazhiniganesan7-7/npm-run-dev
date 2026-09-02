import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Plus, X, Search, Calendar, Briefcase, HelpCircle } from 'lucide-react';

const IndustryPostOpportunity = () => {
  const { addOpportunity, skillsTaxonomy } = useApp();
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Internship'); // 'Internship', 'Placement'
  const [mode, setMode] = useState('Onsite'); // 'Onsite', 'Remote', 'Hybrid'
  const [location, setLocation] = useState('');
  const [stipend, setStipend] = useState('');
  const [stipendNum, setStipendNum] = useState(15000);
  const [duration, setDuration] = useState('6 Months');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  // Skills mapping
  const [searchSkill, setSearchSkill] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);

  // Filter skills taxonomy based on search
  const filteredTaxonomy = searchSkill.trim() === ''
    ? []
    : skillsTaxonomy.filter(
        s => s.name.toLowerCase().includes(searchSkill.toLowerCase()) && !requiredSkills.includes(s.name)
      ).slice(0, 5);

  const addSkill = (skillName) => {
    if (!requiredSkills.includes(skillName)) {
      setRequiredSkills([...requiredSkills, skillName]);
      setSearchSkill('');
    }
  };

  const removeSkill = (skillName) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skillName));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (requiredSkills.length === 0) {
      alert('Please add at least one required skill tag for mapping');
      return;
    }

    const oppDetails = {
      title,
      type,
      mode,
      location: `${location} (${mode})`,
      stipend: stipend || `₹${stipendNum.toLocaleString()} / month`,
      stipendNum: Number(stipendNum) || 0,
      duration,
      deadline,
      description,
      requiredSkills
    };

    addOpportunity(oppDetails);
    navigate('/industry/manage');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Post Internship / Job Opportunity</h2>
        <p className="text-sm text-slate-500">Create new listings with skill requirements to allow automated match scoring for students.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Title */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 block">Opportunity Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Clinical Standardization Intern"
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Type & Format */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Recruitment Format</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold"
              >
                <option value="Internship">Internship</option>
                <option value="Placement">Full-Time Placement</option>
              </select>
            </div>

            {/* Mode selection */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Working Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold"
              >
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">City / Job Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Haridwar HQ"
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Duration */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Duration / Schedule</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 Months (or Full-time)"
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Stipend Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Monthly Stipend / Package (INR)</label>
              <input
                type="number"
                value={stipendNum}
                onChange={(e) => setStipendNum(Number(e.target.value))}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Deadline */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Application Deadline</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold"
                />
              </div>
            </div>

            {/* Required Skills Search (Taxonomy) */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 block mb-0.5">Required Skills (Multi-select from Taxonomy)</label>
              
              {/* Selected Skill badges */}
              <div className="flex flex-wrap gap-1.5 p-3 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 min-h-[40px]">
                {requiredSkills.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">No skills selected. Search from the taxonomy below.</span>
                ) : (
                  requiredSkills.map(skill => (
                    <span key={skill} className="inline-flex items-center space-x-1 bg-emerald-50 border border-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md text-xs font-semibold">
                      <span>{skill}</span>
                      <button type="button" onClick={() => removeSkill(skill)} className="hover:bg-emerald-100 p-0.5 rounded text-emerald-600 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Taxonomy Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={searchSkill}
                  onChange={(e) => setSearchSkill(e.target.value)}
                  placeholder="Type skills to map (e.g. Panchakarma, Phytochemistry, SQL, Communication...)"
                  className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                {filteredTaxonomy.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 divide-y divide-slate-100 overflow-hidden">
                    {filteredTaxonomy.map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => addSkill(s.name)}
                        className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between font-medium"
                      >
                        <span>{s.name}</span>
                        <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase font-semibold">
                          {s.category}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 block">Job Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                placeholder="Detail the scope of work, key projects, and weekly schedules..."
                className="w-full border border-slate-300 rounded-lg p-3 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
              />
            </div>

          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors text-xs flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Posting</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default IndustryPostOpportunity;
