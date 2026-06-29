import React, { useState } from 'react';
import Input from './Input.jsx';
import Counter from './Counter.jsx';

export default function Form({ onSubmit }) {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.({ text, count });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Name" value={text} onChange={(e) => setText(e.target.value)} />
      <Counter initialValue={count} onChange={setCount} />
      <button type="submit">Submit</button>
    </form>
  );
}
