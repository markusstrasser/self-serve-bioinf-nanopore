import React, { useState } from 'react';
import { Input } from "./Input";
export default function InputDataRef({ value, update }) {
    const [dataRef, setDataRef] = useState(value);
    return <React.Fragment>
        <Input value={dataRef} onUpdate={setDataRef} />
        <button onClick={() => update(dataRef)}>Data Target</button>
    </React.Fragment>;
};
