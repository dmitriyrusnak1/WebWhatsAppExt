import { combineReducers } from 'redux';
import * as c from './constants';


const initialState = {
    quickReplies: [],
    colorFilters: [],
    selectedUser: {},
    userNotes: {}
};


const quickReplies = (state = initialState.quickReplies, action) => {
    switch (action.type) {
        case c.GET_DEFAULT_REPLIES_STATE:
            return [...action.defaultState];
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
        case c.GET_DEFAULT_USERS_LABEL:
            return [...action.defaultState];
        case c.DELETE_LABEL:
            const newColorFilters = state.filter(item => item.id !== action.id);
            return [...newColorFilters];
        case c.CHANGE_LABEL:
            const newLabels = state.map(
                item =>
                    item.id === action.id ?
                    {...item, label: action.text}: item
            )
            return [...newLabels];
        case c.ADD_NEW_LABEL:
            const newId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
            const newItem = {};
            newItem.id = newId;
            newItem.color = action.color;
            newItem.label = action.label;
            newItem.user = action.user;
            return [...state, newItem];
        default:
            return state;
    }
};

const selectedUser = (state = initialState.selectedUser, action) => {
    switch (action.type) {
        case c.GET_DEFAULT_SELECTED_USER:
            return {};
        case c.SELECT_USER:
            const newUser = {};
            newUser.name = action.name;
            newUser.image = action.image;
            return {...newUser};
        default:
            return state;
    }
};

const userNotes = (state = initialState.userNotes, action) => {
    switch (action.type) {
        case c.GET_DEFAULT_USERS_NOTE:
            const data = action.defaultState;
            return {...data};
        case c.ADD_USER_NOTES:
            const newState = {...state};
            newState[action.user] = action.note;
            return {...newState};
        default:
            return state;
    }
};


export default combineReducers({
    quickReplies,
    colorFilters,
    selectedUser,
    userNotes
});