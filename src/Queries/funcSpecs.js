import DataFrame from 'dataframe-js';
import { keys, head, identity, filter, mapObjIndexed, map } from 'ramda'
import empty from 'is-empty'


//TODO maybe this lazy pattern can be generalized or is in a util lib (fluture or futurize or task??)
export const findFirstWithProp = objs => prop => objs.find(object => object[prop])

export const futurize = func => getters => futureValue => func(...getters.map(get => get(futureValue)))

window.DF = DataFrame;
const eager = {
    identity,
    isEq: (a, b) => a == b,
    isNotEq: (a, b) => a != b,
    ">": (a, b) => a > b,
    "==": (a, b) => a == b,
    "<": (a, b) => a < b,
    "+": (a, b) => a + b,
}
const getLength = obj => obj.length || 0
const futurized = {
    map,
    filter,
    // keys,
    head: (a, b) => data => head(data),
    is: ([a, _]) => data => data == a(),
    length: () => data => getLength(data),
    columns: () => df => keys(head(df)),
    ident: () => df => df,
    aggregate: ([group, aggColumn]) => df => {

        const [g, col] = [group, aggColumn].map(f => f())

        const isCollection = df => Array.isArray(df) && !empty(df[0])
        return isCollection(df) ? new DataFrame(df, Object.keys(df[0]))
            .groupBy(g)
            .aggregate(gr => gr.stat['mean'](col))
            .toCollection()
            : [{}]
    }
    // isEq: futurize((a, b) => a == b),
    //! for aggregation, you always groupBy first. GroupedDataFrame
}


//? for simplicity I didn't add jsFuncDictNorm here
const customFuncs = { ...mapObjIndexed(futurize, eager), ...futurized }
export const getFunc = funcName => customFuncs[funcName]
