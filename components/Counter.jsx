import React, { useEffect, useState } from 'react';

export default function Counter({
  initialValue = 0,
  min = 0,
  step = 1,
  onChange,
}) {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    onChange?.(count);
  }, [count, onChange]);

  const handleIncrement = () => {
    setCount((current) => current + step);
  };

  const handleDecrement = () => {
    setCount((current) => Math.max(min, current - step));
  };

  return (
    <div>
      <div aria-label="counter-value">Count: {count}</div>

      <button type="button" onClick={handleIncrement}>
        Increment
      </button>

      <button type="button" onClick={handleDecrement}>
        Decrement
      </button>
    </div>
  );
}