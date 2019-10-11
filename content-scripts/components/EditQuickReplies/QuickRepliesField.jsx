import React, { useState } from 'react';
import { connect } from 'react-redux';
import { object, array, func } from 'prop-types';
import Icon from 'antd/es/icon';
import { bindActionCreators } from 'redux';
import { deleteReply, changeReply } from '../../../src/reducers/app/actions';
import * as css from './style.css';



const propTypes = {
    reply: object,
    deleteReply: func,
    changeReply: func
};


function QuickRepliesField({
    reply,
    deleteReply,
    changeReply,
}) {

    const [editMode, setEditMode] = useState(false);
    const [replyValue, setReplyValue] = useState(reply.text);
    
    const handleDeleteReply = () => {
        deleteReply(reply.id);
    };

    const handleChangeEditMode = () => {
        if(replyValue !== reply.text) {
            changeReply(reply.id, replyValue);
        }
        setEditMode(!editMode);
    };

    const handleChangeReply = (e) => {
        const value = e.target.value;
        setReplyValue(value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if(replyValue !== reply.text) {
                changeReply(reply.id, replyValue);
            }
            setEditMode(!editMode);
        }
    }


    return (
        <>
            <div className={css.quickRepliesField}>
                <div>
                    {
                        !editMode ?
                        <p>{reply.text}</p> :
                        <input
                            value={replyValue}
                            onChange={handleChangeReply}
                            onKeyPress={handleKeyPress}
                        />
                    }
                </div>
                <div>
                    {
                        !editMode ?
                            <Icon type="edit" onClick={handleChangeEditMode} /> :
                            <Icon type="save" onClick={handleChangeEditMode} />
                    }
                    <Icon type="close" onClick={handleDeleteReply} />
                </div>
            </div>
            <div className={css.divider} />
        </>
    );
}



const mapDispatchToProps = (dispatch) => ({
    deleteReply: bindActionCreators(deleteReply, dispatch),
    changeReply: bindActionCreators(changeReply, dispatch)
});


QuickRepliesField.propTypes = propTypes;


export default connect(null, mapDispatchToProps)(QuickRepliesField);