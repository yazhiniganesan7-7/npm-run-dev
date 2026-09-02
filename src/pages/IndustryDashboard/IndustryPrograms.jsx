import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, X, BookOpen, Layers, Award, Users } from 'lucide-react';

const IndustryPrograms = () => {
  const { currentUser, showToast } = useApp();
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Certification'); // 'Certification', 'Mentorship', 'Masterclass'
  const [desc, setDesc] = useState('');

  // Local programs list backed by localStorage
  const [programs, setPrograms] = useState(() => {
    const defaultPrograms = [
      {
        id: 'prog-1',
        companyId: 'comp-2',
        companyName: 'Patanjali Research Foundation',
        title: 'Modern GMP Quality Control for Ayush Formulations',
        duration: '4 Weeks (Saturdays)',
        category: 'Certification',
        desc: 'A hands-on training module covering heavy metal limits validation, HPLC trace-element fingerprinting, and CDSCO compliance dossier drafting.',
        enrollments: 45
      },
      {
        id: 'prog-2',
        companyId: 'comp-1',
        companyName: 'Himalaya Wellness Co.',
        title: 'Phytochemical Isolation & Standardization Masterclass',
        duration: '2 Weeks (Online)',
        category: 'Masterclass',
        desc: 'Learn standard protocols for extracting and authenticating secondary metabolites from wild Himalayan herb stock. Covers TLC and organoleptic logs.',
        enrollments: 88
      }
    ];

    try {
      const stored = localStorage.getItem('sih_rec_programs');
      return stored ? JSON.parse(stored) : defaultPrograms;
    } catch (e) {
      return defaultPrograms;
    }
  });

  useEffect(() => {
    localStorage.setItem('sih_rec_programs', JSON.stringify(programs));
  }, [programs]);

  const handleCreateProgram = (e) => {
    e.preventDefault();
    if (!title || !duration || !desc) return;

    const newProgram = {
      id: `prog-${Date.now()}`,
      companyId: currentUser?.id || 'comp-unknown',
      companyName: currentUser?.name || 'Partner Company',
      title,
      duration,
      category,
      desc,
      enrollments: 0
    };

    setPrograms([newProgram, ...programs]);
    setShowForm(false);
    setTitle('');
    setDuration('');
    setDesc('');
    showToast(`Training Program "${title}" created successfully!`);
  };

  // Filter programs for this recruiter
  const companyPrograms = programs.filter(p => p.companyId === currentUser?.id);
  const otherPrograms = programs.filter(p => p.companyId !== currentUser?.id);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Industry Training Programs</h2>
          <p className="text-sm text-slate-500">Offer certifications, technical workshops, and mentorship courses to help students close skill gaps.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors text-xs flex items-center space-x-1 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Post Training Program</span>
        </button>
      </div>

      {/* Grid of Programs */}
      <div className="space-y-8">
        
        {/* Recruiter's posted programs */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Programs Offered by You</h3>
          {companyPrograms.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-400 text-xs italic">
              You haven't posted any training programs yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companyPrograms.map(prog => (
                <div key={prog.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden">
                  
                  {/* Category tag */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                        {prog.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-800 leading-snug">{prog.title}</h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{prog.desc}</p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span>{prog.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1 bg-slate-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-700">
                      <Users className="w-3.5 h-3.5 mr-0.5" />
                      <span>{prog.enrollments} Students Enrolled</span>
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Programs offered by other organizations */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Other Partner Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPrograms.map(prog => (
              <div key={prog.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">{prog.companyName}</span>
                    <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                      {prog.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 leading-snug">{prog.title}</h4>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">{prog.desc}</p>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>{prog.duration}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {prog.enrollments} Enrolled
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal Form popup to post a new program */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up">
            
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div className="space-y-0.5">
                <h3 className="font-bold text-sm">Post Industry Training Program</h3>
                <p className="text-[10px] text-slate-400">Offer courses to students to bridge technical deficiencies</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProgram} className="p-6 space-y-4">
              
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Program Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Advanced HPTLC Chromatographic Fingerprinting"
                  required
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Format selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold"
                  >
                    <option value="Certification">Skill Certification</option>
                    <option value="Mentorship">Industry Mentorship</option>
                    <option value="Masterclass">Advanced Masterclass</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 4 Weeks (Saturdays)"
                    required
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Course Description</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={4}
                  required
                  placeholder="Summarize the course outcomes, practical lab experiments, and certification criteria..."
                  className="w-full border border-slate-300 rounded-lg p-3 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2 bg-slate-50 -mx-6 -mb-6 p-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-slate-500 hover:text-slate-700 px-4 py-2 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-colors"
                >
                  Publish Program
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default IndustryPrograms;
