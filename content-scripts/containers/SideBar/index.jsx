import React, { useState } from 'react';
import Modal from 'antd/es/modal';
import { NewMessage } from '../../components';
import * as css from './style.css';


function SideBar() {
    const commentsIcon = chrome.runtime.getURL("images/comments.svg");
    const callIcon = chrome.runtime.getURL("images/whatsapp.svg");
    const homeIcon = chrome.runtime.getURL("images/home.svg");
    const plusIcon = chrome.runtime.getURL("images/plus.svg");

    const [isModalVisible, setModalVisible] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [message, setMessage] = useState('');

    const handleChangePhone = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
    }

    const handleChangeMessage = (e) => {
        const value = e.target.value;
        setMessage(value);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        setPhoneNumber(null);
        setMessage('');
    }

    const handleOpenModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handleCancelModal = () => {
        setModalVisible(!isModalVisible);
        setPhoneNumber(null);
        setMessage('');
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
                <div className={css.iconWrapper} onClick={handleOpenModal}>
                    <img src={plusIcon} alt="plusIcon" />
                </div>
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
                />
            </Modal>
        </div>
    );
}

export default SideBar;