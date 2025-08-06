import React from 'react';
import { motion } from 'framer-motion';

import { Cell } from '../utils/sudokuLogic';

interface SudokuCellProps {
  cell: Cell;
  row: number;
  col: number;
  isSelected: boolean;
  isHighlighted: boolean;
  hasConflict: boolean;
  onClick: () => void;
}

export const SudokuCell: React.FC<SudokuCellProps> = ({
  cell,
  row,
  col,
  isSelected,
  isHighlighted,
  hasConflict,
  onClick
}) => {
  const isRightBorder = col === 2 || col === 5;
  const isBottomBorder = row === 2 || row === 5;
  
  const cellClasses = [
    'sudoku-cell',
    'relative',
    isSelected && 'selected',
    isHighlighted && 'highlighted',
    hasConflict && 'error',
    cell.given && 'given',
    !cell.given && cell.value !== 0 && 'user-input',
    isRightBorder && 'border-r-2 border-r-gray-700',
    isBottomBorder && 'border-b-2 border-b-gray-700'
  ].filter(Boolean).join(' ');

  return (
    <div className={cellClasses} onClick={onClick}>
      {cell.value !== 0 ? (
        <motion.span
          key={`${row}-${col}-${cell.value}`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {cell.value}
        </motion.span>
      ) : (
        <div className="grid grid-cols-3 gap-0 absolute inset-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <span
              key={num}
              className={`text-[0.6rem] md:text-xs text-gray-400 leading-tight ${cell.notes.has(num) ? 'opacity-100' : 'opacity-0'}`}
            >
              {num}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};