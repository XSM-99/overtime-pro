import React from 'react';

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  subValue?: string;
  theme?: 'neutral' | 'blue' | 'green' | 'red';
}

export const ResultCard: React.FC<Props> = ({ label, value, unit, subValue, theme = 'neutral' }) => {
  let bgClass = 'bg-white';
  let textClass = 'text-slate-800';
  let borderClass = 'border-slate-100';
  let labelClass = 'text-slate-400';

  if (theme === 'blue') {
    bgClass = 'bg-blue-50/50';
    textClass = 'text-blue-700';
    borderClass = 'border-blue-100';
    labelClass = 'text-blue-400';
  }

  return (
    <div className={`flex flex-col p-4 rounded-2xl border ${borderClass} ${bgClass} shadow-sm transition-all duration-300 hover:shadow-md`}>
      <span className={`text-[10px] font-bold uppercase tracking-wider ${labelClass} mb-2`}>{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-black tracking-tight ${textClass}`}>{value}</span>
        {unit && <span className={`text-xs font-bold ${theme === 'blue' ? 'text-blue-400' : 'text-slate-400'}`}>{unit}</span>}
      </div>
      {subValue && <span className="text-[10px] font-medium text-slate-400 mt-auto pt-2">{subValue}</span>}
    </div>
  );
};