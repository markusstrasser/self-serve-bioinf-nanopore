import React, { createContext, useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import storeReducer from './reducers/storeReducer'
import init from './fixtures/initDefaults';
import { defineCustomElements as defineHeadlineValue } from 'epi2me-ui-headline/dist/loader'
import { defineCustomElements as defineCheckMark } from 'epi2me-ui-checkmark/loader'

import Editor from './Editor'
import Fetcher from './components/Fetcher'
import ReportGrid from './ReportGrid';
import ctcConfig from './fixtures/ctcConfig'

ReactDOM.render(
    <Editor>
        <Fetcher reportConfig={ctcConfig}>
            <ReportGrid />
        </Fetcher>
    </Editor>
    ,
    document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
defineHeadlineValue(window)
defineCheckMark(window)