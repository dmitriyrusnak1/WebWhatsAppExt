import React from 'react';
import * as css from './style.css';


function SideBar() {
    const commentsIcon = chrome.runtime.getURL("images/comments.svg");
    const callIcon = chrome.runtime.getURL("images/whatsapp.svg");
    const homeIcon = chrome.runtime.getURL("images/home.svg");
    const plusIcon = chrome.runtime.getURL("images/plus.svg");



    return (
        <div className='sideBar'>
            <div className={css.contentWrapper}>
                <div className={css.iconWrapper}>
                    <object
                        type="image/svg+xml"
                        data={callIcon}
                        className={css.iconWrapper}
                    />
                </div>
                <div>
                    <div className={css.iconWrapper}>
                        <object
                            type="image/svg+xml"
                            data={homeIcon}
                            className={css.iconWrapper}
                        />
                    </div>
                    <div className={css.iconWrapper}>
                        <object
                            type="image/svg+xml"
                            data={commentsIcon}
                            className={css.iconWrapper}
                        />
                    </div>
                </div>
                <div className={css.iconWrapper}>
                    <object
                        type="image/svg+xml"
                        data={plusIcon}
                        className={css.iconWrapper}
                    />
                </div>
            </div>
        </div>
    );
}

export default SideBar;