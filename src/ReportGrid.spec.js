import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
} from '@testing-library/react'
// this adds custom jest matchers from jest-dom
import ReportGrid from './ReportGrid';
import React from 'react';
import Fetcher from './components/Fetcher'

import { initTransform } from './fixtures/simpleInit'



describe('fetches external datasource values and passes to children', () => {

    it('add Transform button adds TransformEdit with init', () => {

        const { container, getByTestId, getByText, getAllByTestId } = render(<Fetcher reportConfig={[initTransform]}>
            <ReportGrid />
        </Fetcher>)
        const transformDivsLength = getAllByTestId("transform")
        console.log(transformDivsLength, typeof transformDivsLength)
        expect(transformDivsLength).toHaveLength(1)


        fireEvent.click(getByText(/Add Transform/i))

        const tfdivLen = getAllByTestId("transform")
        expect(tfdivLen).toHaveLength(2)



    })
})
