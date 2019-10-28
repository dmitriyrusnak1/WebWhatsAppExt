import React from 'react';
import { string, func, bool } from 'prop-types';
import Input from 'antd/es/input';
import * as css from './style.css';


const propTypes = {
    handleChangeEmail: func,
    handleSendEmail: func,
    email: string,
    isEmailValid: bool,
    successSending: bool
};

function SendEmailWindow({
    handleChangeEmail,
    handleSendEmail,
    email,
    isEmailValid,
    successSending
}) {
    
    const sendIcon = chrome.runtime.getURL("images/sendMessage.svg");

    return (
        <form className={css.newMessageWrapper} onSubmit={handleSendEmail} noValidate>
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
            {!isEmailValid && !!email && <p className={css.invalidEmail}>Email is invalid!</p>}
            {successSending && <p className={css.successEmail}>Email was sent!</p>}
        </form>
    );
}

SendEmailWindow.propTypes = propTypes;

export default SendEmailWindow;