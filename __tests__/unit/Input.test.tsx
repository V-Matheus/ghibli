import {
  InputCheckbox,
  InputFild,
  InputIcon,
  InputRoot,
} from '@/components/Input';
import { render } from '@testing-library/react';

describe('Component: Input', () => {
  it('should render an InputRoot', () => {
    const screen = render(<InputRoot>Input Content</InputRoot>);
    expect(screen.getByText('Input Content')).toBeVisible();
  });

  it('should render an InputIcon', () => {
    const screen = render(<InputIcon>Input Icon</InputIcon>);

    expect(screen.getByText('Input Icon')).toBeVisible();
  });

  it('should render an InputFild', () => {
    const screen = render(<InputFild aria-label="input" />);

    expect(screen.getByRole('textbox', { name: 'input' })).toBeVisible();
  });

  it('should render an InputCheckbox', () => {
    const screen = render(
      <InputCheckbox aria-label="checkbox">Input Label</InputCheckbox>,
    );

    expect(screen.getByRole('checkbox', { name: 'checkbox' })).toBeVisible();
  });

  it('should check the checkbox when clicking on the label', () => {
    const screen = render(
      <InputCheckbox aria-label="checkbox">Input Label</InputCheckbox>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'checkbox' });
    const label = screen.getByText('Input Label');

    expect(checkbox).not.toBeChecked();

    label.click();

    expect(checkbox).toBeChecked();
  });
});
