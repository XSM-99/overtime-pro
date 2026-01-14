export interface ShiftData {
  monthlyRequiredDays: number;
  monthlyBasicHours: number;
  normalWorkDays: number;
  overnightWorkDays: number;
  compLeaveDays: number;
  extraLeaveDays: number;
  targetOvertimeAmount: number;
  hourlyWage: number;
  // Adjustable hours configuration
  hoursPerNormalDay: number;
  hoursPerOvernightDay: number;
  hoursPerCompDay: number;
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
