import React, { useState, useContext } from 'react';
import { EditModeContext } from "../Editor";
import { ConfigContext } from './Fetcher'

import { map } from 'ramda';
import { PropEdit } from './PropEdit';
import { getData } from '../reducers/storeReducer'
import { mapIdToValue } from '../reducers/storeReducer'
import empty from 'is-empty';

import NumberSelect from './NumberSelect';
import Selectable from './Selectable';
import MyBarChart from './MyBarChart';
import Slider from './Slider';

const Histogram = ({ value, data, threshold }) => <div>Histogram Here {threshold}</div>
const HeaderLine = ({ label, value }) => <epi-headlinevalue label={label} value={value} />
const CheckMark = ({ isSuccess, message }) => <epi-checkmark fail={!isSuccess} message={message} size="200"></epi-checkmark>

export const vizTypeToComponent = {
    hist: Histogram,
    headerline: HeaderLine,
    bar: MyBarChart,
    checkmark: CheckMark,
    slider: Slider,
    integerInput: NumberSelect,
    select: Selectable,
    list: <div>List who takes props and state.value output</div>
}

export default function Component({ component }) {
    const { config, dispatch } = useContext(ConfigContext) || [{}]
    //TODO add mutations and queries
    const { id, params, dataIn: data, label, content, value } = component;
    //check for * param...if not -> return value (identity function)
    const getParams = map(param => getData(mapIdToValue(config))(param));

    const [resolvedParams, setResolvedParams] = useState(getParams(params));
    const isEditMode = useContext(EditModeContext)

    const updateProps = params => dispatch({ id, value: params, route: 'params' })
    const updateComponentOutput = value => dispatch({ id, value, route: 'value' })
    const updateParams = (newParams) => {
        //? update --> maintains relationships like "*othercomponent"
        //? resolve --> actual resolved values -> [* -> 15] 
        updateProps(newParams)
        setResolvedParams(getParams(newParams || {}));
    };
    const { hideIfTrue } = params;
    const Comp = vizTypeToComponent[content];

    return <div className={"component_" + id} style={{ display: hideIfTrue ? 'none' : 'flex', border: '1px solid blue' }}>

        {(!empty(params) && isEditMode) &&
            <div>
                <h3>Set Params {id}</h3>
                <PropEdit prevParam={!empty(params) && params} onParamSave={updateParams} />
            </div>}

        {React.createElement(Comp, { onUpdate: updateComponentOutput, label, value, ...resolvedParams, data })}
    </div>;
};

