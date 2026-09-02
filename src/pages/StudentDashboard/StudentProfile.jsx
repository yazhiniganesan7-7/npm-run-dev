import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, X, Upload, Award, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const StudentProfile = () => {
  const { currentUser, skillsTaxonomy, updateStudentProfile } = useApp();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [targetRole, setTargetRole] = useState(currentUser?.targetRole || '');
  const [degree, setDegree] = useState(currentUser?.education?.degree || '');
  const [year, setYear] = useState(currentUser?.education?.year || '');
  const [cgpa, setCgpa] = useState(currentUser?.education?.cgpa || '');
  const [resumeName, setResumeName] = useState(currentUser?.resumeName || '');

  // Skills Editing State
  const [searchSkill, setSearchSkill] = useState('');
  const [mySkills, setMySkills] = useState(currentUser?.skills || []);

  // Certifications Editing State
  const [certs, setCerts] = useState(currentUser?.certifications || []);
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');

  if (!currentUser) return <div className="text-center py-12">Loading Profile...</div>;

  // Filter skills taxonomy based on search
  const filteredTaxonomy = searchSkill.trim() === ''
    ? []
    : skillsTaxonomy.filter(
        s => s.name.toLowerCase().includes(searchSkill.toLowerCase()) && !mySkills.includes(s.name)
      ).slice(0, 5);

  const addSkill = (skillName) => {
    if (!mySkills.includes(skillName)) {
      setMySkills([...mySkills, skillName]);
      setSearchSkill('');
    }
  };

  const removeSkill = (skillName) => {
    setMySkills(mySkills.filter(s => s !== skillName));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
    }
  };

  const addCertification = (e) => {
    e.preventDefault();
    if (!newCertName.trim() || !newCertIssuer.trim()) return;

    const newCert = {
      id: `cert-${Date.now()}`,
      name: newCertName,
      issuer: newCertIssuer,
      date: new Date().toISOString().split('T')[0].substring(0, 7), // YYYY-MM
      status: 'Pending'
    };

    setCerts([...certs, newCert]);
    setNewCertName('');
    setNewCertIssuer('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedProfile = {
      name,
      phone,
      targetRole,
      education: { degree, year, cgpa },
      resumeName,
      skills: mySkills,
      certifications: certs
    };
    updateStudentProfile(currentUser.id, updatedProfile);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Student Profile</h2>
        <p className="text-sm text-slate-500">Update your credentials, certifications, and skills to refine internship matching.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Card 1: Personal Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Personal & Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Target Role / Specialization</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Ayurvedic Formulation Researcher"
                required
                className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">CGPA / Grade</label>
              <input
                type="text"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                placeholder="e.g. 8.4/10.0"
                required
                className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Degree Programme</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Year / Phase</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. Final Year (4th Year)"
                required
                className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

          </div>
        </div>

        {/* Card 2: Interactive Skills Tags */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Interactive Skill Tags</h3>
          
          {/* Active Skills tags list */}
          <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            {mySkills.length === 0 ? (
              <span className="text-xs text-slate-400 italic">No skills added yet</span>
            ) : (
              mySkills.map(skill => (
                <span key={skill} className="inline-flex items-center space-x-1 bg-indigo-50 border border-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                  <span>{skill}</span>
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:bg-indigo-100 p-0.5 rounded-full text-indigo-600 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Search box & Taxonomy selection */}
          <div className="relative">
            <label className="text-xs font-semibold text-slate-600 block mb-1">Search & Add Skills from Taxonomy</label>
            <input
              type="text"
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
              placeholder="Start typing standard skills (e.g. Dravyaguna, Formulation, Python, React...)"
              className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {filteredTaxonomy.length > 0 && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-30 divide-y divide-slate-100 overflow-hidden">
                {filteredTaxonomy.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => addSkill(s.name)}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-900 transition-colors flex items-center justify-between font-medium"
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

        {/* Card 3: Resume Uploader */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Resume Upload</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors relative cursor-pointer group">
            <input
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 group-hover:text-indigo-600 transition-colors shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-sm text-slate-800">
                {resumeName ? 'Replace Uploaded PDF' : 'Upload Academic Resume'}
              </h4>
              <p className="text-xs text-slate-400">PDF documents only. Max size 5MB.</p>
              {resumeName && (
                <div className="inline-flex items-center space-x-1.5 bg-indigo-50 text-indigo-800 px-3 py-1 rounded-lg text-xs mt-2 border border-indigo-100 font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>{resumeName}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 4: Certification Manager */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Academic Certifications</h3>
            <p className="text-xs text-slate-400">
              Certifications added here will enter a "Pending" verification workflow visible to college administrators.
            </p>
          </div>

          {/* Form to add certification */}
          <div className="bg-slate-50/50 border border-slate-200 p-4 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Certificate Title</label>
              <input
                type="text"
                value={newCertName}
                onChange={(e) => setNewCertName(e.target.value)}
                placeholder="e.g. Advanced Phytochemistry Isolation"
                className="w-full border border-slate-300 rounded-lg p-2 bg-white text-slate-800 text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Issuing Authority</label>
              <input
                type="text"
                value={newCertIssuer}
                onChange={(e) => setNewCertIssuer(e.target.value)}
                placeholder="e.g. NPTEL / Ministry of Ayush"
                className="w-full border border-slate-300 rounded-lg p-2 bg-white text-slate-800 text-sm focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={addCertification}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold p-2.5 rounded-lg text-xs flex items-center justify-center space-x-1 md:col-span-2 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certification to Verification Pipeline</span>
            </button>
          </div>

          {/* List of certifications */}
          <div className="space-y-3">
            {certs.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center">No certifications added</p>
            ) : (
              certs.map(cert => (
                <div key={cert.id} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl bg-slate-50/30">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 mt-0.5">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-slate-800">{cert.name}</h4>
                      <p className="text-[10px] text-slate-400">{cert.issuer} • Added {cert.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      cert.status === 'Verified' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : cert.status === 'Pending' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {cert.status === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      <span>{cert.status}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCerts(certs.filter(c => c.id !== cert.id))}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sticky save bar */}
        <div className="flex items-center justify-end space-x-4 border-t border-slate-200 pt-6">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors text-sm"
          >
            Save All Changes
          </button>
        </div>

      </form>
    </div>
  );
};

export default StudentProfile;
