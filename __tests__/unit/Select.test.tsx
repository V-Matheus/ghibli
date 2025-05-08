import { render, fireEvent } from '@testing-library/react';
import { Select } from '@/components/Select';
import { Eye } from 'lucide-react';

describe('Component: Select', () => {
  const mockOptions = [
    { value: 'default', name: 'Default' },
    { value: 'title-az', name: 'Title (A-Z)' },
    { value: 'title-za', name: 'Title (Z-A)' },
    { value: 'duration-shortest', name: 'Duration (Shortest)' },
    { value: 'duration-longest', name: 'Duration (Longest)' },
  ];

  it('should render the select with default value', () => {
    const screen = render(<Select options={mockOptions} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('default');
  });

  it('should update the selected value when an option is selected', () => {
    const screen = render(<Select options={mockOptions} />);
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'title-az' } });

    expect(selectElement).toHaveValue('title-az');
  });

  it('should call the onChange callback with the selected value', () => {
    const mockOnChange = jest.fn();
    const screen = render(
      <Select
        options={mockOptions}
        onChange={(e) => mockOnChange(e.target.value)}
      />,
    );
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'duration-longest' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('duration-longest');
  });

  it('should render all options correctly', () => {
    const screen = render(<Select options={mockOptions} />);
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(mockOptions.length);
    expect(options.map((option) => option.textContent)).toEqual(
      mockOptions.map((option) => option.name),
    );
  });

  it('should render the select with children', () => {
    const screen = render(
      <Select options={mockOptions}>
        <Eye data-testid="icon" />
      </Select>,
    );

    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });
});
