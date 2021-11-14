import React from 'react';
import { getFunc } from './funcSpecs'
export const signMap = {
    //! this currently runs for every entry in TB...should be changed @ futurize ...to only run getters instead of UI pointers
    // "*": id => (dict = idToValueDict) => dict[id] || {}, //TODO implement store.getter
    "$": id => object => id == 'self' ? object : object[id],
}

const isString = ({ substr }) => !!substr
export const isSpecial = param => isString(param) && Object.keys(signMap).some(sign => param.includes(sign))
export const futurizeParam = (param) => isSpecial(param) ? signMap[param[0]](param.slice(1)) : () => param

const isLeafNode = node => Array.isArray(node)

export default function resolve({ fn, params: paramNode }) {
    return getFunc(fn)
        (
            isLeafNode(paramNode)
                ? paramNode.map(param => futurizeParam(param))
                : resolve(paramNode) //params then is node
        )
}

export function X() { return <div></div> }
