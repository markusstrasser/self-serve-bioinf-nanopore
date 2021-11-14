import React from 'react';
import { reverseQueryParse } from '../utils';
import QueryDialog from '../Queries/QueryDialog'
import { remove, update as ramdaUpdate } from 'ramda'
import { initMap } from '../fixtures/initDefaults'

export default function TransformEdit({ transform, dispatch }) {
    const { id, mappings } = transform;
    return <div className={`transform_${id}`} style={{ display: 'flex', border: '1px solid orange' }}>
        <div data-testid={`transform`}> Transform:: {id}</div>
        {
            mappings.map(
                (mapping, mapIndex) =>
                    <QueryDialog key={mapIndex + "fuck off react"} query={reverseQueryParse(mapping)}
                        deleteYourself={() => dispatch({
                            id,
                            value: remove(mapIndex, 1, mappings),
                            route: 'mappings'
                        }
                        )}
                        update={value => dispatch({
                            id,
                            value: ramdaUpdate(mapIndex, value, mappings),
                            route: 'mappings'
                        })} />
            )
        }
        <button onClick={() => dispatch({
            id,
            value: [...mappings, initMap],
            route: 'mappings'
        })}>add Mapping</button>
        <br />
        <br />
    </div>
}