import { combineReducers } from 'redux';
import * as c from './constants';
import { QUICK_REPLIES, COLOR_LABELS } from '../../../content-scripts/constants';

const initialState = {
    quickReplies: QUICK_REPLIES,
    colorFilters: COLOR_LABELS
};


const quickReplies = (state = initialState.quickReplies, action) => {
    switch (action.type) {
        case c.DELETE_REPLY:
            const newQuickReplies = state.filter(item => item.id !== action.id);
            return newQuickReplies;
        case c.CHANGE_REPLY:
            const newReplies = state.map(
                item =>
                    item.id === action.id ?
                    {...item, text: action.text}: item
            )
            return [...newReplies];
        case c.ADD_NEW_REPLY:
            const newId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
            const newItem = {};
            newItem.id = newId;
            newItem.text = action.text;
            return [...state, newItem];
        default:
            return state;
    }
};

const colorFilters = (state = initialState.colorFilters, action) => {
    switch (action.type) {

        default:
            return state;
    }
};


export default combineReducers({
    quickReplies,
    colorFilters
});