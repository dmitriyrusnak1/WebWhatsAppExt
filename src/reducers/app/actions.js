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
