import React, { useEffect } from 'react';
import { func } from 'prop-types';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainMenu from '../MainMenu';
import SideBar from '../SideBar';
import QuickReplies from '../QuickReplies';
import TopLogo from '../TopLogo';
import {
    getDefaultQuickReplies,
    getSelectedUser,
    getDefaultSelectedUser,
    getDefaultUsersNote,
    getDefaultUsersLabel
} from '../../../src/reducers/app/actions';



const propTypes = {
    getDefaultQuickReplies: func,
    getSelectedUser: func,
    getDefaultUsersNote: func,
    getDefaultUsersLabel: func
};

function MainWrapper({
    getDefaultQuickReplies,
    getSelectedUser,
    getDefaultSelectedUser,
    getDefaultUsersNote,
    getDefaultUsersLabel
}) {


    useEffect(() => {
        chrome.storage.sync.get(['quickReplies'], (items) => {
            if(isEmpty(items)) return [];
            const normalizedData = Object.values(items.quickReplies);

            getDefaultQuickReplies(normalizedData);
        });

        chrome.storage.sync.get(['usersNote'], (items) => {
            if(isEmpty(items)) return {};

            getDefaultUsersNote(items.usersNote);
        });

        chrome.storage.sync.get(['usersLabel'], (items) => {
            if(isEmpty(items)) return {};
            const normalizedData = Object.values(items.usersLabel);

            getDefaultUsersLabel(normalizedData);
        });

        getDefaultSelectedUser();

        setTimeout(() => {
            const contactPannel = document.getElementById("pane-side");
            contactPannel.addEventListener('click', () => {
                const selectedUserName = contactPannel.querySelector('._2UaNq._3mMX1 ._19RFN');
                const selectedUserAvatar = contactPannel.querySelector('._2UaNq._3mMX1 ._3RWII img');

                let image = '';
                let name = 'user';

                if(!!selectedUserName && !!selectedUserName.innerHTML) {
                    name = selectedUserName.innerHTML;
                    if(selectedUserAvatar) {
                        image = selectedUserAvatar.src;
                    }
                    getSelectedUser(name, image);
                }
            });
        }, 3000);
    }, []);


    return (
        <React.Fragment>
            <TopLogo />
            <MainMenu />
            <SideBar />
            <QuickReplies />
        </React.Fragment>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getDefaultQuickReplies: bindActionCreators(getDefaultQuickReplies, dispatch),
    getSelectedUser: bindActionCreators(getSelectedUser, dispatch),
    getDefaultSelectedUser: bindActionCreators(getDefaultSelectedUser, dispatch),
    getDefaultUsersNote: bindActionCreators(getDefaultUsersNote, dispatch),
    getDefaultUsersLabel: bindActionCreators(getDefaultUsersLabel, dispatch)
});


MainWrapper.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(MainWrapper);