export interface ShiftData {
  monthlyRequiredDays: number;
  monthlyBasicHours: number;
  normalWorkDays: number;
  overnightWorkDays: number;
  compLeaveDays: number;
  personalLeaveDays: number; // 新增：特休天數
  extraLeaveDays: number;
  targetOvertimeAmount: number;
  hourlyWage: number;
  // Adjustable hours configuration
  hoursPerNormalDay: number;
  hoursPerOvernightDay: number;
  hoursPerCompDay: number;
  hoursPerPersonalLeaveDay: number; // 新增：特休折算工時
  hoursPerExtraLeaveDay: number;    // 新增：加休折算工時
}

export interface CalculationResult {
  totalWorkDays: number;
  totalWorkHours: number;
  requiredHoursForTarget: number;
  reportableOvertimeHours: number; // Total - Basic
  isTargetMet: boolean;
  remainingSaveableHours: number;
  // New fields for progress bar logic
  currentOvertimePay: number;
  gapToTargetAmount: number;
  progressPercentage: number;
}