import React, { useState } from 'react'
import { JsonEditor } from 'react-json-edit';


export const PropEdit = ({ prevParam, children, onParamSave }) => {
  const [params, setParams] = useState(prevParam)
  //! value == startValue ... not updating later
  return <div>
    {prevParam && <JsonEditor value={params} propagateChanges={setParams} />}
    <button style={{ color: "white", background: "orange" }} onClick={() => onParamSave(params)}>SET PARAMS</button>
  </div>
}
{/* {children(params)} */ }
//TODO transformers for props than don't take entire DataFrames (custom hist)
//! for now Nivo takes mostly Collections / DFs... so one less thing to worry about
//TODO actually ... just let people write the config in JSON...
