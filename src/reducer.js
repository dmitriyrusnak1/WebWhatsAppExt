import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import {
    app
} from './reducers';

export default function createReducer() {
    const mainReducers = combineReducers({
        app
    });

    return reduceReducers(mainReducers);
}