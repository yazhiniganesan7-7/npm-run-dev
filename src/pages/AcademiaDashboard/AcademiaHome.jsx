import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import StatCard from '../../components/StatCard';
import { Users, Briefcase, Award, CheckSquare, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

const AcademiaHome = () => {
  const { students, opportunities, collaborations, currentUser } = useApp();

  if (!currentUser) return <div className="text-center py-12">Loading Admin dashboard...</div>;

  // 1. Calculate academic metrics
  const totalStudents = students.length;
  const placementCount = students.filter(s => s.targetRole.includes('Placement') || s.cgpa > '8.5').length; // Mock placed ratio
  const placementRate = Math.round((placementCount / totalStudents) * 100);

  // Count active pending certifications
  const pendingCerts = students.reduce((list, student) => {
    student.certifications.forEach(cert => {
      if (cert.status === 'Pending') {
        list.push({
          studentId: student.id,
          studentName: student.name,
          degree: student.education.degree.split(' ')[0],
          certId: cert.id,
          certName: cert.name,
          issuer: cert.issuer
        });
      }
    });
    return list;
  }, []);

  // 2. Student Domain Distribution Data
  const getDomainData = () => {
    const domains = { 'Computer Science': 0, 'Data Science & AI': 0, 'Electronics & Electrical': 0, 'Mechanical & Automation': 0 };
    students.forEach(s => {
      if (s.education.degree.includes('Computer Science') || s.education.degree.includes('Software')) {
        domains['Computer Science'] += 1;
      } else if (s.education.degree.includes('Data Science') || s.education.degree.includes('Artificial Intelligence')) {
        domains['Data Science & AI'] += 1;
      } else if (s.education.degree.includes('Electrical') || s.education.degree.includes('Electronics')) {
        domains['Electronics & Electrical'] += 1;
      } else {
        domains['Mechanical & Automation'] += 1;
      }
    });

    return Object.keys(domains).map(key => ({
      name: key,
      value: domains[key]
    }));
  };

  const domainChartData = getDomainData();

  // Colors for Pie Chart
  const COLORS = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8">
      {/* Admin header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 md:p-8 text-white border border-slate-800 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">Engineering Placement & Training Office</span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{currentUser.name}</h2>
            <p className="text-slate-300 text-xs md:text-sm">
              Logged in as {currentUser.adminName}. Audit engineering student metrics, approve certified skills, and review recruiter hiring readiness.
            </p>
          </div>
          <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/25 rounded-lg text-indigo-400 text-xs font-bold uppercase tracking-wider">
            Campus Placement Cell
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={totalStudents} icon={Users} color="blue" description="Enrolled engineering candidates" />
        <StatCard title="Active Recruiters" value={companies?.length || 6} icon={Briefcase} color="purple" description="Campus hiring tech firms" />
        <StatCard title="Placement Rate" value={`${placementRate}%`} icon={Award} color="emerald" description="Ready & placed status" />
        <StatCard title="Pending Verifications" value={pendingCerts.length} icon={CheckSquare} color="amber" description="Student certificates awaiting approval" />
      </div>

      {/* Charts & Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Domain Distribution Pie Chart (Col Span 3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-800">Engineering Branch Enrollment Distribution</h3>
            <p className="text-[10px] text-slate-400">Proportional enrollment across Computer Science, AI/Data Science, Electronics, and Mechanical</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainChartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {domainChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recents pending verification requests (Col Span 2) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-800">Certification Requests</h3>
            <p className="text-[10px] text-slate-400">Newly added student achievements awaiting signature</p>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[220px] space-y-3">
            {pendingCerts.length === 0 ? (
              <div className="text-center text-slate-400 py-8 text-xs italic">
                All student certifications are verified!
              </div>
            ) : (
              pendingCerts.slice(0, 3).map((req, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-xs text-slate-800">{req.certName}</h4>
                    <p className="text-[9px] text-slate-400">{req.studentName} ({req.degree}) • {req.issuer}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold bg-amber-100 text-amber-800 uppercase">
                      Pending
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {pendingCerts.length > 0 && (
            <Link
              to="/academia/verify"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-2.5 rounded-xl text-xs text-center flex items-center justify-center space-x-1 shadow-xs transition-colors"
            >
              <span>Manage Verifications ({pendingCerts.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default AcademiaHome;
