import React from 'react';

export default function Slider({ value, onUpdate }) {
    return <div><input id="typeinp" type="range" min="0" max="100" value={value}
        onChange={ev => onUpdate(parseInt(ev.target.value))} step="1" />value: {value}</div>
};
