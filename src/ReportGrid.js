import React, { useContext } from 'react';
import { partition } from 'ramda';
import uuidv4 from 'uuid/v4';
import TransformEdit from './components/TransformEdit';
import init from './fixtures/initDefaults';
import Component from './components/Component';
import InputDataRef from './components/InputDataRef';
import { EditModeContext } from './Editor';
import { ConfigContext } from './components/Fetcher';

const addTransform = dispatcher => {
    const id = uuidv4().slice(0, 4);
    return dispatcher({ id, value: { ...init.transform, id } });
};
const addComponent = dispatcher => {
    const id = uuidv4().slice(0, 4);
    return dispatcher({ id, value: { ...init.select, id } });
};
export default function ReportGrid() {
    const { config, dispatch } = useContext(ConfigContext);
    const isEditMode = useContext(EditModeContext);
    const [transforms, components] = partition(obj => !!obj.mappings, config.filter(({ type }) => type != 'stream'));
    return <div>
        {isEditMode &&
            <div>

                {transforms.map(transform => <React.Fragment>
                    <InputDataRef value={transform.dataRef} update={value => dispatch({ id: transform.id, value, route: 'dataRef' })} />
                    <TransformEdit transform={transform} dispatch={dispatch} />
                </React.Fragment>)}
                <button onClick={() => addTransform(dispatch)}>Add Transform</button>
            </div>}
        {components.map(component => <React.Fragment>
            <Component dispatch={dispatch} component={component} />
            {isEditMode &&
                <InputDataRef value={component.dataRef} update={value => dispatch({ id: component.id, value, route: 'dataRef' })} />}
        </React.Fragment>)}
        {isEditMode && <button onClick={() => addComponent(dispatch)}>Add Component</button>}
    </div>;
};
