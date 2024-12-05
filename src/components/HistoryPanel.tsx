import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Edit2, Trash2 } from 'lucide-react';
import type { CalculationResult } from '../types/calculation';
import { formatCurrency } from '../utils/calculations';

interface HistoryPanelProps {
  history: CalculationResult[];
  onEdit: (item: CalculationResult) => void;
  onDelete: (id: string) => void;
  editingId: string | null;
}

export function HistoryPanel({ history, onEdit, onDelete, editingId }: HistoryPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 h-full">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Histórico</h2>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Nenhum cálculo realizado ainda
          </p>
        ) : (
          history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg p-4 hover:shadow-md transition-shadow relative group
                ${item.id === editingId ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
            >
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  title="Editar cálculo"
                >
                  <Edit2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(item.id)}
                  className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                  title="Excluir cálculo"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="text-sm text-gray-500 mb-2">
                {new Date(item.timestamp).toLocaleString('pt-BR')}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Dimensões:</span>{' '}
                  {item.width}x{item.height} cm
                </div>
                <div>
                  <span className="font-medium">Área:</span>{' '}
                  {item.area.toFixed(2)} m²
                </div>
                <div>
                  <span className="font-medium">Valor por m²:</span>{' '}
                  {formatCurrency(item.pricePerSquareMeter)}
                </div>
                {item.eyeletCount > 0 && (
                  <>
                    <div>
                      <span className="font-medium">Ilhós:</span>{' '}
                      {item.eyeletCount} un x {formatCurrency(item.eyeletPrice)}
                    </div>
                  </>
                )}
                <div className="col-span-2 mt-2 pt-2 border-t border-gray-100">
                  <span className="font-medium">Valor Total:</span>{' '}
                  <span className="text-indigo-600 font-bold">
                    {formatCurrency(item.totalValue)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}