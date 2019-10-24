import React from 'react';
import { string, func, bool } from 'prop-types';
import Input from 'antd/es/input';
import * as css from './style.css';


const propTypes = {
    handleChangePhone: func,
    handleChangeMessage: func,
    handleSendMessage: func,
    phoneNumber: string,
    message: string,
    isMessageSuccess: bool
};

function NewMessage({
    handleChangePhone,
    handleChangeMessage,
    handleSendMessage,
    phoneNumber,
    message,
    isMessageSuccess
}) {
    
    const sendIcon = chrome.runtime.getURL("images/sendMessage.svg");

    return (
        <form className={css.newMessageWrapper} onSubmit={handleSendMessage}>
            <h2>message to new contact</h2>
            <Input
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handleChangePhone}
                type='tel'
            />
            <div className={css.messageWrapper}>
                <Input.TextArea
                    rows={6}
                    placeholder="Write Message"
                    value={message}
                    onChange={handleChangeMessage}
                    className={css.messageField}
                />
                <button type="submit">
                    <img
                        src={sendIcon}
                        alt="sendIcon"
                    />
                </button>
            </div>
            {isMessageSuccess && <p className={css.successEmail}>Message was sent!</p>}
        </form>
    );
}

NewMessage.propTypes = propTypes;

export default NewMessage;