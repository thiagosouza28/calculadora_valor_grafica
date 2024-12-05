import React from 'react';
import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <span className="ml-2">Calculando...</span>
    </div>
  );
}