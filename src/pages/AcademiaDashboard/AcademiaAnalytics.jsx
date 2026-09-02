import React from 'react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import StatCard from '../../components/StatCard';
import { TrendingUp, Award, IndianRupee, Landmark } from 'lucide-react';

const AcademiaAnalytics = () => {
  
  // Mock analytics datasets
  const placementRateTrends = [
    { year: '2022', 'Placement Rate (%)': 68 },
    { year: '2023', 'Placement Rate (%)': 74 },
    { year: '2024', 'Placement Rate (%)': 81 },
    { year: '2025', 'Placement Rate (%)': 88 },
    { year: '2026', 'Placement Rate (%)': 92 }
  ];

  const domainPlacementDistribution = [
    { domain: 'Ayurveda', Placed: 110, 'Target Enrolled': 140 },
    { domain: 'Homeopathy', Placed: 78, 'Target Enrolled': 95 },
    { domain: 'Sowa Rigpa', Placed: 28, 'Target Enrolled': 40 },
    { domain: 'Informatics & Biotech', Placed: 42, 'Target Enrolled': 50 }
  ];

  const stipendTrends = [
    { year: '2022', 'Avg Stipend (INR)': 12000 },
    { year: '2023', 'Avg Stipend (INR)': 14000 },
    { year: '2024', 'Avg Stipend (INR)': 16500 },
    { year: '2025', 'Avg Stipend (INR)': 19000 },
    { year: '2026', 'Avg Stipend (INR)': 22000 }
  ];

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Placement & Skills Analytics</h2>
        <p className="text-sm text-slate-500">Track multi-year academic placement trajectories and average stipend values across AYUSH departments.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Highest Package Offered" value="₹40,000 / mo" icon={IndianRupee} color="emerald" description="Himalaya Wellness QA Executive" />
        <StatCard title="Average Stipend Growth" value="+15.7%" icon={TrendingUp} color="indigo" description="Year-on-year increase" />
        <StatCard title="Placement Readiness Index" value="84.2%" icon={Landmark} color="blue" description="Based on verified skills tag ratios" />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Placement rate trend line chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-800">University Placement Rate Trend</h3>
            <p className="text-[10px] text-slate-400">Year-on-year tracking of graduate placement ratios</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={placementRateTrends} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="Placement Rate (%)" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average stipend trend bar chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-800">Average Monthly Stipend Trend</h3>
            <p className="text-[10px] text-slate-400">Monthly internship payout benchmarks across departments</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stipendTrends} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="Avg Stipend (INR)" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain-wise Placed vs Target Bar Chart (Col Span 2) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-800">Department Placement & Readiness Distribution</h3>
            <p className="text-[10px] text-slate-400">Comparing active placements against overall target candidates per department</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainPlacementDistribution} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="domain" tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="Placed" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Target Enrolled" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcademiaAnalytics;
