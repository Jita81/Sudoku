import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

import { Difficulty } from '../utils/sudokuLogic';

interface VictoryModalProps {
  isOpen: boolean;
  time: number;
  mistakes: number;
  hintsUsed: number;
  difficulty: Difficulty;
  onNewGame: (difficulty: Difficulty) => void;
  onClose: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  time,
  mistakes,
  hintsUsed,
  difficulty,
  onNewGame,
  onClose
}) => {
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScore = (): number => {
    let score = 1000;
    score -= mistakes * 50;
    score -= hintsUsed * 30;
    score -= Math.floor(time / 60) * 5;
    
    const difficultyMultiplier = {
      easy: 0.5,
      medium: 1,
      hard: 1.5,
      expert: 2
    }[difficulty];
    
    return Math.max(0, Math.floor(score * difficultyMultiplier));
  };

  const getRating = (): { stars: number; message: string } => {
    const score = getScore();
    if (score >= 1500) return { stars: 5, message: "Absolutely Brilliant! 🌟" };
    if (score >= 1200) return { stars: 4, message: "Outstanding Performance! ⭐" };
    if (score >= 900) return { stars: 3, message: "Great Job! 👏" };
    if (score >= 600) return { stars: 2, message: "Good Effort! 👍" };
    return { stars: 1, message: "Puzzle Completed! ✅" };
  };

  const { stars, message } = getRating();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            gravity={0.1}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-purple-800 mb-2 font-display">
                  Congratulations, Kudzai! 🎉
                </h2>
                <p className="text-gray-600 mb-6">You've completed the puzzle!</p>

                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`text-4xl ${i < stars ? '' : 'opacity-30'}`}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                <p className="text-xl font-semibold text-purple-700 mb-6">{message}</p>

                <div className="bg-purple-50 rounded-lg p-4 mb-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold">{formatTime(time)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className="font-semibold capitalize">{difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mistakes:</span>
                    <span className="font-semibold">{mistakes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hints Used:</span>
                    <span className="font-semibold">{hintsUsed}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Score:</span>
                      <span className="font-bold text-purple-700 text-lg">{getScore()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onNewGame(difficulty)}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};