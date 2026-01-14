import React, { useState, useEffect } from 'react';
import { Info, ClipboardList, Clock, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';
import { CalculatorInput } from './components/CalculatorInput';
import { ResultCard } from './components/ResultCard';
import { ShiftData, CalculationResult } from './types';

// Initial State
const INITIAL_DATA: ShiftData = {
  monthlyRequiredDays: 22,
  monthlyBasicHours: 176,
  normalWorkDays: 11,
  overnightWorkDays: 0,
  compLeaveDays: 0,
  extraLeaveDays: 3,
  targetOvertimeAmount: 19000,
  hourlyWage: 182,
  hoursPerNormalDay: 20,
  hoursPerOvernightDay: 12,
  hoursPerCompDay: 12,
};

const App: React.FC = () => {
  const [data, setData] = useState<ShiftData>(() => {
    const saved = localStorage.getItem('shiftMasterData');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  
  const [results, setResults] = useState<CalculationResult | null>(null);

  useEffect(() => {
    localStorage.setItem('shiftMasterData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const totalNormalHours = data.normalWorkDays * data.hoursPerNormalDay;
    const totalOvernightHours = data.overnightWorkDays * data.hoursPerOvernightDay;
    const totalCompHours = data.compLeaveDays * data.hoursPerCompDay;
    
    const totalWorkHours = totalNormalHours + totalOvernightHours + totalCompHours;
    const totalWorkDays = data.normalWorkDays + data.overnightWorkDays + data.compLeaveDays + data.extraLeaveDays;
    const reportableOvertimeHours = Math.max(0, totalWorkHours - data.monthlyBasicHours);
    const currentOvertimePay = reportableOvertimeHours * data.hourlyWage;
    const requiredHoursForTarget = Math.ceil(data.targetOvertimeAmount / data.hourlyWage);
    const isTargetMet = reportableOvertimeHours >= requiredHoursForTarget;
    const remainingSaveableHours = Math.max(0, reportableOvertimeHours - requiredHoursForTarget);
    const gapToTargetAmount = Math.max(0, data.targetOvertimeAmount - currentOvertimePay);
    const progressPercentage = Math.min(100, Math.max(0, (currentOvertimePay / data.targetOvertimeAmount) * 100));

    setResults({
      totalWorkDays,
      totalWorkHours,
      requiredHoursForTarget,
      reportableOvertimeHours,
      isTargetMet,
      remainingSaveableHours,
      currentOvertimePay,
      gapToTargetAmount,
      progressPercentage
    });
  }, [data]);

  const handleInputChange = (key: keyof ShiftData, value: number) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const currentTotalDays = data.normalWorkDays + data.overnightWorkDays + data.compLeaveDays + data.extraLeaveDays;
  const isDaysInsufficient = currentTotalDays < data.monthlyRequiredDays;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
      {/* 標題區域：套用 pt-safe-area-large 確保在瀏海下方，且無 LOGO */}
      <header className="pt-safe-area-large pb-10 px-6 text-center">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">超勤試算表</h1>
      </header>

      <main className="px-5 max-w-lg mx-auto w-full space-y-6 pb-16">
        
        {/* Rules Dashboard Widget */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
            <div className="bg-gradient-to-r from-slate-50 to-white px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                <ClipboardList size={16} className="text-indigo-600" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">工時計算規則</span>
            </div>
            <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
                <div className="flex items-center justify-between border-r border-slate-100 pr-2">
                  <span className="text-xs font-medium text-slate-500">正常班</span>
                  <div className="flex items-center bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">
                    <span className="text-sm font-bold">+</span>
                    <input 
                      type="number" 
                      value={data.hoursPerNormalDay}
                      onChange={(e) => handleInputChange('hoursPerNormalDay', Number(e.target.value))}
                      className="w-7 text-center text-sm font-bold bg-transparent outline-none no-spinner text-emerald-600"
                    />
                    <span className="text-sm font-bold">H</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pl-2">
                  <span className="text-xs font-medium text-slate-500">外宿班</span>
                  <div className="flex items-center bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">
                    <span className="text-sm font-bold">+</span>
                    <input 
                      type="number" 
                      value={data.hoursPerOvernightDay}
                      onChange={(e) => handleInputChange('hoursPerOvernightDay', Number(e.target.value))}
                      className="w-7 text-center text-sm font-bold bg-transparent outline-none no-spinner text-indigo-600"
                    />
                    <span className="text-sm font-bold">H</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-r border-slate-100 border-t border-slate-50 pt-3 pr-2">
                  <span className="text-xs font-medium text-slate-500">補休</span>
                  <div className="flex items-center bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">
                    <span className="text-sm font-bold">+</span>
                    <input 
                      type="number" 
                      value={data.hoursPerCompDay}
                      onChange={(e) => handleInputChange('hoursPerCompDay', Number(e.target.value))}
                      className="w-7 text-center text-sm font-bold bg-transparent outline-none no-spinner text-indigo-600"
                    />
                    <span className="text-sm font-bold">H</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-3 pl-2">
                  <span className="text-xs font-medium text-slate-500">加休</span>
                  <span className="text-sm font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">+0H</span>
                </div>
            </div>
            <div className="px-5 py-2 bg-slate-50 border-t border-slate-100 text-center">
               <p className="text-[10px] text-slate-400">* 點擊數字可調整各班別折算工時</p>
            </div>
        </section>

        {/* Basic Settings */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-1 flex items-center gap-2">
            <Info size={14} /> 基本參數設定
          </h2>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-2 gap-4">
            <CalculatorInput label="應上班天數" value={data.monthlyRequiredDays} onChange={(v) => handleInputChange('monthlyRequiredDays', v)} highlight />
            <CalculatorInput label="基本工時(H)" value={data.monthlyBasicHours} onChange={(v) => handleInputChange('monthlyBasicHours', v)} highlight />
            <CalculatorInput label="時薪 ($)" value={data.hourlyWage} onChange={(v) => handleInputChange('hourlyWage', v)} />
            <CalculatorInput label="超勤目標 ($)" value={data.targetOvertimeAmount} onChange={(v) => handleInputChange('targetOvertimeAmount', v)} />
          </div>
        </section>

        {/* Shift Inputs */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
             <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Clock size={14} /> 排班天數輸入
             </h2>
             <div className={`text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1.5 ${isDaysInsufficient ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {isDaysInsufficient ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
                <span>{currentTotalDays} 天</span>
             </div>
          </div>
          
          <div className={`bg-white p-5 rounded-2xl shadow-sm border transition-all grid grid-cols-2 gap-4 ${isDaysInsufficient ? 'border-red-200 shadow-red-50' : 'border-slate-100'}`}>
             <CalculatorInput label="正常上班" value={data.normalWorkDays} onChange={(v) => handleInputChange('normalWorkDays', v)} />
             <CalculatorInput label="外宿上班" value={data.overnightWorkDays} onChange={(v) => handleInputChange('overnightWorkDays', v)} />
             <CalculatorInput label="補休天數" value={data.compLeaveDays} onChange={(v) => handleInputChange('compLeaveDays', v)} />
             <CalculatorInput label="加休天數" value={data.extraLeaveDays} onChange={(v) => handleInputChange('extraLeaveDays', v)} />
          </div>
        </section>

        {/* Results Section */}
        {results && (
          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Wallet className="text-indigo-600" size={20} />
                  計算結果
                </h2>
                <div className="text-xs font-bold text-white bg-indigo-600 px-3 py-1 rounded-full shadow-sm shadow-indigo-200">
                    總工時 {results.totalWorkHours} H
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="超勤時數" value={results.reportableOvertimeHours} unit="小時" subValue="總時數 - 基本工時" theme="blue" />
              <ResultCard label="需達成時數" value={results.requiredHoursForTarget} unit="小時" subValue="達標所需時數" theme="neutral" />
              
              <div className={`col-span-2 rounded-2xl p-5 shadow-sm border transition-all ${results.isTargetMet ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${results.isTargetMet ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                            {results.isTargetMet ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        </div>
                        <div>
                            <p className={`text-base font-bold ${results.isTargetMet ? 'text-emerald-800' : 'text-amber-800'}`}>
                                {results.isTargetMet ? '加班費已達標' : '目標尚未達成'}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 font-semibold">
                                目前預估: <span className="font-bold text-slate-800">${results.currentOvertimePay.toLocaleString()}</span>
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-400 mb-1">{results.isTargetMet ? '超額可存' : '距離目標'}</p>
                        <p className={`text-2xl font-black ${results.isTargetMet ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {results.isTargetMet ? `${results.remainingSaveableHours}H` : `$${results.gapToTargetAmount.toLocaleString()}`}
                        </p>
                    </div>
                </div>

                {!results.isTargetMet && (
                    <div className="mt-5">
                        <div className="w-full bg-amber-200/40 rounded-full h-3 overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full transition-all duration-700" style={{ width: `${results.progressPercentage}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-amber-700/60 mt-2 font-black px-1">
                            <span>0%</span>
                            <span>進度 {Math.round(results.progressPercentage)}%</span>
                        </div>
                    </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;