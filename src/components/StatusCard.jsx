import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const StatusCard = ({ code, name, onClick, isSelected, isCorrect, isRevealed }) => {
  const variants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    correct: { 
      scale: [1, 1.1, 1],
      transition: { duration: 0.5 }
    },
    incorrect: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  const getStatusColor = () => {
    if (!isRevealed) return 'border-gray-200 hover:border-blue-300 hover:bg-blue-50';
    if (isCorrect) return 'border-green-500 bg-green-50';
    if (isSelected) return 'border-red-500 bg-red-50';
    return 'border-gray-200';
  };

  return (
    <motion.button
      onClick={onClick}
      variants={variants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={isRevealed ? (isCorrect ? "correct" : isSelected ? "incorrect" : "initial") : "initial"}
      className={`relative w-full p-4 rounded-xl border-2 ${getStatusColor()} 
                 bg-white shadow-sm hover:shadow-md transition-all
                 flex flex-col items-start space-y-2`}
      disabled={isRevealed}
    >
      {isRevealed && (isCorrect || isSelected) && (
        <div className={`absolute top-2 right-2 p-1 rounded-full 
          ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          {isCorrect ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <X className="w-4 h-4 text-red-600" />
          )}
        </div>
      )}

      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-mono font-bold">{code}</span>
        <span className={`text-sm ${isRevealed && isSelected && !isCorrect ? 'line-through' : ''}`}>
          {name}
        </span>
      </div>

      {isRevealed && isSelected && !isCorrect && (
        <div className="text-xs text-red-600">
          Incorrect. Try again!
        </div>
      )}
    </motion.button>
  );
};

export default StatusCard;