import React from 'react';

interface Props {
  label: string;
  value: number;
  onChange: (val: number) => void;
  highlight?: boolean;
}

export const CalculatorInput: React.FC<Props> = ({ label, value, onChange, highlight }) => {
  return (
    <div className={`
      relative flex flex-col p-4 rounded-2xl border transition-all duration-200
      ${highlight 
        ? 'bg-white border-indigo-200 shadow-md shadow-indigo-100/50 hover:border-indigo-300' 
        : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
      }
      active:scale-[0.98]
    `}>
      <label className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${highlight ? 'text-indigo-500' : 'text-slate-400'}`}>
        {label}
      </label>
      <div className="flex items-center gap-1">
        <input
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          min="0"
          value={value === 0 ? '' : value}
          onChange={(e) => {
            const val = e.target.value === '' ? 0 : Number(e.target.value);
            onChange(val >= 0 ? val : 0);
          }}
          onWheel={(e) => e.currentTarget.blur()}
          className={`
            w-full text-2xl font-black bg-transparent outline-none no-spinner p-0
            ${highlight ? 'text-indigo-900 placeholder-indigo-200' : 'text-slate-700 placeholder-slate-200'}
          `}
          placeholder="0"
        />
      </div>
    </div>
  );
};