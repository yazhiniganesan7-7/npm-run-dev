import React from 'react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../../components/StatCard';
import { Briefcase, Users, FileText, CheckCircle, Award } from 'lucide-react';

const IndustryHome = () => {
  const { opportunities, applications, students, currentUser } = useApp();

  if (!currentUser) return <div className="text-center py-12">Loading Recruiter portal...</div>;

  // 1. Filter opportunities by this recruiter
  const companyOpps = opportunities.filter(o => o.companyId === currentUser.id);
  const companyOppIds = companyOpps.map(o => o.id);
  
  // 2. Filter applications to this recruiter's jobs
  const companyApps = applications.filter(a => companyOppIds.includes(a.opportunityId));

  // 3. Compute KPI Counts
  const activePostingsCount = companyOpps.filter(o => o.status === 'Open').length;
  const applicantsCount = companyApps.length;
  const selectedCount = companyApps.filter(a => a.status === 'Selected').length;
  const interviewCount = companyApps.filter(a => a.status === 'Interview').length;

  // 4. Chart 1: Recruitment Conversion Funnel
  const funnelData = [
    { name: 'Applied', Count: companyApps.length, fill: '#4f46e5' },
    { name: 'Shortlisted', Count: companyApps.filter(a => a.status === 'Shortlisted' || a.status === 'Interview' || a.status === 'Selected').length, fill: '#6366f1' },
    { name: 'Interviewed', Count: companyApps.filter(a => a.status === 'Interview' || a.status === 'Selected').length, fill: '#f59e0b' },
    { name: 'Selected', Count: selectedCount, fill: '#10b981' }
  ];

  // 5. Chart 2: Top Skills Among Applicants (dynamic mapping)
  const getApplicantSkillsData = () => {
    const skillCounts = {};
    companyApps.forEach(app => {
      const student = students.find(s => s.id === app.studentId);
      if (student && student.skills) {
        student.skills.forEach(skill => {
          skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });
      }
    });

    const data = Object.keys(skillCounts).map(skillName => ({
      name: skillName,
      Count: skillCounts[skillName]
    }));

    // Sort and return top 5
    return data.sort((a, b) => b.Count - a.Count).slice(0, 5);
  };

  const skillsChartData = getApplicantSkillsData();

  return (
    <div className="space-y-8">
      {/* Recruiter Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 md:p-8 text-white border border-slate-800 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Recruiter Sandbox</span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Dashboard Overview: {currentUser.name}</h2>
            <p className="text-slate-300 text-xs md:text-sm">
              Publish new internship listings, filter candidate skill-matches, and manage candidates via the applicant tracker.
            </p>
          </div>
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/25 rounded-lg text-emerald-400 text-xs font-bold uppercase tracking-wider">
            {currentUser.sector}
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Postings" value={activePostingsCount} icon={Briefcase} color="indigo" description="Active job/internship listings" />
        <StatCard title="Total Applications" value={applicantsCount} icon={Users} color="blue" description="Submissions received overall" />
        <StatCard title="Interviewing" value={interviewCount} icon={FileText} color="amber" description="Active interview stages" />
        <StatCard title="Hired candidates" value={selectedCount} icon={CheckCircle} color="emerald" description="Selected candidates" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recruiter funnel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-800">Recruitment Funnel</h3>
            <p className="text-[10px] text-slate-400">Total conversion metrics of applicants across stages</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            {applicantsCount === 0 ? (
              <p className="text-xs text-slate-400 italic">No applications received yet to compile funnel data.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Bar dataKey="Count" radius={[4, 4, 0, 0]}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Skills Pool Analysis */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-800">Applicant Skills Pool</h3>
            <p className="text-[10px] text-slate-400">Frequency of matching skill tags amongst active applicants</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            {skillsChartData.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No candidate skills mapped yet. Review applicants in the Kanban tracker.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={skillsChartData} margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#475569' }} width={80} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Bar dataKey="Count" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndustryHome;
