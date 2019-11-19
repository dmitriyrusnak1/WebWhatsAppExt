import React, { useEffect } from 'react';
import { func, array, object } from 'prop-types';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainMenu from '../MainMenu';
import SideBar from '../SideBar';
import QuickReplies from '../QuickReplies';
import TopLogo from '../TopLogo';
import he from 'he';
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
        chrome.storage.local.get(['quickReplies'], (items) => {
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

        chrome.storage.sync.get(['usersConnectedLabels'], (items) => {
            if(isEmpty(items)) return {};

            getDefaultUsersConnectedLabels(items.usersConnectedLabels);
        });


        getDefaultSelectedUser();

        const contactPannel = document.getElementById("pane-side");

        var reColorLabelsTimeout = null;
        contactPannel.onscroll = () => {
            // Whatsapp duplicates contacts UI while scrolling so we need to cleaer labels background while scrolling and 
            resetLabelsColors();
            clearTimeout(reColorLabelsTimeout);
            reColorLabelsTimeout = setTimeout(() => { document.getElementById("pane-side").click(); }, 400);
        };

        contactPannel.addEventListener('click', () => {
            const selectedUserName = contactPannel.querySelector('._2UaNq._3mMX1 ._19RFN');
            const selectedUserAvatar = contactPannel.querySelector('._2UaNq._3mMX1 ._3RWII img');

            let image = '';
            let name = 'user';

            if(!!selectedUserName && !!selectedUserName.innerHTML) {

                var stripedHtml = selectedUserName.innerHTML.replace(/<[^>]+>/g, '');
                name = he.decode(stripedHtml);

                if(selectedUserAvatar) {
                    image = selectedUserAvatar.src;
                }
                getSelectedUser(name, image);
            }
        });
        chrome.storage.local.get(['sendMessageToNewClient'], (items) => {
            console.log("sendMessageToNewClient");
            console.log(items);
            if (items.sendMessageToNewClient != null && items.sendMessageToNewClient != undefined && items.sendMessageToNewClient == 'true') {
                chrome.storage.local.set({'sendMessageToNewClient': null}, () => {
                    onLoadElement('button._3M-N-', function() {
                        document.querySelector("button._3M-N-").click();
                    })
                });
            }
        });

    }, []);

    useEffect(() => {
        if(!isEmpty(usersConnectedLabels)) {

            colorLablesOnPaneSide(usersConnectedLabels, colorFilters);
            
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

function resetLabelsColors() {
    const contactPannel = document.getElementById("pane-side");

    const contacts = contactPannel.querySelectorAll('._2UaNq');
    contacts.forEach(item => {
        item.style = "";
    });
}

function colorLablesOnPaneSide(usersConnectedLabels, colorFilters) {
    const contactPannel = document.getElementById("pane-side");

    console.log("Starting coloring labels");
    console.log(usersConnectedLabels);
    const contacts = contactPannel.querySelectorAll('._2UaNq');
    contacts.forEach(item => {
        const userItem = item.querySelector('._19RFN');
        const user = userItem.innerHTML;
        const label = usersConnectedLabels[user];
        item.style = "";

        if(!!label) {
            colorFilters.forEach(data => {
                  console.log(data.label + " === " + label);
                if(data.label === label){
                    item.style.background = data.color;
                    console.log("label colored");
                }
            })
        }
    });
}

function onLoadElement(elementPath, callback) {
    if(document.querySelector(elementPath)!=null) {
        callback();
    } else {
        setTimeout(function() {
            onLoadElement(elementPath, callback)
        }, 500);
    }
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