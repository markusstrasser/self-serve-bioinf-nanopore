import React from 'react';
import { shallow, mount } from 'enzyme';
import Fetcher from './Fetcher'
import init from '../fixtures/simpleInit'
import ctcConfig from '../fixtures/ctcConfig'
import ctcOutput from '../fixtures/ctc_output'


import { ConfigContext } from './Fetcher'
// this adds custom jest matchers from jest-dom


const SomeChild = () => <div>HELLO</div>

describe('fetches external datasource values and passes to children', () => {

    it('children are rendered', () => {
        const wrapper = mount(<Fetcher reportConfig={init}><SomeChild /></Fetcher>)
        expect(wrapper.children().length).toBe(1);
    })


    const waitSec = sec => new Promise((res, rej) =>
        setTimeout(() => res("enzyme sucks 🍆", sec)))

    it('changes store after getting stream data', async () => {
        const wrapper = shallow(<Fetcher reportConfig={ctcConfig}><SomeChild /></Fetcher>)
        //access childs config
        // => get config initial
        expect(wrapper.find(ConfigContext.Provider).props().value.config).toEqual(ctcConfig)

        await new Promise(setImmediate)
        wrapper.update()
        expect(wrapper.find(ConfigContext.Provider).props().value.config).toEqual(ctcOutput)
        //wait X
        //on Fetcher rerender
        //check newconfig is not config old or matches with fixture
    })




    it('passes config to Provider', () => {
        const wrapper = shallow(<Fetcher reportConfig={init}><SomeChild /></Fetcher>)
        expect(wrapper.find(ConfigContext.Provider).props().value).toEqual(expect.objectContaining({
            config: expect.any(Array),
            dispatch: expect.any(Function),
        }));
    })

})