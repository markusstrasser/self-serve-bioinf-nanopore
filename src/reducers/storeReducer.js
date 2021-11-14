import { pipe, tail, assocPath, curry } from 'ramda'
import resolve from '../Queries/resolve'
import update from 'immutability-helper'
import { Just, Nothing } from 'folktale/maybe'
export const mapIdToValue = collection => collection.reduce((dict, { id, value }) => ({ ...dict, [id]: value }), {})

export default (state, { id, value, route = null }) => {
    // console.log(state, "id", id, "val", value, route)
    //! sort because the resolving has to be transforms first
    // const state = st.sort((a, b) => a.mappings && !b.mappings ? -1 : 1)
    //? adds element as last one if it doens't exist already
    const idx = state.findIndex(node => node.id == id)
    const atIndex = idx == (-1) ? state.length : idx
    const path = [atIndex, route].filter(e => e == 0 || e);
    const updateSpec = assocPath(
        path,
        { $set: value },
        {}
    );
    const store = update(
        state,
        updateSpec
    )
    const keyMap = mapIdToValue(store);
    const keyGetter = getData(keyMap)
    // console.log(store, 'streee')

    const store2 = store
        .map(n => updateDataIn(keyGetter, n))
        .map(n => transformCalc(keyGetter, n))
    // console.log(store2, 'store2')

    const keyMap2 = mapIdToValue(store2);

    const keyGetter2 = getData(keyMap2);
    const store3 = store2.map(n => updateDataIn(keyGetter2, n))
    // console.log(store3, 'store3')
    window.store = store3;
    return store3;
}

const updateDataIn = curry((keyGetter, node) => ({ ...node, dataIn: keyGetter(node.dataRef) }))
const transformCalc = curry((getter, node) => node.mappings ? calcOutputValues(getter, node) : node)

const calcOutputValues = curry((keyGetter, transform) => ({
    ...transform,
    value: pipe(
        ...transform.mappings
            .map(mapping => resolveRefs(keyGetter, mapping))
            .map(resolve)
    )(transform.dataIn)
}))


export const getData = curry((keyMap, dataRef) => Either(dataRef)
    .map(tail)
    .fold(
        x => x, //if left
        str => keyMap[str] || dataRef
    ))
export const resolveRefs = curry((getter, { fn, params }) => ({
    fn,
    params: Array.isArray(params)
        ? params.map(getter)
        : resolveRefs(getter, params)
})
)

const Either = value => value ? Just(value) : Nothing(value);
window.Either = Either;