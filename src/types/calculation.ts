export interface CalculationResult {
  id: string;
  timestamp: number;
  width: number;
  height: number;
  pricePerSquareMeter: number;
  area: number;
  totalValue: number;
  eyeletCount: number;
  eyeletPrice: number;
}