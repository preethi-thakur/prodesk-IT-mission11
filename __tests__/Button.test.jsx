import React, { useState } from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../components/Button.jsx';

describe('Button component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders without crashing', () => {
    render(<Button label="Click me" onClick={jest.fn()} />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('calls onClick and updates when local state changes', async () => {
    function StatefulButton() {
      const [count, setCount] = useState(0);
      return (
        <div>
          <Button
            label={`Clicked ${count}`}
            onClick={() => setCount((prevCount) => prevCount + 1)}
          />
        </div>
      );
    }

    render(<StatefulButton />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /clicked 0/i });

    await user.click(button);
    expect(screen.getByRole('button', { name: /clicked 1/i })).toBeInTheDocument();
  });
});
