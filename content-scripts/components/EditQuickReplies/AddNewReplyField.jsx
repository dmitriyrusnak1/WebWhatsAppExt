import React, { useState } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import { bindActionCreators } from 'redux';
import { setNewQuickReply } from '../../helpers';
import { addNewReply } from '../../../src/reducers/app/actions';
import * as css from './style.css';



const propTypes = {
    addNewReply: func
};


function AddNewReplyField({
    addNewReply,
}) {

    const [replyValue, setReplyValue] = useState('');

    const handleChangeReply = (e) => {
        const value = e.target.value;
        setReplyValue(value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addNewReply(replyValue);
            setReplyValue('');
        }
    }

    const handleAddNewReply = () => {
        if (!!replyValue) {
            setNewQuickReply(replyValue);
            addNewReply(replyValue);
            setReplyValue('');
        }
    }


    return (
        <div className={css.addNewRepliesField}>
            <div>
                <input
                    value={replyValue}
                    onChange={handleChangeReply}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div>
                <Button onClick={handleAddNewReply}>
                    Add New Quick Reply
                    <Icon type="plus" />
                </Button>
            </div>
        </div>
    );
}



const mapDispatchToProps = (dispatch) => ({
    addNewReply: bindActionCreators(addNewReply, dispatch),
});


AddNewReplyField.propTypes = propTypes;


export default connect(null, mapDispatchToProps)(AddNewReplyField);