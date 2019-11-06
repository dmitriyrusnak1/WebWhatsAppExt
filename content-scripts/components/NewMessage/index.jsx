import React from 'react';
import { string, func, bool } from 'prop-types';
import classNames from 'classnames';
import Input from 'antd/es/input';
import * as css from './style.css';


const propTypes = {
    handleChangePhone: func,
    handleChangeMessage: func,
    handleSendMessage: func,
    phoneNumber: string,
    message: string,
    isMessageSuccess: bool,
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
    const hoverSendIcon = chrome.runtime.getURL("images/hoverSendMessage.svg");

    const [isHovering, setHovering] = React.useState(false);

    React.useEffect(() => {
        if(isMessageSuccess) setHovering(false);
    }, [isMessageSuccess]);

    const handleMouseOver = (e) => {
        !!message && !!phoneNumber && setHovering(true)
    }
  
    const handleMouseOut = (e) => {
        !!message && !!phoneNumber && setHovering(false)
    }


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
                <button
                    type="submit"
                    className={classNames({
                        [css.disableSendButton]: !!phoneNumber && !!message,
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
            {isMessageSuccess && <p className={css.successEmail}>Message was sent!</p>}
        </form>
    );
}

NewMessage.propTypes = propTypes;

export default NewMessage;