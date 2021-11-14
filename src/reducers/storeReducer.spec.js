import storeReducer, { getData, getValuePipe } from './storeReducer'
import init from '../initDefaults'
import update from 'immutability-helper'
// const { streams, report: reportInit } = inits;

// let idToValueDict = mapIdToValue([...init.streams, ...init.report])
describe('1 is 1', () => {
    it('1 =1', () => expect(1).toBe(1))
})

/*
describe('idTovaluemap', () => {
    // it('maps Ids to Values', () => expect(mapIdToValue([{ id: "abc", value: 5 }, { id: "cde", value: 10 }])).toEqual({ abc: 5, cde: 10 }))
    // it('wrap special getter param', () => expect(futurizeParam('$coverage')({ coverage: 10 })).toEqual(10))
})

describe('getData', () => {
    // it('gets data by id', () => expect(signMap["*"]("transform1")(idToValueDict)).toEqual([{ c: 123, d: "xx" }]))
    it('gets value for *special string', () => expect(getData("*transform1")).toEqual([{ c: 123, d: "xx" }]))
    it('gets value for *special string', () => expect(getData("*c123")).toEqual(5))

    // it('wrap special getter param', () => expect(futurizeParam('$coverage')({ coverage: 10 })).toEqual(10))
})


describe('gets value for mappings with dataIn', () => {
    it('calculates pipe output', () => expect(getValuePipe(report[0].mappings)(streams[0].value)).toEqual([{ "a": 55, "b": 22 }]));
    it('returns input when no mappings', () => expect(getValuePipe(null)(55)).toEqual(55))
    // it('returns input when no mappings', () => expect(getValuePipe(null)()).toEqual(null))

})

describe('store reducer', () => {
    it('updates path correctly', () => {
        const x = storeReducer(init.report, { id: "c123", value: 10, route: 'value' })
        console.log(x.findIndex(node => node.id == "c123"))
        return expect(x[1].value).toEqual(10)
    })

}) */