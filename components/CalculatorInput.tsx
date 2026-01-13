import React from 'react';

interface Props {
  label: string;
  value: number;
  onChange: (val: number) => void;
  highlight?: boolean;
}

export const CalculatorInput: React.FC<Props> = ({ label, value, onChange, highlight }) => {
  return (
    <div className={`group relative flex flex-col p-3 rounded-xl border transition-all duration-200 ${highlight ? 'bg-indigo-50/50 border-indigo-100 hover:border-indigo-200' : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'} focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500`}>
      <label className={`text-xs font-bold mb-1 transition-colors ${highlight ? 'text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`}>{label}</label>
      <input
        type="number"
        min="0"
        value={value === 0 ? '' : value}
        onChange={(e) => {
          const val = e.target.value === '' ? 0 : Number(e.target.value);
          onChange(val >= 0 ? val : 0);
        }}
        onWheel={(e) => e.currentTarget.blur()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
          }
        }}
        className={`w-full text-xl font-black bg-transparent outline-none no-spinner ${highlight ? 'text-indigo-900 placeholder-indigo-200' : 'text-slate-700 placeholder-slate-300'}`}
        placeholder="0"
      />
    </div>
  );
};