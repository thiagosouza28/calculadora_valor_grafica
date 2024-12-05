import type { CalculationResult } from '../types/calculation';

const STORAGE_KEY = 'calculator_history';

export function loadHistory(): CalculationResult[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveHistory(history: CalculationResult[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function updateCalculation(calculation: CalculationResult): CalculationResult[] {
  const history = loadHistory();
  const index = history.findIndex(item => item.id === calculation.id);
  
  if (index !== -1) {
    history[index] = { ...calculation, timestamp: Date.now() };
    saveHistory(history);
  }
  
  return history;
}

export function deleteCalculation(id: string): CalculationResult[] {
  const history = loadHistory();
  const filtered = history.filter(item => item.id !== id);
  saveHistory(filtered);
  return filtered;
}