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

export const deleteLabel = (id) => ({
    type: c.DELETE_LABEL,
    id
});

export const changeLabel = (id, text) => ({
    type: c.CHANGE_LABEL,
    id,
    text
});

export const addNewLabel = (color, label) => ({
    type: c.ADD_NEW_LABEL,
    color,
    label
});
