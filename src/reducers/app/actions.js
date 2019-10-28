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

export const addNewReply = (text, newId) => ({
    type: c.ADD_NEW_REPLY,
    text,
    newId
})

export const addNewReplyMediaQuery = (text, fileName, fileSize, fileType, fileLastModified, newId) => ({
    type: c.ADD_NEW_REPLY_MEDIA_QUERY,
    text,
    fileName,
    fileSize,
    fileType,
    fileLastModified,
    newId
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

export const addNewLabel = (color, label, user, newId) => ({
    type: c.ADD_NEW_LABEL,
    color,
    label,
    user,
    newId
});

export const addUserToLabel = (label, user) => ({
    type: c.ADD_USER_TO_LABEL,
    label,
    user
});

export const deleteUserToLabel = (user) => ({
    type: c.DELETE_USER_TO_LABEL,
    user,
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