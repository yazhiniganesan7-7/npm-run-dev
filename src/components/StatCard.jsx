import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, trendType = 'up', description, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    amber: 'text-amber-600 bg-amber-50 border-amber-100',
    rose: 'text-rose-600 bg-rose-50 border-rose-100',
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    purple: 'text-purple-600 bg-purple-50 border-purple-100',
  };

  const ringColorMap = {
    indigo: 'ring-indigo-500/10',
    emerald: 'ring-emerald-500/10',
    amber: 'ring-amber-500/10',
    rose: 'ring-rose-500/10',
    blue: 'ring-blue-500/10',
    purple: 'ring-purple-500/10',
  };

  return (
    <div className={`p-6 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}>
      <div className="space-y-2">
        <span className="text-sm font-medium text-slate-500 block">{title}</span>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
          {trend && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
              trendType === 'up' 
                ? 'bg-emerald-100 text-emerald-800' 
                : trendType === 'down' 
                ? 'bg-rose-100 text-rose-800' 
                : 'bg-slate-100 text-slate-800'
            }`}>
              {trend}
            </span>
          )}
        </div>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      
      {Icon && (
        <div className={`p-3 rounded-lg border ${colorMap[color] || colorMap.indigo}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
