import { useState, useCallback, useEffect } from 'react';

import {
  GameGrid,
  SudokuGrid,
  Difficulty,
  generatePuzzle,
  initializeGameGrid,
  isPuzzleComplete,
  getConflicts,
  getHint,
  isValidMove
} from '../utils/sudokuLogic';

export interface GameState {
  grid: GameGrid;
  solution: SudokuGrid;
  selectedCell: [number, number] | null;
  conflicts: Set<string>;
  isComplete: boolean;
  isPaused: boolean;
  difficulty: Difficulty;
  hintsUsed: number;
  mistakes: number;
  time: number;
  undoStack: GameGrid[];
  redoStack: GameGrid[];
  notesMode: boolean;
}

export interface GameActions {
  selectCell: (row: number, col: number) => void;
  inputValue: (value: number) => void;
  clearCell: () => void;
  toggleNote: (value: number) => void;
  newGame: (difficulty: Difficulty) => void;
  useHint: () => void;
  undo: () => void;
  redo: () => void;
  togglePause: () => void;
  toggleNotesMode: () => void;
  checkErrors: () => void;
}

const STORAGE_KEY = 'kudzai-sudoku-game';

export const useGameState = (): [GameState, GameActions] => {
  const [grid, setGrid] = useState<GameGrid>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert notes from array back to Set
      return parsed.grid.map((row: any[]) =>
        row.map((cell: any) => ({
          ...cell,
          notes: new Set(cell.notes)
        }))
      );
    }
    const { puzzle } = generatePuzzle('medium');
    return initializeGameGrid(puzzle);
  });

  const [solution, setSolution] = useState<SudokuGrid>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved).solution;
    }
    const { solution } = generatePuzzle('medium');
    return solution;
  });

  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [conflicts, setConflicts] = useState<Set<string>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [undoStack, setUndoStack] = useState<GameGrid[]>([]);
  const [redoStack, setRedoStack] = useState<GameGrid[]>([]);
  const [notesMode, setNotesMode] = useState(false);

  // Save game state to localStorage
  useEffect(() => {
    const gameData = {
      grid: grid.map(row =>
        row.map(cell => ({
          ...cell,
          notes: Array.from(cell.notes)
        }))
      ),
      solution,
      difficulty,
      hintsUsed,
      mistakes,
      time
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
  }, [grid, solution, difficulty, hintsUsed, mistakes, time]);

  // Timer
  useEffect(() => {
    if (!isPaused && !isComplete) {
      const interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused, isComplete]);

  // Check completion
  useEffect(() => {
    if (isPuzzleComplete(grid)) {
      const hasErrors = conflicts.size > 0;
      if (!hasErrors) {
        setIsComplete(true);
      }
    }
  }, [grid, conflicts]);

  const selectCell = useCallback((row: number, col: number) => {
    setSelectedCell([row, col]);
    const cellConflicts = getConflicts(grid, row, col);
    setConflicts(cellConflicts);
  }, [grid]);

  const saveState = useCallback(() => {
    setUndoStack(prev => [...prev, grid.map(row => row.map(cell => ({ ...cell })))]);
    setRedoStack([]);
  }, [grid]);

  const inputValue = useCallback((value: number) => {
    if (!selectedCell || grid[selectedCell[0]][selectedCell[1]].given) return;

    const [row, col] = selectedCell;
    
    if (notesMode) {
      const newGrid = grid.map(r => r.map(c => ({ ...c })));
      const notes = new Set(newGrid[row][col].notes);
      if (notes.has(value)) {
        notes.delete(value);
      } else {
        notes.add(value);
      }
      newGrid[row][col].notes = notes;
      setGrid(newGrid);
    } else {
      saveState();
      const newGrid = grid.map(r => r.map(c => ({ ...c })));
      
      // Check if the move violates Sudoku rules (this is a mistake)
      const currentGrid = grid.map(r => r.map(c => c.value));
      if (!isValidMove(currentGrid, row, col, value)) {
        setMistakes(m => m + 1);
      }
      
      newGrid[row][col].value = value;
      newGrid[row][col].notes.clear();
      
      // Clear notes in same row, column, and box
      for (let i = 0; i < 9; i++) {
        newGrid[row][i].notes.delete(value);
        newGrid[i][col].notes.delete(value);
      }
      
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          newGrid[r][c].notes.delete(value);
        }
      }
      
      setGrid(newGrid);
      const cellConflicts = getConflicts(newGrid, row, col);
      setConflicts(cellConflicts);
    }
  }, [selectedCell, grid, notesMode, saveState, solution]);

  const clearCell = useCallback(() => {
    if (!selectedCell || grid[selectedCell[0]][selectedCell[1]].given) return;
    
    saveState();
    const [row, col] = selectedCell;
    const newGrid = grid.map(r => r.map(c => ({ ...c })));
    newGrid[row][col].value = 0;
    newGrid[row][col].notes.clear();
    setGrid(newGrid);
    setConflicts(new Set());
  }, [selectedCell, grid, saveState]);

  const toggleNote = useCallback((value: number) => {
    if (!selectedCell || grid[selectedCell[0]][selectedCell[1]].given) return;
    
    const [row, col] = selectedCell;
    const newGrid = grid.map(r => r.map(c => ({ ...c })));
    const notes = new Set(newGrid[row][col].notes);
    
    if (notes.has(value)) {
      notes.delete(value);
    } else {
      notes.add(value);
    }
    
    newGrid[row][col].notes = notes;
    setGrid(newGrid);
  }, [selectedCell, grid]);

  const newGame = useCallback((newDifficulty: Difficulty) => {
    const { puzzle, solution } = generatePuzzle(newDifficulty);
    setGrid(initializeGameGrid(puzzle));
    setSolution(solution);
    setSelectedCell(null);
    setConflicts(new Set());
    setIsComplete(false);
    setDifficulty(newDifficulty);
    setHintsUsed(0);
    setMistakes(0);
    setTime(0);
    setUndoStack([]);
    setRedoStack([]);
    setNotesMode(false);
  }, []);

  const useHint = useCallback(() => {
    const hint = getHint(grid, solution);
    if (hint) {
      saveState();
      const { row, col, value } = hint;
      const newGrid = grid.map(r => r.map(c => ({ ...c })));
      newGrid[row][col].value = value;
      newGrid[row][col].notes.clear();
      setGrid(newGrid);
      setHintsUsed(h => h + 1);
      setSelectedCell([row, col]);
    }
  }, [grid, solution, saveState]);

  const undo = useCallback(() => {
    if (undoStack.length > 0) {
      const prevGrid = undoStack[undoStack.length - 1];
      setRedoStack(prev => [...prev, grid]);
      setUndoStack(prev => prev.slice(0, -1));
      setGrid(prevGrid);
    }
  }, [undoStack, grid]);

  const redo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextGrid = redoStack[redoStack.length - 1];
      setUndoStack(prev => [...prev, grid]);
      setRedoStack(prev => prev.slice(0, -1));
      setGrid(nextGrid);
    }
  }, [redoStack, grid]);

  const togglePause = useCallback(() => {
    setIsPaused(p => !p);
  }, []);

  const toggleNotesMode = useCallback(() => {
    setNotesMode(n => !n);
  }, []);

  const checkErrors = useCallback(() => {
    const allConflicts = new Set<string>();
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col].value !== 0) {
          const cellConflicts = getConflicts(grid, row, col);
          cellConflicts.forEach(c => allConflicts.add(c));
          if (cellConflicts.size > 0) {
            allConflicts.add(`${row}-${col}`);
          }
        }
      }
    }
    setConflicts(allConflicts);
  }, [grid]);

  return [
    {
      grid,
      solution,
      selectedCell,
      conflicts,
      isComplete,
      isPaused,
      difficulty,
      hintsUsed,
      mistakes,
      time,
      undoStack,
      redoStack,
      notesMode
    },
    {
      selectCell,
      inputValue,
      clearCell,
      toggleNote,
      newGame,
      useHint,
      undo,
      redo,
      togglePause,
      toggleNotesMode,
      checkErrors
    }
  ];
};