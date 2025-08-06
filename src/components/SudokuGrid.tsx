import React from 'react';
import { motion } from 'framer-motion';

import { GameGrid } from '../utils/sudokuLogic';

import { SudokuCell } from './SudokuCell';

interface SudokuGridProps {
  grid: GameGrid;
  selectedCell: [number, number] | null;
  conflicts: Set<string>;
  onCellClick: (row: number, col: number) => void;
  isPaused: boolean;
}

export const SudokuGrid: React.FC<SudokuGridProps> = ({
  grid,
  selectedCell,
  conflicts,
  onCellClick,
  isPaused
}) => {
  const isHighlighted = (row: number, col: number): boolean => {
    if (!selectedCell) return false;
    const [selectedRow, selectedCol] = selectedCell;
    
    // Highlight same row, column, or 3x3 box
    const sameRow = row === selectedRow;
    const sameCol = col === selectedCol;
    const sameBox = Math.floor(row / 3) === Math.floor(selectedRow / 3) &&
                    Math.floor(col / 3) === Math.floor(selectedCol / 3);
    
    return sameRow || sameCol || sameBox;
  };

  if (isPaused) {
    return (
      <div className="relative w-fit mx-auto">
        <div className="grid grid-cols-9 gap-0 border-2 border-gray-700 bg-white opacity-20">
          {grid.map((row, rowIndex) => (
            row.map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="w-12 h-12" />
            ))
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
          <div className="text-white text-2xl font-bold bg-purple-600 px-6 py-3 rounded-lg shadow-lg">
            Game Paused
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-9 gap-0 border-2 border-gray-700 bg-white mx-auto w-fit rounded shadow-xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {grid.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            row={rowIndex}
            col={colIndex}
            isSelected={selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex}
            isHighlighted={isHighlighted(rowIndex, colIndex)}
            hasConflict={conflicts.has(`${rowIndex}-${colIndex}`)}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      ))}
    </motion.div>
  );
};