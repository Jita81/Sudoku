import React from 'react';
import { motion } from 'framer-motion';

import { Difficulty } from '../utils/sudokuLogic';

interface GameControlsProps {
  onNewGame: (difficulty: Difficulty) => void;
  onUndo: () => void;
  onRedo: () => void;
  onHint: () => void;
  onTogglePause: () => void;
  onToggleNotes: () => void;
  onCheckErrors: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isPaused: boolean;
  notesMode: boolean;
  hintsUsed: number;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onNewGame,
  onUndo,
  onRedo,
  onHint,
  onTogglePause,
  onToggleNotes,
  onCheckErrors,
  canUndo,
  canRedo,
  isPaused,
  notesMode,
  hintsUsed
}) => {
  const [showDifficultyMenu, setShowDifficultyMenu] = React.useState(false);

  const difficulties: { label: string; value: Difficulty; color: string }[] = [
    { label: 'Kiddie', value: 'kiddie', color: 'bg-purple-400' },
    { label: 'Easy', value: 'easy', color: 'bg-green-500' },
    { label: 'Medium', value: 'medium', color: 'bg-yellow-500' },
    { label: 'Hard', value: 'hard', color: 'bg-orange-500' },
    { label: 'Expert', value: 'expert', color: 'bg-red-500' }
  ];

  const buttonClass = "px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95";

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <motion.button
          onClick={() => setShowDifficultyMenu(!showDifficultyMenu)}
          className={`${buttonClass} bg-gradient-to-r from-purple-500 to-pink-500 text-white`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Game
        </motion.button>
        
        <motion.button
          onClick={onTogglePause}
          className={`${buttonClass} ${isPaused ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </motion.button>

        <motion.button
          onClick={onUndo}
          disabled={!canUndo}
          className={`${buttonClass} ${canUndo ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          whileHover={{ scale: canUndo ? 1.05 : 1 }}
          whileTap={{ scale: canUndo ? 0.95 : 1 }}
        >
          Undo
        </motion.button>

        <motion.button
          onClick={onRedo}
          disabled={!canRedo}
          className={`${buttonClass} ${canRedo ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          whileHover={{ scale: canRedo ? 1.05 : 1 }}
          whileTap={{ scale: canRedo ? 0.95 : 1 }}
        >
          Redo
        </motion.button>

        <motion.button
          onClick={onToggleNotes}
          className={`${buttonClass} ${notesMode ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Notes {notesMode ? 'ON' : 'OFF'}
        </motion.button>

        <motion.button
          onClick={onHint}
          className={`${buttonClass} bg-green-100 text-green-700 hover:bg-green-200 relative`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Hint
          {hintsUsed > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {hintsUsed}
            </span>
          )}
        </motion.button>
      </div>

      <motion.button
        onClick={onCheckErrors}
        className={`${buttonClass} w-full bg-orange-100 text-orange-700 hover:bg-orange-200`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Check for Errors
      </motion.button>

      {showDifficultyMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          {difficulties.map(({ label, value, color }) => (
            <button
              key={value}
              onClick={() => {
                onNewGame(value);
                setShowDifficultyMenu(false);
              }}
              className={`px-3 py-2 rounded-md text-white font-medium ${color} hover:opacity-90 transition-opacity`}
            >
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};