import React from 'react';

const ProgressBar = ({ value, max = 100, label, showPercentage = true, color = 'bg-indigo-600' }) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  // Dynamic color selection based on value if no color specified
  let barColor = color;
  if (color === 'dynamic') {
    if (percentage >= 80) barColor = 'bg-emerald-500';
    else if (percentage >= 50) barColor = 'bg-amber-500';
    else barColor = 'bg-rose-500';
  }

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-700">
          {label && <span>{label}</span>}
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
