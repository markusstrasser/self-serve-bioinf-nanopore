import React, { useState, createContext } from 'react';

export const EditModeContext = createContext(true)
export default function Editor({ mode, children }) {
    const [edit, toggleEdit] = useState(true); //edit, view
    //useContext so propEdit can get the mode
    const isEditMode = mode != 'view';
    return <div style={{ display: "flex", justifyContent: "center" }}>
        <input type="checkbox" id="mode" name="mode" checked={edit} onClick={() => toggleEdit(!edit)} />
        <label for="mode">Edit</label>
        <EditModeContext.Provider value={edit}>
            {children}
        </EditModeContext.Provider>

    </div>;
};
