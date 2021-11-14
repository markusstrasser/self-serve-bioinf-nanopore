import React from 'react';
import ReactDOM from 'react-dom';
import { slice, intersection, mapObjIndexed, pipe, head, zipObj } from 'ramda'
import { a, b, c, d, e, f } from './types.module.css'
import transformTB from './tb'
import mockDataTB from './telemetryData/tb.json'
import { getType } from '../utils'
const parsedTB = transformTB(mockDataTB)



const styles = [a, b, c, d, e, f]
const allTypes = [5, "test", {}, [1, 2, 3], ["a", "b"], [{ a: 5 }]].map(getType)
/**["number", "string", "object", "array of number", "array of string", "array of object"] */

const typeToStyle = zipObj(allTypes, styles)

export { parsedTB }
export default function Variables({ label = 'TB', stream = parsedTB, store }) {
    const first = head(stream)
    const tbTypeDict = mapObjIndexed((value, key) => getType(value), first);
    return <div className={'card'}>
        <h1>{label} </h1>
        {Object.entries(tbTypeDict).map(([prop, type]) => <div className={typeToStyle[type]}><b> {prop} :: {first[prop]} </b></div>)}
    </div>
}