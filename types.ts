export interface ShiftData {
  monthlyRequiredDays: number;
  monthlyBasicHours: number; // Changed back to manual input
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

export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  isThinking?: boolean;
}