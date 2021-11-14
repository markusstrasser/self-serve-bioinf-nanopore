import React from 'react';
import { shallow, mount, render } from 'enzyme';
// import '../setupTests'
import sinon from 'sinon';
import simpleInit from '../fixtures/simpleInit'

import TransformEdit from './TransformEdit'

describe('TransformEdit', () => {

    let mountedTF;
    const TFmounter = () => {
        if (!mountedTF) {
            mountedTF = mount(<TransformEdit transform={simpleInit[1]} />)
        }
    }
    it('renders a form with 2+ input fields', () => {
        expect(mountedTF.find('input').length).toBe(4)

    })
    it('renders a button with submit type', () => {
        expect(mountedTF.find('button[type="submit"]').length).toBe(1)

    })
    it('renders correct label', () => {
        expect(mountedTF.find('button[type="submit"]').length).toBe(1)

    })

    beforeEach(() => {

        mountedTF = null;
        TFmounter()
    })

})