import { futurize, mergeLeftAll, findFirstWithProp, parseStaticKlass, normalizeKlass, getFunc } from './funcSpecs';
import { map, filter } from 'ramda'
import applySpec from '../applySpec';


//TODO: There must be a pattern of .cond or .when here...
//TODO can't figure it out yet tho ... moving on
const getX = a => a.x;
const get5 = () => 5;
const get12 = () => 12;

const isEq = (a, b) => a == b;
const futureValue = {
    x: 12,
    b: "cool"
}

const fIsEq = futurize(isEq);
const futurizeSpec = {
    input: [fIsEq([getX, get5]), fIsEq([getX, get12])],
    transform: f => f(futureValue),
    output: [false, true]
}
const mockCollection = [{ a: 5 }, { b: 4 }, { c: 3 }]

describe('mergeLeftAll', () => {
    it('merges 2+ objects', () => expect(mergeLeftAll(mockCollection)).toEqual({ a: 5, b: 4, c: 3 }))

    it(' keeps properties of left-most mergee', () => expect(mergeLeftAll([...mockCollection, { a: 77 }])).toEqual(({ a: 5, b: 4, c: 3 })))
})

describe('futurize makes getters evaluate when futureData is present', () => {
    it('wraps getters', () => applySpec(futurizeSpec))
})

const findFirstMocks = {
    one: {
        map,
        filter
    }, two: {
        yolo: 'yodl',
        jb: 'jamesbrown'
    },
    three: {
        yolo: 'secondyodl',
        swag: 'swagg'
    }
}
describe('getFunc differentiates correctly between prototype and other functions', () => {
    it('finds map function ', () => expect(getFunc('map')).toEqual(map))
    // it('finds map function ', () => expect(getFunc('map')).toEqual(map))
})

describe('normalizeKlass', () => {
    it('converts a Native JS class to normal methods with call ', () => expect(normalizeKlass(Array).slice([0, 1, 2, 3], 1)).toEqual([1, 2, 3]))
    // it('converts a Native JS class to normal methods with call ', () => expect((Math).abs(5)).toEqual(5))
    // it('converts a Native JS class to normal methods with call ', () => expect(normalizeKlass(Object).keys({ a: 5, b: 3 })).toEqual(['a', 'b']))

    // it('finds map function ', () => expect(getFunc('map')).toEqual(map))
})



describe('findFirstWithProp', () => {
    const { one, two, three } = findFirstMocks
    const findInFirstTwo = findFirstWithProp([one, two]);
    const findInSecondTwo = findFirstWithProp([two, three])
    const findInAll = findFirstWithProp([one, two, three])

    it('finds map in mock1', () => expect(findInFirstTwo('map')).toEqual(one))

    it('testing the return map', () => expect(
        findInFirstTwo('map')['map'] //because it returns the object...
            (x => x * 2, [4])
    ).toEqual([8]))

    it('finds yolo in mock2', () => expect(findInFirstTwo('yolo')).toEqual(two))

    it('finds yolo in mock2', () => expect(findInSecondTwo('swag')).toEqual(three))

    it('finds yolo in mock2 before mock3', () => expect(findInAll('yolo')).toEqual(two))
})