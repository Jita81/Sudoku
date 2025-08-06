import { renderHook, act } from '@testing-library/react';

import { useGameState } from '../useGameState';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock sudokuLogic functions
jest.mock('../../utils/sudokuLogic', () => ({
  ...jest.requireActual('../../utils/sudokuLogic'),
  generatePuzzle: jest.fn(() => ({
    puzzle: Array(9).fill(null).map(() => Array(9).fill(0)),
    solution: Array(9).fill(null).map(() => Array(9).fill(1)),
  })),
}));

describe('useGameState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useGameState());
    const [state] = result.current;

    expect(state.selectedCell).toBeNull();
    expect(state.conflicts).toEqual(new Set());
    expect(state.isComplete).toBe(false);
    expect(state.isPaused).toBe(false);
    expect(state.difficulty).toBe('medium');
    expect(state.hintsUsed).toBe(0);
    expect(state.mistakes).toBe(0);
    expect(state.time).toBe(0);
    expect(state.notesMode).toBe(false);
  });

  it('selects a cell', () => {
    const { result } = renderHook(() => useGameState());
    const [, actions] = result.current;

    act(() => {
      actions.selectCell(3, 4);
    });

    const [state] = result.current;
    expect(state.selectedCell).toEqual([3, 4]);
  });

  it('inputs a value in normal mode', () => {
    const { result } = renderHook(() => useGameState());
    const [, actions] = result.current;

    act(() => {
      actions.selectCell(0, 0);
    });

    act(() => {
      actions.inputValue(5);
    });

    const [state] = result.current;
    expect(state.grid[0][0].value).toBe(5);
    expect(state.undoStack.length).toBe(1);
  });

  it('toggles notes mode', () => {
    const { result } = renderHook(() => useGameState());
    const [initialState, actions] = result.current;

    expect(initialState.notesMode).toBe(false);

    act(() => {
      actions.toggleNotesMode();
    });

    const [state] = result.current;
    expect(state.notesMode).toBe(true);
  });

  it('adds notes in notes mode', () => {
    const { result } = renderHook(() => useGameState());
    const [, actions] = result.current;

    act(() => {
      actions.toggleNotesMode();
      actions.selectCell(0, 0);
      actions.inputValue(3);
    });

    const [state] = result.current;
    expect(state.grid[0][0].notes.has(3)).toBe(true);
    expect(state.grid[0][0].value).toBe(0);
  });

  it('clears a cell', () => {
    const { result } = renderHook(() => useGameState());
    const [, actions] = result.current;

    act(() => {
      actions.selectCell(0, 0);
      actions.inputValue(5);
    });

    act(() => {
      actions.clearCell();
    });

    const [state] = result.current;
    expect(state.grid[0][0].value).toBe(0);
  });

  it('performs undo operation', () => {
    const { result } = renderHook(() => useGameState());
    const [, actions] = result.current;

    act(() => {
      actions.selectCell(0, 0);
      actions.inputValue(5);
    });

    act(() => {
      actions.undo();
    });

    const [state] = result.current;
    expect(state.grid[0][0].value).toBe(0);
    expect(state.redoStack.length).toBe(1);
  });

  it('performs redo operation', () => {
    const { result } = renderHook(() => useGameState());
    const [, actions] = result.current;

    act(() => {
      actions.selectCell(0, 0);
      actions.inputValue(5);
    });

    act(() => {
      actions.undo();
    });

    act(() => {
      actions.redo();
    });

    const [state] = result.current;
    expect(state.grid[0][0].value).toBe(5);
  });

  it('toggles pause state', () => {
    const { result } = renderHook(() => useGameState());
    const [initialState, actions] = result.current;

    expect(initialState.isPaused).toBe(false);

    act(() => {
      actions.togglePause();
    });

    const [state] = result.current;
    expect(state.isPaused).toBe(true);
  });

  it('starts a new game', () => {
    const { result } = renderHook(() => useGameState());
    const [, actions] = result.current;

    act(() => {
      actions.selectCell(0, 0);
      actions.inputValue(5);
    });

    act(() => {
      actions.newGame('hard');
    });

    const [state] = result.current;
    expect(state.difficulty).toBe('hard');
    expect(state.selectedCell).toBeNull();
    expect(state.time).toBe(0);
    expect(state.mistakes).toBe(0);
    expect(state.hintsUsed).toBe(0);
  });

  it('uses a hint', () => {
    const { result } = renderHook(() => useGameState());
    const [, actions] = result.current;

    act(() => {
      actions.useHint();
    });

    const [state] = result.current;
    expect(state.hintsUsed).toBe(1);
  });

  it('saves state to localStorage', () => {
    const { result } = renderHook(() => useGameState());
    const [, actions] = result.current;

    act(() => {
      actions.selectCell(0, 0);
      actions.inputValue(5);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'kudzai-sudoku-game',
      expect.any(String)
    );
  });

  it('loads state from localStorage', () => {
    const savedState = {
      grid: Array(9).fill(null).map(() =>
        Array(9).fill(null).map(() => ({
          value: 0,
          given: false,
          notes: [],
        }))
      ),
      solution: Array(9).fill(null).map(() => Array(9).fill(1)),
      difficulty: 'hard',
      hintsUsed: 3,
      mistakes: 2,
      time: 300,
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedState));

    const { result } = renderHook(() => useGameState());
    const [state] = result.current;

    expect(state.difficulty).toBe('hard');
    expect(state.hintsUsed).toBe(3);
    expect(state.mistakes).toBe(2);
    expect(state.time).toBe(300);
  });
});