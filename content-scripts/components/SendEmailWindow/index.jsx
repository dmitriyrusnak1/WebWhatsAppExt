import React from 'react';
import { string, func, bool } from 'prop-types';
import classNames from 'classnames';
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
    const hoverSendIcon = chrome.runtime.getURL("images/hoverSendMessage.svg");

    const [isHovering, setHovering] = React.useState(false);
    
    const handleMouseOver = (e) => {
        isEmailValid && setHovering(true)
    }
  
    const handleMouseOut = (e) => {
        isEmailValid && setHovering(false)
    }

    
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
                <button
                    type="submit"
                    className={classNames({
                        [css.disableSendButton]: isEmailValid,
                    })}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    <img
                        src={!isHovering ? sendIcon : hoverSendIcon}
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