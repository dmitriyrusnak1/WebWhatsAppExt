import React, { useEffect } from 'react';
import { func, array, object } from 'prop-types';
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
    getDefaultUsersLabel,
    getDefaultUsersConnectedLabels
} from '../../../src/reducers/app/actions';



const propTypes = {
    getDefaultQuickReplies: func,
    getSelectedUser: func,
    getDefaultUsersNote: func,
    getDefaultUsersLabel: func,
    getDefaultUsersConnectedLabels: func,
    colorFilters: array,
    usersConnectedLabels: object

};

function MainWrapper({
    getDefaultQuickReplies,
    getSelectedUser,
    getDefaultSelectedUser,
    getDefaultUsersNote,
    getDefaultUsersLabel,
    getDefaultUsersConnectedLabels,
    colorFilters,
    usersConnectedLabels
}) {


    useEffect(() => {
        chrome.storage.sync.get(['quickReplies'], (items) => {
            if(isEmpty(items)) return [];
            const normalizedData = Object.values(items.quickReplies);
console.log('777777', items.quickReplies)
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

        chrome.storage.sync.get(['usersConnectedLabels'], (items) => {
            if(isEmpty(items)) return {};

            getDefaultUsersConnectedLabels(items.usersConnectedLabels);
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

    useEffect(() => {
        if(!isEmpty(usersConnectedLabels)) {
            setTimeout(() => {
                const contactPannel = document.getElementById("pane-side");
    
    
                const contacts = contactPannel.querySelectorAll('._2UaNq ._19RFN');
                contacts.forEach(item => {
                    const user = item.innerHTML;
                    const label = usersConnectedLabels[user];
    
                    if(!!label) {
                        colorFilters.forEach(data => {
                            if(data.label === label){
                                item.style.background = data.color;
                            }
                        })
                    }
                });
            }, 3000);
        }
    }, [usersConnectedLabels]);


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
    getDefaultUsersLabel: bindActionCreators(getDefaultUsersLabel, dispatch),
    getDefaultUsersConnectedLabels: bindActionCreators(getDefaultUsersConnectedLabels, dispatch)
});

const mapStateToProps = (state) =>({
    colorFilters: state.app.colorFilters,
    usersConnectedLabels: state.app.usersConnectedLabels,
});


MainWrapper.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper);