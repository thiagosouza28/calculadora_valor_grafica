import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField } from './InputField';
import { EyeletFields } from './EyeletFields';
import { ResultDisplay } from './ResultDisplay';
import { HistoryPanel } from './HistoryPanel';
import { LoadingSpinner } from './LoadingSpinner';
import { calculateArea, calculateTotalValue } from '../utils/calculations';
import { parseLocaleNumber } from '../utils/formatting';
import { loadHistory, saveHistory, updateCalculation, deleteCalculation } from '../utils/storage';
import type { CalculationResult } from '../types/calculation';

export function Calculator() {
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [pricePerSquareMeter, setPricePerSquareMeter] = useState<string>('');
  const [eyeletCount, setEyeletCount] = useState<string>('');
  const [eyeletPrice, setEyeletPrice] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [history, setHistory] = useState<CalculationResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const resetForm = () => {
    setWidth('');
    setHeight('');
    setPricePerSquareMeter('');
    setEyeletCount('');
    setEyeletPrice('');
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const widthCm = parseLocaleNumber(width);
    const heightCm = parseLocaleNumber(height);
    const price = parseLocaleNumber(pricePerSquareMeter);
    const eCount = parseLocaleNumber(eyeletCount);
    const ePrice = parseLocaleNumber(eyeletPrice);

    if (widthCm > 0 && heightCm > 0 && price > 0) {
      setIsCalculating(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const area = calculateArea(widthCm, heightCm);
      const totalValue = calculateTotalValue(area, price, eCount, ePrice);
      
      const calculation: CalculationResult = {
        id: editingId || Date.now().toString(),
        timestamp: Date.now(),
        width: widthCm,
        height: heightCm,
        pricePerSquareMeter: price,
        area,
        totalValue,
        eyeletCount: eCount,
        eyeletPrice: ePrice
      };

      let updatedHistory: CalculationResult[];
      
      if (editingId) {
        updatedHistory = updateCalculation(calculation);
      } else {
        updatedHistory = [calculation, ...history];
        saveHistory(updatedHistory);
      }
      
      setHistory(updatedHistory);
      setResult(calculation);
      setIsCalculating(false);
      setEditingId(null);
    } else {
      setResult(null);
    }
  };

  const handleEdit = (item: CalculationResult) => {
    setEditingId(item.id);
    setWidth(item.width.toString());
    setHeight(item.height.toString());
    setPricePerSquareMeter(item.pricePerSquareMeter.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
    setEyeletCount(item.eyeletCount ? item.eyeletCount.toString() : '');
    setEyeletPrice(item.eyeletPrice ? item.eyeletPrice.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) : '');
    setShowHistory(false);
  };

  const handleDelete = (id: string) => {
    const updatedHistory = deleteCalculation(id);
    setHistory(updatedHistory);
    if (result?.id === id) {
      setResult(null);
    }
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CalculatorIcon className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                {editingId ? 'Editar Cálculo' : 'Calculadora de Área'}
              </h1>
            </div>
            <div className="flex gap-2">
              {editingId && (
                <button
                  onClick={resetForm}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
              )}
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Ver histórico"
              >
                <History className="w-6 h-6 text-indigo-600" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <InputField
                id="width"
                label="Largura"
                value={width}
                onChange={setWidth}
                placeholder="Ex: 550"
                unit="cm"
              />

              <InputField
                id="height"
                label="Altura"
                value={height}
                onChange={setHeight}
                placeholder="Ex: 320"
                unit="cm"
              />

              <InputField
                id="price"
                label="Valor por m²"
                value={pricePerSquareMeter}
                onChange={setPricePerSquareMeter}
                placeholder="150,00"
                unit="R$"
                isCurrency={true}
              />
            </div>

            <EyeletFields
              eyeletCount={eyeletCount}
              setEyeletCount={setEyeletCount}
              eyeletPrice={eyeletPrice}
              setEyeletPrice={setEyeletPrice}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 relative"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <LoadingSpinner />
              ) : (
                editingId ? 'Atualizar' : 'Calcular'
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {result && !isCalculating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ResultDisplay 
                  area={result.area} 
                  totalValue={result.totalValue}
                  eyeletCount={result.eyeletCount}
                  eyeletPrice={result.eyeletPrice}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <HistoryPanel 
                history={history} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                editingId={editingId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}