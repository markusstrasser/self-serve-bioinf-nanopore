import getType from './experiments/getType';
import applySpec from './applySpec'

const testSpec = {
    input: [0, "a", 22, {}, [], [2, 3], [2, "a"], ["a", "ad"], [[22], [33, 44]]],
    transform: getType,
    output: ['number', 'string', 'number', 'object', 'array', 'array of number', 'array of number', 'array of string', 'array of array']

}


describe('utils', () => {
    it('gets correct Type', () => applySpec(testSpec));
})
