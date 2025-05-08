import { render } from '@testing-library/react';
import Tag from '@/components/Tag';

describe('Component: Tag', () => {
  it('should render the tag with the correct color and default style', () => {
    const screen = render(<Tag color="red">Test Tag</Tag>);

    const tagElement = screen.getByText('Test Tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass('bg-red-700 text-white border-red-200');
  });

  it('should render the tag with the outline style', () => {
    const screen = render(
      <Tag color="green" outline>
        Test Tag
      </Tag>,
    );

    const tagElement = screen.getByText('Test Tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass(
      'bg-green-50 text-green-700 border-green-200',
    );
  });

  it('should render the tag with different colors', () => {
    const colors: ('red' | 'green' | 'blue' | 'yellow' | 'purple')[] = [
      'red',
      'green',
      'blue',
      'yellow',
      'purple',
    ];

    colors.forEach((color) => {
      const screen = render(<Tag color={color}>Test {color}</Tag>);
      const tagElement = screen.getByText(`Test ${color}`);
      expect(tagElement).toBeInTheDocument();
      expect(tagElement).toHaveClass(
        `bg-${color}-700 text-white border-${color}-200`,
      );
    });
  });

  it('should accept additional props', () => {
    const screen = render(
      <Tag color="blue" data-testid="custom-tag">
        Custom Tag
      </Tag>,
    );

    const tagElement = screen.getByTestId('custom-tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveTextContent('Custom Tag');
  });
});
