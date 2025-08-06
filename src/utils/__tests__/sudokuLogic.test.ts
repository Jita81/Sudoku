import {
  createEmptyGrid,
  isValidMove,
  solveSudoku,
  generateCompleteGrid,
  removeCells,
  generatePuzzle,
  initializeGameGrid,
  isPuzzleComplete,
  isGridValid,
  getConflicts,
  getHint,
} from '../sudokuLogic';
import { Difficulty } from '../sudokuLogic';

describe('sudokuLogic', () => {
  describe('createEmptyGrid', () => {
    it('should create a 9x9 grid filled with zeros', () => {
      const grid = createEmptyGrid();
      expect(grid).toHaveLength(9);
      expect(grid[0]).toHaveLength(9);
      expect(grid.flat().every((cell) => cell === 0)).toBe(true);
    });
  });

  describe('isValidMove', () => {
    it('should return true for valid moves', () => {
      const grid = createEmptyGrid();
      expect(isValidMove(grid, 0, 0, 1)).toBe(true);
    });

    it('should return false if number exists in same row', () => {
      const grid = createEmptyGrid();
      grid[0][3] = 5;
      expect(isValidMove(grid, 0, 6, 5)).toBe(false);
    });

    it('should return false if number exists in same column', () => {
      const grid = createEmptyGrid();
      grid[3][0] = 5;
      expect(isValidMove(grid, 6, 0, 5)).toBe(false);
    });

    it('should return false if number exists in same 3x3 box', () => {
      const grid = createEmptyGrid();
      grid[0][0] = 5;
      expect(isValidMove(grid, 2, 2, 5)).toBe(false);
    });
  });

  describe('solveSudoku', () => {
    it('should solve a valid Sudoku puzzle', () => {
      const grid = createEmptyGrid();
      // Add a few starting values
      grid[0][0] = 5;
      grid[0][1] = 3;
      grid[1][0] = 6;
      grid[2][1] = 9;
      grid[2][2] = 8;

      const solved = solveSudoku(grid);
      expect(solved).toBe(true);
      expect(grid.flat().every((cell) => cell >= 1 && cell <= 9)).toBe(true);
    });

    it('should return false for unsolvable puzzle', () => {
      const grid = createEmptyGrid();
      // Create an impossible configuration
      grid[0][0] = 5;
      grid[0][1] = 5; // Same number in row
      const solved = solveSudoku(grid);
      expect(solved).toBe(false);
    });
  });

  describe('generateCompleteGrid', () => {
    it('should generate a valid complete Sudoku grid', () => {
      const grid = generateCompleteGrid();
      expect(grid).toHaveLength(9);
      expect(grid[0]).toHaveLength(9);
      
      // Check all cells are filled
      expect(grid.flat().every((cell) => cell >= 1 && cell <= 9)).toBe(true);
      
      // Verify it's a valid Sudoku
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const value = grid[row][col];
          grid[row][col] = 0;
          expect(isValidMove(grid, row, col, value)).toBe(true);
          grid[row][col] = value;
        }
      }
    });
  });

  describe('removeCells', () => {
    it('should remove correct number of cells based on difficulty', () => {
      const grid = generateCompleteGrid();
      const difficulties: Difficulty[] = ['kiddie', 'easy', 'medium', 'hard', 'expert'];
      const expectedEmpty = { kiddie: 6, easy: 35, medium: 45, hard: 55, expert: 64 };

      difficulties.forEach((difficulty) => {
        const puzzle = removeCells(grid, difficulty);
        const emptyCells = puzzle.flat().filter((cell) => cell === 0).length;
        expect(emptyCells).toBe(expectedEmpty[difficulty]);
      });
    });
  });

  describe('generatePuzzle', () => {
    it('should generate a puzzle and solution pair', () => {
      const { puzzle, solution } = generatePuzzle('medium');
      
      // Verify puzzle has empty cells
      expect(puzzle.flat().some((cell) => cell === 0)).toBe(true);
      
      // Verify solution is complete
      expect(solution.flat().every((cell) => cell >= 1 && cell <= 9)).toBe(true);
      
      // Verify puzzle is subset of solution
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (puzzle[i][j] !== 0) {
            expect(puzzle[i][j]).toBe(solution[i][j]);
          }
        }
      }
    });
  });

  describe('initializeGameGrid', () => {
    it('should convert SudokuGrid to GameGrid correctly', () => {
      const puzzle = createEmptyGrid();
      puzzle[0][0] = 5;
      puzzle[1][1] = 3;

      const gameGrid = initializeGameGrid(puzzle);

      expect(gameGrid[0][0].value).toBe(5);
      expect(gameGrid[0][0].given).toBe(true);
      expect(gameGrid[0][0].notes.size).toBe(0);

      expect(gameGrid[0][1].value).toBe(0);
      expect(gameGrid[0][1].given).toBe(false);
    });
  });

  describe('isPuzzleComplete', () => {
    it('should return true for complete puzzle', () => {
      const { solution } = generatePuzzle('easy');
      const gameGrid = initializeGameGrid(solution);
      expect(isPuzzleComplete(gameGrid)).toBe(true);
    });

    it('should return false for incomplete puzzle', () => {
      const { puzzle } = generatePuzzle('easy');
      const gameGrid = initializeGameGrid(puzzle);
      expect(isPuzzleComplete(gameGrid)).toBe(false);
    });
  });

  describe('getConflicts', () => {
    it('should identify conflicts in row', () => {
      const grid = initializeGameGrid(createEmptyGrid());
      grid[0][0].value = 5;
      grid[0][5].value = 5;

      const conflicts = getConflicts(grid, 0, 0);
      expect(conflicts.has('0-5')).toBe(true);
    });

    it('should identify conflicts in column', () => {
      const grid = initializeGameGrid(createEmptyGrid());
      grid[0][0].value = 5;
      grid[5][0].value = 5;

      const conflicts = getConflicts(grid, 0, 0);
      expect(conflicts.has('5-0')).toBe(true);
    });

    it('should identify conflicts in box', () => {
      const grid = initializeGameGrid(createEmptyGrid());
      grid[0][0].value = 5;
      grid[2][2].value = 5;

      const conflicts = getConflicts(grid, 0, 0);
      expect(conflicts.has('2-2')).toBe(true);
    });
  });

  describe('getHint', () => {
    it('should return a valid hint for empty cell', () => {
      const { puzzle, solution } = generatePuzzle('easy');
      const gameGrid = initializeGameGrid(puzzle);

      const hint = getHint(gameGrid, solution);
      expect(hint).not.toBeNull();
      if (hint) {
        expect(hint.row).toBeGreaterThanOrEqual(0);
        expect(hint.row).toBeLessThan(9);
        expect(hint.col).toBeGreaterThanOrEqual(0);
        expect(hint.col).toBeLessThan(9);
        expect(hint.value).toBe(solution[hint.row][hint.col]);
        expect(gameGrid[hint.row][hint.col].value).toBe(0);
      }
    });

    it('should return null for complete puzzle', () => {
      const { solution } = generatePuzzle('easy');
      const gameGrid = initializeGameGrid(solution);

      const hint = getHint(gameGrid, solution);
      expect(hint).toBeNull();
    });
  });
});