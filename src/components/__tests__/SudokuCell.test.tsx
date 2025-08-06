import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { SudokuCell } from '../SudokuCell';
import { Cell } from '../../utils/sudokuLogic';

describe('SudokuCell', () => {
  const mockCell: Cell = {
    value: 0,
    given: false,
    notes: new Set(),
  };

  const defaultProps = {
    cell: mockCell,
    row: 0,
    col: 0,
    isSelected: false,
    isHighlighted: false,
    hasConflict: false,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty cell correctly', () => {
    const { container } = render(<SudokuCell {...defaultProps} />);
    const cell = container.firstChild;
    expect(cell).toHaveClass('sudoku-cell');
    expect(cell).not.toHaveTextContent(/[1-9]/);
  });

  it('renders cell with value', () => {
    const props = {
      ...defaultProps,
      cell: { ...mockCell, value: 5 },
    };
    render(<SudokuCell {...props} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('applies given cell styling', () => {
    const props = {
      ...defaultProps,
      cell: { ...mockCell, value: 5, given: true },
    };
    const { container } = render(<SudokuCell {...props} />);
    expect(container.firstChild).toHaveClass('given');
  });

  it('applies selected styling', () => {
    const props = {
      ...defaultProps,
      isSelected: true,
    };
    const { container } = render(<SudokuCell {...props} />);
    expect(container.firstChild).toHaveClass('selected');
  });

  it('applies highlighted styling', () => {
    const props = {
      ...defaultProps,
      isHighlighted: true,
    };
    const { container } = render(<SudokuCell {...props} />);
    expect(container.firstChild).toHaveClass('highlighted');
  });

  it('applies conflict styling', () => {
    const props = {
      ...defaultProps,
      hasConflict: true,
    };
    const { container } = render(<SudokuCell {...props} />);
    expect(container.firstChild).toHaveClass('error');
  });

  it('handles click events', () => {
    const { container } = render(<SudokuCell {...defaultProps} />);
    fireEvent.click(container.firstChild!);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders notes correctly', () => {
    const props = {
      ...defaultProps,
      cell: { ...mockCell, notes: new Set([1, 5, 9]) },
    };
    render(<SudokuCell {...props} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('applies border styles for grid sections', () => {
    const props1 = { ...defaultProps, row: 0, col: 2 };
    const { container: container1 } = render(<SudokuCell {...props1} />);
    expect(container1.firstChild).toHaveClass('border-r-2');

    const props2 = { ...defaultProps, row: 2, col: 0 };
    const { container: container2 } = render(<SudokuCell {...props2} />);
    expect(container2.firstChild).toHaveClass('border-b-2');
  });
});