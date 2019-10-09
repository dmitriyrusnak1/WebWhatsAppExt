import React from 'react';
import MainMenu from '../MainMenu';
import SideBar from '../SideBar';
import QuickReplies from '../QuickReplies';


function MainWrapper() {

    return (
        <React.Fragment>
            <MainMenu />
            <SideBar />
            <QuickReplies />
        </React.Fragment>
    );
}

export default MainWrapper;