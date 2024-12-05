import React from 'react';
import { formatCurrency, formatNumber } from '../utils/formatting';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  unit: string;
  isCurrency?: boolean;
  onBlur?: () => void;
}

export function InputField({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  unit,
  isCurrency = false,
  onBlur
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty input
    if (!inputValue) {
      onChange('');
      return;
    }

    // Remove any non-numeric characters
    const numericValue = inputValue.replace(/[^\d]/g, '');
    
    if (isCurrency) {
      if (numericValue === '') {
        onChange('');
      } else {
        // Convert to number and format as currency
        const numberValue = parseInt(numericValue, 10) / 100;
        const formatted = numberValue.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        onChange(formatted);
      }
    } else {
      // For non-currency numbers, allow direct numeric input
      onChange(numericValue);
    }
  };

  const handleBlur = () => {
    if (!value) return;

    if (isCurrency) {
      // Ensure proper currency format on blur
      const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
      const numberValue = parseFloat(numericValue);
      if (!isNaN(numberValue)) {
        const formatted = numberValue.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        onChange(formatted);
      }
    } else {
      // Format numbers with thousand separators on blur
      const formatted = formatNumber(value);
      onChange(formatted);
    }
    onBlur?.();
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {unit && `(${unit})`}
      </label>
      <div className="relative mt-1">
        {isCurrency && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">R$</span>
          </div>
        )}
        <input
          type="text"
          inputMode="decimal"
          id={id}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-indigo-500 focus:ring-indigo-500 p-2 border
            ${isCurrency ? 'pl-12' : ''}`}
          placeholder={placeholder}
          required={!id.includes('eyelet')}
        />
      </div>
    </div>
  );
}