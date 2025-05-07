import { Button } from '@/components/Button';
import { render } from '@testing-library/react';

describe('Component: Button', () => {
  it('should render a button', () => {
    const screen = render(<Button>Button Content</Button>);

    expect(
      screen.getByRole('button', { name: 'Button Content' }),
    ).toBeVisible();
  });
});
