export const isValidNumber = (value: string): boolean => {
  // Allow empty string
  if (!value) return true;
  
  // Check if it's a valid number format
  const normalized = value.replace(/\./g, '');
  return /^\d*$/.test(normalized);
};

export const isValidCurrency = (value: string): boolean => {
  // Allow empty string
  if (!value) return true;
  
  // Remove R$ and spaces
  const cleaned = value.replace(/R\$\s?/g, '');
  
  // Check if it matches the format: numbers with optional decimal places
  const isValid = /^\d{1,3}(\.\d{3})*(\,\d{0,2})?$/.test(cleaned);
  return isValid;
};