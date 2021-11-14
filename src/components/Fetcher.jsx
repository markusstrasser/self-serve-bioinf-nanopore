import React, { useMemo, useState, createContext, useReducer } from 'react'
import { unionWith, eqProps, tail } from 'ramda'
import { getExternal } from "../reducers/getRequests";
import storeReducer from '../reducers/storeReducer'

const mergeStreamsFromIds = async (currentStreams, ids) => unionWith(
    eqProps("id"),
    await getAllValues(ids),
    currentStreams
)

const isExternalSource = id => id.includes('stream') || id.includes('ctc') //isUrl //hasType //isNotTransform or Component//
const getAllValues = pointers => Promise.all(pointers.map(e => getExternal(e)))
const ConfigContext = createContext([{}])
export { ConfigContext }
export default function Fetcher({ reportConfig, children }) {
    const [streams, setStreams] = useState([])
    const [state, dispatch] = useReducer(storeReducer, [...streams, ...reportConfig])
    const pointers = reportConfig.map(node => node.dataRef).filter(isExternalSource).map(tail)

    const fetchStreams = async (streamNodes, ids) => {
        const mergedStreams = await mergeStreamsFromIds(streamNodes, ids)
        // console.log(mergedStreams, 'merged')
        setStreams(mergedStreams)
        mergedStreams.forEach(e => dispatch({ id: e.id, value: e }))
    }
    useMemo(() => {
        fetchStreams(streams, pointers)
    }, ["hallo"])
    // console.log('state', state)
    return (
        <ConfigContext.Provider value={{ config: state, dispatch }} >
            {React.cloneElement(children)}
        </ConfigContext.Provider>

    )
}