import React from 'react';
import { motion } from 'framer-motion';

import { Difficulty } from '../utils/sudokuLogic';

interface GameStatsProps {
  time: number;
  mistakes: number;
  hintsUsed: number;
  difficulty: Difficulty;
}

export const GameStats: React.FC<GameStatsProps> = ({
  time,
  mistakes,
  hintsUsed,
  difficulty
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

  const difficultyColors = {
    easy: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    hard: 'text-orange-600 bg-orange-100',
    expert: 'text-red-600 bg-red-100'
  };

  const stats = [
    {
      label: 'Time',
      value: formatTime(time),
      icon: '⏱️'
    },
    {
      label: 'Mistakes',
      value: mistakes,
      icon: '❌',
      highlight: mistakes > 0
    },
    {
      label: 'Hints',
      value: hintsUsed,
      icon: '💡',
      highlight: hintsUsed > 0
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Game Stats</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg ${
              stat.highlight ? 'bg-red-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{stat.icon}</span>
              <span className="font-medium text-gray-700">{stat.label}</span>
            </div>
            <span className={`text-lg font-bold ${
              stat.highlight ? 'text-red-600' : 'text-gray-800'
            }`}>
              {stat.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};