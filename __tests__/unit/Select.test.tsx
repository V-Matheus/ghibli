import { render, fireEvent } from '@testing-library/react';
import { Select } from '@/components/Select';

describe('Component: Select', () => {
  it('should render the select with default value', () => {
    const screen = render(<Select />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('default');
  });

  it('should update the selected value when an option is selected', () => {
    const screen = render(<Select />);
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'title-az' } });

    expect(selectElement).toHaveValue('title-az');
  });

  it('should call the onChange callback with the selected value', () => {
    const mockOnChange = jest.fn();
    const screen = render(
      <Select onChange={(e) => mockOnChange(e.target.value)} />,
    );
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'duration-longest' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('duration-longest');
  });

  it('should render all options correctly', () => {
    const screen = render(<Select />);
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(9);
    expect(options.map((option) => option.textContent)).toEqual([
      'Default',
      'Title (A-Z)',
      'Title (Z-A)',
      'Duration (Shortest)',
      'Duration (Longest)',
      'Your Rating (Highest)',
      'Your Rating (Lowest)',
      'Score (Highest)',
      'Score (Lowest)',
    ]);
  });
});
