export const formatNumber = (value: string): string => {
  // Remove any non-digit characters
  const cleanValue = value.replace(/\D/g, '');
  
  // Handle empty or invalid input
  if (!cleanValue) return '';
  
  // Format with thousand separators
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatCurrency = (value: string): string => {
  // Remove any non-digit characters
  const cleanValue = value.replace(/\D/g, '');
  
  // Handle empty or invalid input
  if (!cleanValue) return '';
  
  // Convert to number and divide by 100 to handle cents
  const numericValue = parseInt(cleanValue, 10) / 100;
  
  // Format with Brazilian locale
  return numericValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const parseLocaleNumber = (value: string): number => {
  // Handle empty input
  if (!value) return 0;
  
  // Remove thousand separators and convert comma to period
  const normalized = value.replace(/\./g, '').replace(',', '.');
  
  // Handle empty string after normalization
  if (!normalized) return 0;
  
  const num = parseFloat(normalized);
  
  // Return 0 if parsing fails
  return isNaN(num) ? 0 : num;
};