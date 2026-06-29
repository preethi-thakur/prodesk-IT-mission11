import React from 'react';

export default function Input({ label, value, onChange, placeholder = 'Enter text', ...props }) {
  return (
    <label>
      {label}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={label || 'input-field'}
        {...props}
      />
    </label>
  );
}
