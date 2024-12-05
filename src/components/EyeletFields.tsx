import React from 'react';
import { InputField } from './InputField';

interface EyeletFieldsProps {
  eyeletCount: string;
  setEyeletCount: (value: string) => void;
  eyeletPrice: string;
  setEyeletPrice: (value: string) => void;
}

export function EyeletFields({
  eyeletCount,
  setEyeletCount,
  eyeletPrice,
  setEyeletPrice,
}: EyeletFieldsProps) {
  return (
    <div className="space-y-4 border-t border-gray-200 pt-4 mt-4">
      <h3 className="text-lg font-medium text-gray-700">Ilhós (Opcional)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="eyeletCount"
          label="Quantidade de Ilhós"
          value={eyeletCount}
          onChange={setEyeletCount}
          placeholder="Ex: 12"
          unit="un"
        />
        <InputField
          id="eyeletPrice"
          label="Valor por Ilhós"
          value={eyeletPrice}
          onChange={setEyeletPrice}
          placeholder="2,50"
          unit="R$"
          isCurrency={true}
        />
      </div>
    </div>
  );
}