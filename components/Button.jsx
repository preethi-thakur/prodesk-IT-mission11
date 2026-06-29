import React from 'react';

export default function Button({ label, onClick, type = 'button', ...props }) {
  return (
    <button type={type} onClick={onClick} {...props}>
      {label}
    </button>
  );
}
