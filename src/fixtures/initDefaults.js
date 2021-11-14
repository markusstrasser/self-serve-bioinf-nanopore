import transformTB from '../experiments/tb'
import tb from '../telemetryData/tb.json'

const parsedTB = transformTB(tb);

export const initMap = {
    fn: 'ident',
    params: ["a", "b"]
}
export default {
    streams: [{
        "id": "stream1",
        "type": 'stream',
        "label": "myTBteststream",
        value: parsedTB,
        "workflowInstance?": "Observable"
    }],
    report: [
        {
            reportId: "report_local",
            type: 'transform',
            __typename: "Transform",
            dataRef: "*stream1",
            dataIn: [{ a: 12, b: "xx" }], //? every pipe has one input...let's not reuse pipes
            //? identity pipe is set on stream instantiation
            id: "transform1",
            "label": "BRBUR",
            // computeAt: 'backend1, amz1',
            value: [{ c: 123, d: "xx" }], //or has to be computed frontend first....
            mappings: [
                //? set from QueryDialog instantiation
                // { fn: 'identity', params: {} }
                //fn: 'filter', params: {fn: 'isEq', params: }
                {
                    "fn": "filter",
                    "params": {
                        "fn": "isEq",
                        "params": [
                            "$coverage",
                            "*slider1"
                        ]
                    }
                },
            ]
        },

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
            __typename: "Component",
            //? set on instantiation //no change unless deleted
            // dataIn: [{}],
            hasNoInputs: true,
            dataRef: "yolo",
            id: "slider1",
            "content": "slider",
            label: "idorname",
            value: 29, //fromInteractive is now implicit, label on component
            params: { //data param is implicitly passed on from transform.value
                a: 5
                //? set by ParamSetter

            },
            position: [3, 2],
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

    ],

    mapping: {
        fn: "",
        params: []
    },
    transform: {
        reportId: "report_local",
        type: 'transform',
        __typename: "Transform",
        dataRef: "*stream1",
        dataIn: [{ a: 12, b: "xx" }], //? every pipe has one input...let's not reuse pipes
        //? identity pipe is set on stream instantiation
        // computeAt: 'backend1, amz1',
        value: [{ c: 123, d: "xx" }], //or has to be computed frontend first....
        mappings: [
            //? set from QueryDialog instantiation
            // { fn: 'identity', params: {} }
            initMap
        ]
    },
    select: {
        content: 'select',

        dataIn: [],
        // label: "selector12",
        value: 33, //fromInteractive is now implicit, label on component
        params: { //data param is implicitly passed on from transform.value
            bb: 5,
            options: ['c', 'd'],
        },

    },
    histogram: {}
}