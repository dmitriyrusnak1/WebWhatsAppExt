import React from 'react';
import Input from 'antd/es/input';
import * as css from './style.css';


function NewMessage({
    handleChangePhone,
    handleChangeMessage,
    handleSendMessage,
    phoneNumber,
    message
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
        </form>
    );
}

export default NewMessage;