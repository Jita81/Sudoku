import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NumberPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onNumberSelect: (num: number) => void;
  onClear: () => void;
  notesMode: boolean;
  gridSize?: number;
}

export const NumberPopup: React.FC<NumberPopupProps> = ({
  isOpen,
  onClose,
  onNumberSelect,
  onClear,
  notesMode,
  gridSize = 9
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // For mobile, always center the popup
  const isMobile = window.innerWidth < 768;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={onClose}
          />
          
          {/* Number Popup */}
          <motion.div
            ref={popupRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            className={`fixed z-50 bg-white rounded-2xl shadow-2xl p-4 ${
              isMobile ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''
            }`}
          >
            <div className="text-center mb-3">
              <h3 className="text-sm font-semibold text-gray-700">
                {notesMode ? 'Add Note' : 'Select Number'}
              </h3>
            </div>
            
            {/* Number Grid */}
            <div className={`grid ${gridSize === 4 ? 'grid-cols-2' : 'grid-cols-3'} gap-2 mb-3`}>
              {Array.from({length: gridSize}, (_, i) => i + 1).map(num => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onNumberSelect(num);
                  }}
                  className={`
                    w-16 h-16 text-2xl font-semibold rounded-xl
                    transition-all duration-200
                    ${notesMode 
                      ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' 
                      : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                    }
                    shadow-sm hover:shadow-md
                  `}
                >
                  {num}
                </motion.button>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClear();
                  onClose();
                }}
                className="flex-1 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg"
              >
                Clear
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};