import React from 'react';
import { formatCurrency } from '../utils/calculations';

interface ResultDisplayProps {
  area: number;
  totalValue: number;
  eyeletCount?: number;
  eyeletPrice?: number;
}

export function ResultDisplay({ area, totalValue, eyeletCount = 0, eyeletPrice = 0 }: ResultDisplayProps) {
  const eyeletTotal = eyeletCount * eyeletPrice;

  return (
    <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Resultado:</h2>
      <div className="space-y-2">
        <p className="text-gray-700">
          Área total: <span className="font-medium">{area.toFixed(2)} m²</span>
        </p>
        {eyeletCount > 0 && (
          <>
            <p className="text-gray-700">
              Valor dos ilhós: <span className="font-medium">{formatCurrency(eyeletTotal)}</span>
              <span className="text-sm text-gray-500 ml-2">
                ({eyeletCount} un × {formatCurrency(eyeletPrice)})
              </span>
            </p>
            <div className="my-2 border-t border-gray-300"></div>
          </>
        )}
        <p className="text-gray-700 font-semibold">
          Valor total: <span className="font-medium">{formatCurrency(totalValue)}</span>
        </p>
      </div>
    </div>
  );
}