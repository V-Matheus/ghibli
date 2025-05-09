import { render } from '@testing-library/react';
import Tag from '@/components/Tag';

describe('Component: Tag', () => {
  it('should render the tag with the correct color and default style', () => {
    const { getByText } = render(<Tag color="red">Test Tag</Tag>);

    const tagElement = getByText('Test Tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass('bg-red-700 text-white');
  });

  it('should render the tag with the outline style', () => {
    const { getByText } = render(
      <Tag color="green" outline>
        Test Tag
      </Tag>,
    );

    const tagElement = getByText('Test Tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass('bg-green-50 text-green-700 border-green-200');
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
      const { getByText } = render(<Tag color={color}>Test {color}</Tag>);
      const tagElement = getByText(`Test ${color}`);
      expect(tagElement).toBeInTheDocument();
      expect(tagElement).toHaveClass(`bg-${color}-700 text-white`);
    });
  });

  it('should accept additional props', () => {
    const { getByTestId } = render(
      <Tag color="blue" data-testid="custom-tag">
        Custom Tag
      </Tag>,
    );

    const tagElement = getByTestId('custom-tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveTextContent('Custom Tag');
  });

  it('should render the tag with custom styles', () => {
    const { getByText } = render(
      <Tag
        color="yellow"
        customStyles={{
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-300',
        }}
      >
        Custom Styled Tag
      </Tag>,
    );

    const tagElement = getByText('Custom Styled Tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass('bg-gray-100 text-gray-800 border-gray-300');
  });

  it('should render the tag with custom styles and outline', () => {
    const { getByText } = render(
      <Tag
        color="purple"
        outline
        customStyles={{
          bg: 'bg-purple-100',
          text: 'text-purple-900',
          border: 'border-purple-400',
        }}
      >
        Custom Outline Tag
      </Tag>,
    );

    const tagElement = getByText('Custom Outline Tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass('bg-purple-100 text-purple-900 border-purple-400');
  });
});