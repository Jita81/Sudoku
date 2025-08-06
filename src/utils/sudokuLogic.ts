export type SudokuGrid = number[][];
export type Difficulty = 'kiddie' | 'easy' | 'medium' | 'hard' | 'expert';
export type GridSize = 4 | 9;

export interface Cell {
  value: number;
  given: boolean;
  notes: Set<number>;
}

export type GameGrid = Cell[][];

// Get grid size for difficulty
export const getGridSize = (difficulty: Difficulty): GridSize => {
  return difficulty === 'kiddie' ? 4 : 9;
};

// Get box size (2x2 or 3x3)
export const getBoxSize = (gridSize: GridSize): number => {
  return gridSize === 4 ? 2 : 3;
};

// Create an empty grid
export const createEmptyGrid = (gridSize: GridSize = 9): SudokuGrid => {
  return Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
};

// Check if a number is valid in a given position
export const isValidMove = (grid: SudokuGrid, row: number, col: number, num: number): boolean => {
  const gridSize = grid.length;
  const boxSize = getBoxSize(gridSize as GridSize);
  
  // Check row
  for (let x = 0; x < gridSize; x++) {
    if (grid[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < gridSize; x++) {
    if (grid[x][col] === num) return false;
  }

  // Check box (2x2 or 3x3)
  const boxRow = Math.floor(row / boxSize) * boxSize;
  const boxCol = Math.floor(col / boxSize) * boxSize;
  for (let i = 0; i < boxSize; i++) {
    for (let j = 0; j < boxSize; j++) {
      if (grid[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
};

// Solve Sudoku using backtracking
export const solveSudoku = (grid: SudokuGrid): boolean => {
  const gridSize = grid.length;
  const gridCopy = grid.map(row => [...row]);
  
  const solve = (): boolean => {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (gridCopy[row][col] === 0) {
          for (let num = 1; num <= gridSize; num++) {
            if (isValidMove(gridCopy, row, col, num)) {
              gridCopy[row][col] = num;
              if (solve()) return true;
              gridCopy[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  if (solve()) {
    grid.forEach((row, i) => {
      row.forEach((_, j) => {
        grid[i][j] = gridCopy[i][j];
      });
    });
    return true;
  }
  return false;
};

// Generate a complete valid Sudoku grid
export const generateCompleteGrid = (gridSize: GridSize = 9): SudokuGrid => {
  const grid = createEmptyGrid(gridSize);
  const boxSize = getBoxSize(gridSize);
  
  // Fill diagonal boxes first (they don't affect each other)
  for (let box = 0; box < gridSize; box += boxSize) {
    const nums = Array.from({length: gridSize}, (_, i) => i + 1);
    for (let i = 0; i < boxSize; i++) {
      for (let j = 0; j < boxSize; j++) {
        const randomIndex = Math.floor(Math.random() * nums.length);
        grid[box + i][box + j] = nums[randomIndex];
        nums.splice(randomIndex, 1);
      }
    }
  }
  
  // Solve the rest
  solveSudoku(grid);
  return grid;
};

// Remove cells based on difficulty
export const removeCells = (grid: SudokuGrid, difficulty: Difficulty): SudokuGrid => {
  const puzzle = grid.map(row => [...row]);
  const gridSize = grid.length;
  
  // For 4x4 kiddie grid, we have fewer cells
  const cellsToRemove = difficulty === 'kiddie' ? 6 : {
    easy: 35,
    medium: 45,
    hard: 55,
    expert: 64
  }[difficulty];

  const positions: [number, number][] = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      positions.push([i, j]);
    }
  }

  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  // Remove cells
  for (let i = 0; i < cellsToRemove; i++) {
    const [row, col] = positions[i];
    puzzle[row][col] = 0;
  }

  return puzzle;
};

// Generate a new puzzle
export const generatePuzzle = (difficulty: Difficulty): { puzzle: SudokuGrid; solution: SudokuGrid } => {
  const gridSize = getGridSize(difficulty);
  const solution = generateCompleteGrid(gridSize);
  const puzzle = removeCells(solution, difficulty);
  return { puzzle, solution };
};

// Convert SudokuGrid to GameGrid
export const initializeGameGrid = (puzzle: SudokuGrid): GameGrid => {
  return puzzle.map(row =>
    row.map(value => ({
      value,
      given: value !== 0,
      notes: new Set<number>()
    }))
  );
};

// Check if the puzzle is complete
export const isPuzzleComplete = (grid: GameGrid): boolean => {
  const gridSize = grid.length;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row] && grid[row][col] && grid[row][col].value === 0) return false;
    }
  }
  return true;
};

// Check if the current grid state is valid
export const isGridValid = (grid: GameGrid): boolean => {
  const sudokuGrid = grid.map(row => row.map(cell => cell.value));
  const gridSize = grid.length;
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (sudokuGrid[row][col] !== 0) {
        const num = sudokuGrid[row][col];
        sudokuGrid[row][col] = 0;
        const valid = isValidMove(sudokuGrid, row, col, num);
        sudokuGrid[row][col] = num;
        if (!valid) return false;
      }
    }
  }
  return true;
};

// Get conflicts for highlighting errors
export const getConflicts = (grid: GameGrid, row: number, col: number): Set<string> => {
  const conflicts = new Set<string>();
  const value = grid[row][col].value;
  const gridSize = grid.length;
  const boxSize = getBoxSize(gridSize as GridSize);
  
  if (value === 0) return conflicts;
  
  // Check row conflicts
  for (let c = 0; c < gridSize; c++) {
    if (c !== col && grid[row][c].value === value) {
      conflicts.add(`${row}-${c}`);
    }
  }
  
  // Check column conflicts
  for (let r = 0; r < gridSize; r++) {
    if (r !== row && grid[r][col].value === value) {
      conflicts.add(`${r}-${col}`);
    }
  }
  
  // Check box conflicts
  const boxRow = Math.floor(row / boxSize) * boxSize;
  const boxCol = Math.floor(col / boxSize) * boxSize;
  for (let r = boxRow; r < boxRow + boxSize; r++) {
    for (let c = boxCol; c < boxCol + boxSize; c++) {
      if ((r !== row || c !== col) && grid[r][c].value === value) {
        conflicts.add(`${r}-${c}`);
      }
    }
  }
  
  return conflicts;
};

// Get hint for a cell
export const getHint = (puzzle: GameGrid, solution: SudokuGrid): { row: number; col: number; value: number } | null => {
  const emptyCells: [number, number][] = [];
  const gridSize = puzzle.length;
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (puzzle[row][col].value === 0) {
        emptyCells.push([row, col]);
      }
    }
  }
  
  if (emptyCells.length === 0) return null;
  
  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return { row, col, value: solution[row][col] };
};