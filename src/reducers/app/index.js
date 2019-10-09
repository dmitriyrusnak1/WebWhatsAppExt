import { combineReducers } from 'redux';
import * as c from './constants';

const initialState = {
    count: 0,
};


const count = (state = initialState.count, action) => {
    switch (action.type) {
        case c.ADD_COUNT:
            return state=state+1;
        default:
            return state;
    }
};


export default combineReducers({
    count,
});