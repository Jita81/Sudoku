import React from 'react';
import { motion } from 'framer-motion';

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onClearClick: () => void;
  notesMode: boolean;
  disabledNumbers?: Set<number>;
}

export const NumberPad: React.FC<NumberPadProps> = ({
  onNumberClick,
  onClearClick,
  notesMode,
  disabledNumbers = new Set()
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <motion.button
            key={num}
            onClick={() => onNumberClick(num)}
            disabled={disabledNumbers.has(num)}
            className={`
              aspect-square text-xl font-semibold rounded-lg shadow-md
              transition-all duration-200 transform
              min-h-[3.5rem] md:w-16 md:h-16
              ${disabledNumbers.has(num)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : notesMode
                ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 hover:scale-105 active:scale-95'
                : 'bg-purple-100 hover:bg-purple-200 text-purple-800 hover:scale-105 active:scale-95'
              }
            `}
            whileHover={{ scale: disabledNumbers.has(num) ? 1 : 1.05 }}
            whileTap={{ scale: disabledNumbers.has(num) ? 1 : 0.95 }}
          >
            {num}
          </motion.button>
        ))}
      </div>
      <motion.button
        onClick={onClearClick}
        className="w-full py-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg shadow-md transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Clear Cell
      </motion.button>
    </div>
  );
};