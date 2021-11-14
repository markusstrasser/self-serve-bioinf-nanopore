import { getExternal } from './getRequests'
import { parsedTB } from '../fixtures/simpleInit'

describe('it should fetch data', () => {
    it('should match initConfig', async () => {

        const data = await getExternal('stream1')
        expect(data.value).toEqual(parsedTB)
    })


})
