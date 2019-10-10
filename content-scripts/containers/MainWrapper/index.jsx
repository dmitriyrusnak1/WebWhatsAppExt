import React from 'react';
import MainMenu from '../MainMenu';
import SideBar from '../SideBar';
import QuickReplies from '../QuickReplies';
import TopLogo from '../TopLogo';


function MainWrapper() {

    return (
        <React.Fragment>
            <TopLogo />
            <MainMenu />
            <SideBar />
            <QuickReplies />
        </React.Fragment>
    );
}

export default MainWrapper;