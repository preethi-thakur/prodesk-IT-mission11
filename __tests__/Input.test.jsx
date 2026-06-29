import React, { useState } from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../components/Input.jsx';

describe('Input component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders without crashing and updates on typing', async () => {
    render(<Input label="Email" />);
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: /email/i });

    await user.type(input, 'test@example.com');
    expect(input).toHaveValue('test@example.com');
  });

  test('controlled input value and onChange behavior', async () => {
    function ControlledInput() {
      const [value, setValue] = useState('');
      return (
        <Input
          label="Name"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }

    render(<ControlledInput />);
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: /name/i });

    await user.type(input, 'Alice');
    expect(input).toHaveValue('Alice');
  });

  test('submits form with current input value', async () => {
    const handleSubmit = jest.fn();

    function SubmitForm() {
      const [value, setValue] = useState('');
      return (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(value);
          }}
        >
          <Input
            label="Username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }

    render(<SubmitForm />);
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: /username/i });
    const button = screen.getByRole('button', { name: /submit/i });

    await user.type(input, 'hello');
    await user.click(button);

    expect(handleSubmit).toHaveBeenCalledWith('hello');
  });
});
