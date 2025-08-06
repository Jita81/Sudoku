import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import { SudokuGrid } from './components/SudokuGrid';
import { NumberPad } from './components/NumberPad';
import { GameControls } from './components/GameControls';
import { GameStats } from './components/GameStats';
import { VictoryModal } from './components/VictoryModal';
import { MobileBottomSheet } from './components/MobileBottomSheet';
import { NumberPopup } from './components/NumberPopup';
import { useGameState } from './hooks/useGameState';
import { useIsMobile } from './hooks/useIsMobile';

function App() {
  const [gameState, gameActions] = useGameState();
  const [showVictory, setShowVictory] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showNumberPopup, setShowNumberPopup] = React.useState(false);
  const isMobile = useIsMobile();
  
  // Calculate grid size based on difficulty
  const gridSize = gameState.difficulty === 'kiddie' ? 4 : 9;

  useEffect(() => {
    if (gameState.isComplete) {
      setShowVictory(true);
    }
  }, [gameState.isComplete]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.isPaused || !gameState.selectedCell) return;

      if (e.key >= '1' && e.key <= '9') {
        gameActions.inputValue(parseInt(e.key));
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        gameActions.clearCell();
      } else if (e.key === 'n' || e.key === 'N') {
        gameActions.toggleNotesMode();
      } else if (e.key === 'h' || e.key === 'H') {
        gameActions.useHint();
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        if (e.shiftKey) {
          gameActions.redo();
        } else {
          gameActions.undo();
        }
      } else if (e.key === 'p' || e.key === 'P') {
        gameActions.togglePause();
      } else if (e.key === 'ArrowUp' && gameState.selectedCell[0] > 0) {
        gameActions.selectCell(gameState.selectedCell[0] - 1, gameState.selectedCell[1]);
      } else if (e.key === 'ArrowDown' && gameState.selectedCell[0] < 8) {
        gameActions.selectCell(gameState.selectedCell[0] + 1, gameState.selectedCell[1]);
      } else if (e.key === 'ArrowLeft' && gameState.selectedCell[1] > 0) {
        gameActions.selectCell(gameState.selectedCell[0], gameState.selectedCell[1] - 1);
      } else if (e.key === 'ArrowRight' && gameState.selectedCell[1] < 8) {
        gameActions.selectCell(gameState.selectedCell[0], gameState.selectedCell[1] + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.selectedCell, gameState.isPaused, gameActions]);

  // Handle cell click on mobile - show number popup
  const handleMobileCellClick = (row: number, col: number) => {
    gameActions.selectCell(row, col);
    // Show number popup only for empty cells that aren't given
    if (gameState.grid[row] && gameState.grid[row][col] && 
        gameState.grid[row][col].value === 0 && 
        !gameState.grid[row][col].given) {
      setShowNumberPopup(true);
    }
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        {/* Mobile Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-sm px-4 py-3"
        >
          <h1 className="text-2xl font-bold text-purple-800 font-display text-center">
            Kudzai's Sudoku
          </h1>
        </motion.header>

        {/* Game Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {/* Compact Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm p-3 mb-4 w-full max-w-sm"
          >
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="text-gray-600">Time:</span>
                <span className="ml-1 font-semibold">
                  {Math.floor(gameState.time / 60)}:{(gameState.time % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Mistakes:</span>
                <span className="ml-1 font-semibold text-red-600">{gameState.mistakes}</span>
              </div>
              <div className="text-sm">
                <span className="capitalize font-semibold text-purple-600">{gameState.difficulty}</span>
              </div>
            </div>
          </motion.div>

          {/* Sudoku Grid */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6"
          >
            <SudokuGrid
              grid={gameState.grid}
              selectedCell={gameState.selectedCell}
              conflicts={gameState.conflicts}
              onCellClick={handleMobileCellClick}
              isPaused={gameState.isPaused}
            />
          </motion.div>
        </div>

        {/* Floating Menu Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMobileMenu(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-30"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </motion.button>

        {/* Mobile Bottom Sheet Menu */}
        <MobileBottomSheet
          isOpen={showMobileMenu}
          onClose={() => setShowMobileMenu(false)}
        >
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Game Menu</h3>
            
            <GameControls
              onNewGame={(difficulty) => {
                gameActions.newGame(difficulty);
                setShowMobileMenu(false);
              }}
              onUndo={gameActions.undo}
              onRedo={gameActions.redo}
              onHint={() => {
                gameActions.useHint();
                setShowMobileMenu(false);
              }}
              onTogglePause={gameActions.togglePause}
              onToggleNotes={() => {
                gameActions.toggleNotesMode();
                setShowMobileMenu(false);
              }}
              onCheckErrors={() => {
                gameActions.checkErrors();
                setShowMobileMenu(false);
              }}
              canUndo={gameState.undoStack.length > 0}
              canRedo={gameState.redoStack.length > 0}
              isPaused={gameState.isPaused}
              notesMode={gameState.notesMode}
              hintsUsed={gameState.hintsUsed}
            />

            <div className="border-t pt-4">
              <GameStats
                time={gameState.time}
                mistakes={gameState.mistakes}
                hintsUsed={gameState.hintsUsed}
                difficulty={gameState.difficulty}
              />
            </div>
          </div>
        </MobileBottomSheet>

        <VictoryModal
          isOpen={showVictory}
          time={gameState.time}
          mistakes={gameState.mistakes}
          hintsUsed={gameState.hintsUsed}
          difficulty={gameState.difficulty}
          onNewGame={(difficulty) => {
            gameActions.newGame(difficulty);
            setShowVictory(false);
          }}
          onClose={() => setShowVictory(false)}
        />

        {/* Number Popup for Cell Selection */}
        <NumberPopup
          isOpen={showNumberPopup}
          onClose={() => setShowNumberPopup(false)}
          onNumberSelect={(num) => {
            gameActions.inputValue(num);
            if (!gameState.notesMode) {
              setShowNumberPopup(false);
            }
          }}
          onClear={() => {
            gameActions.clearCell();
            setShowNumberPopup(false);
          }}
          notesMode={gameState.notesMode}
          gridSize={gridSize}
        />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-purple-800 font-display mb-2">
          Kudzai's Sudoku Paradise
        </h1>
        <p className="text-gray-600 text-lg">
          Challenge your mind with endless Sudoku puzzles! 🧩
        </p>
      </motion.header>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Game Stats */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:order-1"
          >
            <GameStats
              time={gameState.time}
              mistakes={gameState.mistakes}
              hintsUsed={gameState.hintsUsed}
              difficulty={gameState.difficulty}
            />
          </motion.div>

          {/* Center Column - Game Grid */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:order-2"
          >
            <SudokuGrid
              grid={gameState.grid}
              selectedCell={gameState.selectedCell}
              conflicts={gameState.conflicts}
              onCellClick={gameActions.selectCell}
              isPaused={gameState.isPaused}
            />
          </motion.div>

          {/* Right Column - Controls */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:order-3 space-y-6"
          >
            <GameControls
              onNewGame={gameActions.newGame}
              onUndo={gameActions.undo}
              onRedo={gameActions.redo}
              onHint={gameActions.useHint}
              onTogglePause={gameActions.togglePause}
              onToggleNotes={gameActions.toggleNotesMode}
              onCheckErrors={gameActions.checkErrors}
              canUndo={gameState.undoStack.length > 0}
              canRedo={gameState.redoStack.length > 0}
              isPaused={gameState.isPaused}
              notesMode={gameState.notesMode}
              hintsUsed={gameState.hintsUsed}
            />
            
            <NumberPad
              onNumberClick={gameActions.inputValue}
              onClearClick={gameActions.clearCell}
              notesMode={gameState.notesMode}
              gridSize={gridSize}
            />
          </motion.div>
        </div>

        {/* Keyboard Shortcuts */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Keyboard Shortcuts</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Numbers 1-9:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">Fill cell</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delete/Backspace:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">Clear cell</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Arrow Keys:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">Navigate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">N:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">Toggle notes</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">H:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">Get hint</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">P:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">Pause/Resume</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ctrl/Cmd + Z:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">Undo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ctrl/Cmd + Shift + Z:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">Redo</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <VictoryModal
        isOpen={showVictory}
        time={gameState.time}
        mistakes={gameState.mistakes}
        hintsUsed={gameState.hintsUsed}
        difficulty={gameState.difficulty}
        onNewGame={(difficulty) => {
          gameActions.newGame(difficulty);
          setShowVictory(false);
        }}
        onClose={() => setShowVictory(false)}
      />
    </div>
  );
}

export default App;