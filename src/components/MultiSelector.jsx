import React, { useState } from 'react';
import Select from 'react-select';
export default function MultiSelector({ options, onUpdate }) {
    const [selected, setSelected] = useState('');
    const wLabel = options.map(option => ({ label: option, value: option }));
    return <Select isMulti value={selected} onChange={e => { onUpdate(e.map(f => f.value)); setSelected(e); }} options={wLabel} />;
};
