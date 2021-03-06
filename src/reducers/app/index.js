import { combineReducers } from 'redux';
import * as c from './constants';


const initialState = {
    quickReplies: [],
    colorFilters: [],
    selectedUser: {},
    userNotes: {},
    usersConnectedLabels: {}
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
            const newItem = {};
            newItem.id = action.newId;
            newItem.text = action.text;
            return [...state, newItem];
        case c.ADD_NEW_REPLY_MEDIA_QUERY:
            const newItemMQ = {};
            newItemMQ.id = action.newId;
            newItemMQ.text = action.text;
            newItemMQ.fileName = action.fileName;
            newItemMQ.fileSize = action.fileSize;
            newItemMQ.fileType = action.fileType;
            newItemMQ.fileLastModified = action.fileLastModified;
            return [...state, newItemMQ];
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
            const rawState = [...state];
            let flag = false;

            const newState = rawState.map(item => {
                if(item.label === action.label) {
                    item.color = action.color;
                    flag = true; 
                }
                return item;
            });
            if(!flag) {
                const value = {
                    id: action.newId,
                    color: action.color,
                    label: action.label,
                };
                newState.push(value);
            }

            return [...newState];
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

const usersConnectedLabels = (state = initialState.usersConnectedLabels, action) => {
    switch (action.type) {
        case c.GET_DEFAULT_USERS_CONNECTED_LABELS:
            const data = action.defaultState;
            return {...data};
        case c.ADD_NEW_LABEL:
        case c.ADD_USER_TO_LABEL:
            const rawData = {...state};
            rawData[action.user] = action.label;
            return {...rawData}
        case c.DELETE_LABEL:
            const keys = Object.keys(state);

            const filteredObj = keys.reduce((result, key) => {
                if(state[key] !== action.label) {
                    result[key] = state[key];
                }
                return result;
            }, {});
            return {...filteredObj};
        case c.DELETE_USER_TO_LABEL:
            const keysUser = Object.keys(state);

            const filteredRawData = keysUser.reduce((result, key) => {
                if(key !== action.user) {
                    result[key] = state[key];
                }
                return result;
            }, {});
            return {...filteredRawData};
        case c.CHANGE_LABEL:
            const keysData = Object.keys(state);

            const filteredData = keysData.reduce((result, key) => {
                if(state[key] !== action.oldText) {
                    result[key] = state[key];
                } else {
                    result[key] = action.text;
                }
                return result;
            }, {});
            return {...filteredData}
        default:
            return state;
    }
};


export default combineReducers({
    quickReplies,
    colorFilters,
    selectedUser,
    userNotes,
    usersConnectedLabels
});