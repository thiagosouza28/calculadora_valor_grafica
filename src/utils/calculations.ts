import { formatCurrency as formatToCurrency } from './formatting';

export const convertCmToM = (cm: number): number => cm / 100;

export const calculateArea = (widthCm: number, heightCm: number): number => {
  const widthM = convertCmToM(widthCm);
  const heightM = convertCmToM(heightCm);
  return widthM * heightM;
};

export const calculateTotalValue = (
  area: number, 
  pricePerSquareMeter: number, 
  eyeletCount: number = 0, 
  eyeletPrice: number = 0
): number => {
  const basePrice = area * pricePerSquareMeter;
  const eyeletsTotal = eyeletCount * eyeletPrice;
  return basePrice + eyeletsTotal;
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};