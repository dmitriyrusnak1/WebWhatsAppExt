import * as c from './constants';


export const deleteReply = (id) => ({
    type: c.DELETE_REPLY,
    id
});

export const changeReply = (id, text) => ({
    type: c.CHANGE_REPLY,
    id,
    text
});

export const addNewReply = (text) => ({
    type: c.ADD_NEW_REPLY,
    text
})

export const deleteLabel = (id, label) => ({
    type: c.DELETE_LABEL,
    id,
    label
});

export const changeLabel = (id, text, oldText) => ({
    type: c.CHANGE_LABEL,
    id,
    text,
    oldText
});

export const addNewLabel = (color, label, user) => ({
    type: c.ADD_NEW_LABEL,
    color,
    label,
    user
});

export const getDefaultQuickReplies = (defaultState) => ({
    type: c.GET_DEFAULT_REPLIES_STATE,
    defaultState
});

export const getSelectedUser = (name, image) => ({
    type: c.SELECT_USER,
    name,
    image
});

export const setUserNotes = (user, note) => ({
    type: c.ADD_USER_NOTES,
    user,
    note
});

export const getDefaultSelectedUser = () => ({
    type: c.GET_DEFAULT_SELECTED_USER,
});

export const getDefaultUsersNote = (defaultState) => ({
    type: c.GET_DEFAULT_USERS_NOTE,
    defaultState
});

export const getDefaultUsersLabel = (defaultState) => ({
    type: c.GET_DEFAULT_USERS_LABEL,
    defaultState
});

export const getDefaultUsersConnectedLabels = (defaultState) => ({
    type: c.GET_DEFAULT_USERS_CONNECTED_LABELS,
    defaultState
});