import React, { useState } from 'react';
import Modal from 'antd/es/modal';
import Tooltip from 'antd/es/tooltip';
import { NewMessage } from '../../components';
import * as css from './style.css';
import { sendMessageToContact } from '../../utils';

function SideBar() {
    const commentsIcon = chrome.runtime.getURL("images/comments.svg");
    const callIcon = chrome.runtime.getURL("images/whatsapp.svg");
    const homeIcon = chrome.runtime.getURL("images/home.svg");
    const plusIcon = chrome.runtime.getURL("images/plus.svg");

    const [isModalVisible, setModalVisible] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [message, setMessage] = useState('');
    const [isMessageSuccess, setIsMessageSuccess] = useState(false);

    const handleChangePhone = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        if(isMessageSuccess) setIsMessageSuccess(false);
    }

    const handleChangeMessage = (e) => {
        const value = e.target.value;
        setMessage(value);
        if(isMessageSuccess) setIsMessageSuccess(false);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if(!message || !phoneNumber) return null;
        sendMessageToContact(message, phoneNumber);
        setPhoneNumber(null);
        setMessage('');
        setIsMessageSuccess(true);
    }

    const handleOpenModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handleCancelModal = () => {
        setModalVisible(!isModalVisible);
        setPhoneNumber(null);
        setMessage('');
        setIsMessageSuccess(false);
    }

    return (
        <div className='sideBar'>
            <div className={css.contentWrapper}>
                <div className={css.iconWrapper}>
                    <img src={callIcon} alt="callIcon" />
                </div>
                <div>
                    <div className={css.iconWrapper}>
                        <img src={homeIcon} alt="homeIcon" />
                    </div>
                    <div className={css.iconWrapper}>
                        <img src={commentsIcon} alt="commentsIcon" />
                    </div>
                </div>
                <Tooltip title="Send message to new contact" placement="right">
                    <div className={css.iconWrapper} onClick={handleOpenModal}>
                        <img src={plusIcon} alt="plusIcon" />
                    </div>
                </Tooltip>
            </div>
            <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancelModal}
            >
                <NewMessage
                    handleChangePhone={handleChangePhone}
                    handleChangeMessage={handleChangeMessage}
                    handleSendMessage={handleSendMessage}
                    phoneNumber={phoneNumber}
                    message={message}
                    isMessageSuccess={isMessageSuccess}
                />
            </Modal>
        </div>
    );
}

export default SideBar;