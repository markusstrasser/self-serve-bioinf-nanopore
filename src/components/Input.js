import React from 'react';
export const Input = ({ value, onUpdate }) => <input type='value' defaultValue={value} onChange={({ target }) => onUpdate(target.value)} />;
