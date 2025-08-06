// Core game types
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type SudokuValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SudokuGrid = SudokuValue[][];

export interface Cell {
  value: SudokuValue;
  given: boolean;
  notes: Set<number>;
}

export type GameGrid = Cell[][];

export type Position = [row: number, col: number];

// Game state types
export interface GameState {
  grid: GameGrid;
  solution: SudokuGrid;
  selectedCell: Position | null;
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

// Component prop types
export interface SudokuCellProps {
  cell: Cell;
  row: number;
  col: number;
  isSelected: boolean;
  isHighlighted: boolean;
  hasConflict: boolean;
  onClick: () => void;
}

export interface SudokuGridProps {
  grid: GameGrid;
  selectedCell: Position | null;
  conflicts: Set<string>;
  onCellClick: (row: number, col: number) => void;
  isPaused: boolean;
}

export interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onClearClick: () => void;
  notesMode: boolean;
  disabledNumbers?: Set<number>;
}

export interface GameControlsProps {
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

export interface GameStatsProps {
  time: number;
  mistakes: number;
  hintsUsed: number;
  difficulty: Difficulty;
}

export interface VictoryModalProps {
  isOpen: boolean;
  time: number;
  mistakes: number;
  hintsUsed: number;
  difficulty: Difficulty;
  onNewGame: (difficulty: Difficulty) => void;
  onClose: () => void;
}

export interface NumberPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onNumberSelect: (num: number) => void;
  onClear: () => void;
  notesMode: boolean;
}

export interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Utility types
export interface Hint {
  row: number;
  col: number;
  value: SudokuValue;
}

export interface PuzzleData {
  puzzle: SudokuGrid;
  solution: SudokuGrid;
}

// Storage types
export interface SavedGameState {
  grid: Array<Array<{
    value: SudokuValue;
    given: boolean;
    notes: number[];
  }>>;
  solution: SudokuGrid;
  difficulty: Difficulty;
  hintsUsed: number;
  mistakes: number;
  time: number;
}