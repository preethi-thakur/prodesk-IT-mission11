import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../components/Form.jsx';

describe('Form component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders without crashing', () => {
    const handleSubmit = jest.fn();
    render(<Form onSubmit={handleSubmit} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('submits the form with input text and counter value', async () => {
    const handleSubmit = jest.fn();
    render(<Form onSubmit={handleSubmit} />);

    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: /name/i });
    const increment = screen.getByRole('button', { name: /increment/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(input, 'Tester');
    await user.click(increment);
    await user.click(increment);
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({ text: 'Tester', count: 2 });
  });
});
