import React from 'react';
import { string, func } from 'prop-types';
import Input from 'antd/es/input';
import * as css from './style.css';


const propTypes = {
    handleChangeEmail: func,
    handleSendEmail: func,
    email: string,
};

function SendEmailWindow({
    handleChangeEmail,
    handleSendEmail,
    email
}) {
    
    const sendIcon = chrome.runtime.getURL("images/sendMessage.svg");

    return (
        <form className={css.newMessageWrapper} onSubmit={handleSendEmail}>
            <h2>send conversation to email address</h2>
            <div className={css.messageWrapper}>
                <Input
                    placeholder="Email Address"
                    value={email}
                    onChange={handleChangeEmail}
                    className={css.messageField}
                    type='email'
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

SendEmailWindow.propTypes = propTypes;

export default SendEmailWindow;