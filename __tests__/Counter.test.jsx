import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../components/Counter.jsx';

describe('Counter component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders without crashing and shows initial value', () => {
    render(<Counter initialValue={1} />);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });

  test('increments and decrements correctly', async () => {
    render(<Counter initialValue={1} />);
    const user = userEvent.setup();
    const increment = screen.getByRole('button', { name: /increment/i });
    const decrement = screen.getByRole('button', { name: /decrement/i });

    await user.click(increment);
    expect(screen.getByText(/count: 2/i)).toBeInTheDocument();

    await user.click(decrement);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });

  test('does not go below zero', async () => {
    render(<Counter initialValue={0} min={0} />);
    const user = userEvent.setup();
    const decrement = screen.getByRole('button', { name: /decrement/i });

    await user.click(decrement);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });
});
