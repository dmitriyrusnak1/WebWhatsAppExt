import React from 'react';
import * as css from './style.css';



function TopLogo() {
    const imgURL = chrome.runtime.getURL("images/MainLogo.png");

    return (
        <div className='topLogo'>
            <img className={css.imageWrapper} src={imgURL} />
        </div>
    );
}

export default TopLogo;