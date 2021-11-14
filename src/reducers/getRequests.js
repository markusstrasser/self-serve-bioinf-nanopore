import { streams } from '../fixtures/simpleInit'
import init from '../fixtures/initDefaults'

const env = 'dev'
const getExternal = (url) =>
    env == 'dev' ? localGet(url) : "some getter"

//real 
// const epi2meGet = (workflowID) => axios.get(workflowID).then(resp => resp.data)
//!attention ... switching between simple and other fixtures
const localGet = id => {
    return streams.find(s => s.id == id) || { notFound: [] };
}

export { getExternal }