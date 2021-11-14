
export default ([
    {
        reportId: "report_local",
        __typename: "Component",
        //? set on instantiation //no change unless deleted
        dataRef: '*tf1',
        dataIn: [],
        id: "c123",
        "content": "headerline",
        label: "header",
        value: "james", //fromInteractive is now implicit, label on component
        params: { //data param is implicitly passed on from transform.value
            //? set by ParamSetter
            label: "hello 1",
            value: "niiice"
        },
    },
    {
        __typename: "Component",
        //? set on instantiation //no change unless deleted
        dataRef: '*tf1',
        dataIn: [],
        id: "c123",
        "content": "checkmark",
        label: "header",
        value: "james", //fromInteractive is now implicit, label on component
        params: { //data param is implicitly passed on from transform.value
            //? set by ParamSetter
            message: "hello 1",
            isSuccess: true
        },
    },
    {
        reportId: "report_local",
        __typename: "Transform",
        dataRef: "*ctc",
        dataIn: [{ a: 12, b: "xx" }], //? every pipe has one input...let's not reuse pipes
        //? identity pipe is set on stream instantiation
        "id": "tf1",
        "label": "BRBUR",
        // computeAt: 'backend1, amz1',
        value: [{ c: 123, d: "xx" }], //or has to be computed frontend first....
        mappings: [{
            "fn": "head",
            "params": ['lol', 'jep']
        }, {
            fn: "identity",
            params: ['$key', 'lol']
        },
        {
            "fn": "head",
            "params": ['lol', 'jep']
        },
        {
            fn: "is",
            params: ['Workflow successful', 'b']
        }
        ]
    },
])