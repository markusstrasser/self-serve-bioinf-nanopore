import resolve, { futurizeParam, isSpecial } from './resolve'
import { map, filter } from 'ramda'


//TODO testing for getting interactive UI states with resolve
const TB = [
    {
        coverage: 5,
        genotype: "A",
        wildtype: "C",
    },
    {
        coverage: 15,
        genotype: "G",
        wildtype: "T",
    },
    {
        coverage: 22,
        genotype: "T",
        wildtype: "T",
    }
]

const filterWithStrMethod = {
    fn: 'filter',
    params: {
        fn: 'includes',
        params: [['asda', 'sd'], 'asda']
    }
}
const filterForCov = {
    fn: 'filter',
    params: {
        fn: 'isEq',
        params: ["$coverage", 22]
    }
}

const filterForMutation = {
    fn: 'filter',
    params: {
        fn: 'isNotEq',
        params: ['$genotype', '$wildtype']
    }
}

const concatter = {
    fn: 'concat',
    params: [[1, 2, 3], [4, 5]]
}

const getCoverages = {
    fn: 'map',
    params: {
        fn: 'identity',
        params: ['$coverage']
    }
}
//TODO support this case
const getCoverages2 = {
    fn: 'map',
    params: ['$coverage']
}


describe('thunkification', () => {
    it('simple wrap value thunk', () => expect(futurizeParam(5)()).toEqual(5))
    it('wrap special getter param', () => expect(futurizeParam('$coverage')({ coverage: 10 })).toEqual(10))
})

describe('check for special signs in params', () => {
    it('string has sign inside signMap', () => expect(isSpecial('$coverage')).toBe(true))
    // it('string has sign inside signMap', () => expect(isSpecial('*something')).toBe(true))
    it('string has sign inside signMap', () => expect(isSpecial('something')).toBe(false))
    it('string has sign inside signMap', () => expect(isSpecial(5)).toBe(false))
    it('string has sign inside signMap', () => expect(isSpecial({ "$coverage": 5 })).toBe(false))
})
describe('resolve transforms', () => {
    it('simple filter with non-async data', () => expect(resolve(filterWithStrMethod)(TB)).toEqual(TB))
    it('simple filter with async getter', () => expect(resolve(filterForCov)(TB)).toEqual([{
        coverage: 22,
        genotype: "T",
        wildtype: "T",
    }
    ]))

    it('uses prototype funcs from array', () => expect(resolve(concatter)(TB)).toEqual([1, 2, 3, 4, 5]))
    it('maps from collection to integer array', () => expect(resolve(getCoverages)(TB)).toEqual(map(x => x.coverage, TB)))
    // it('maps from collection to integer array', () => expect(resolve(getCoverages2)(TB)).toEqual(map(x => x.coverage, TB)))
    it('filter comparing two props', () => expect(resolve(filterForMutation)(TB))
        .toEqual(filter(entry => entry.wildtype != entry.genotype, TB)))
})