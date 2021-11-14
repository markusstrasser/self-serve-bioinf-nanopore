

// ! I parked this here for now. It isn't necessary for the prototype and I think now that you should
//!  just handcode the few transforms you want instead of automatically ingesting a library or JS native */
import { map, pipe, mergeLeft, mapObjIndexed } from 'ramda';
import { reduce } from 'lodash';
// function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
const JSclasses = [Array, String, Number];
export const parseCallSpecialCase = func => func.call ? (...args) => func.call(...args) : func;
export const parseStaticClass = klass => Object.getOwnPropertyNames(klass)
    .reduce((p, c) => Object.assign(p, { [c]: klass[c] }), {});
export const normalizeKlass = pipe(klass => klass.prototype || klass, parseStaticClass,
    // .filter(([key, value]) => (!isNumber(key) && typeof value == 'function' && !key.startsWith("__"))) 
    mapObjIndexed(parseCallSpecialCase)
    // entries => entries.reduce((acc, value) => ({ ...acc, [value[0]]: value[1] }))
);
window.norm = normalizeKlass;
export const mergeLeftAll = collection => reduce /** lodash.reduce != ramda.reduce*/(collection, (prev, next) => mergeLeft(prev, next), {});
export const jsFuncDictNorm = {
    ...mergeLeftAll(map(normalizeKlass, JSclasses))
};
