import transformTB from '../experiments/tb'
import tb from '../telemetryData/tb.json'
import ctc from '../fixtures/ctc.json'

export const parsedTB = transformTB(tb);
const streams = [{
    id: "stream1",
    value: parsedTB,
    "type": 'stream',
    "label": "myTBteststream",
    "workflowInstance?": "Observable"

}, {
    id: "stream2",
    value: [{ cov: 95, var: 123 }, { cov: 93, var: 22 }],
    "type": 'stream',
    "label": "myTBteststream",
}, {
    id: 'ctc',
    value: ctc.data,
    "type": 'stream',
    "label": "myTBteststream",
}
]



const initTransform = {
    dataRef: "lolololol",
    dataIn: [{ a: 12, b: "xx" }], //? every pipe has one input...let's not reuse pipes
    //? identity pipe is set on stream instantiation
    "id": "transform2",
    "label": "BRBUR",
    // computeAt: 'backend1, amz1',
    value: [{ c: 123, d: "xx" }], //or has to be computed frontend first....
    mappings: [{
        "fn": "aggregate",
        "params": ['barcode', 'coverage']
    },
    ]
}

export { streams, initTransform }


export default ([
    {
        reportId: "report_local",
        __typename: "Component",
        //? set on instantiation //no change unless deleted
        dataRef: '*transform2',
        dataIn: [],
        id: "c123",
        "content": "bar",
        label: "idorname",
        value: 5, //fromInteractive is now implicit, label on component
        params: { //data param is implicitly passed on from transform.value
            //? set by ParamSetter
            height: 300,
            width: 500,
            keys: [
                'aggregation'
            ],
            indexBy: "barcode",
            position: [3, 2],
        },
    },
    {
        reportId: "report_local",
        __typename: "Transform",
        dataRef: "*stream1",
        dataIn: [{ a: 12, b: "xx" }], //? every pipe has one input...let's not reuse pipes
        //? identity pipe is set on stream instantiation
        "id": "transform2",
        "label": "BRBUR",
        // computeAt: 'backend1, amz1',
        value: [{ c: 123, d: "xx" }], //or has to be computed frontend first....
        mappings: [{
            "fn": "aggregate",
            "params": ['barcode', 'coverage']
        },
        ]
    },
])