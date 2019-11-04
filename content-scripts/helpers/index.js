
import React from 'react';

///////// common ///////////

export const countFilteredUsers = (label, usersConnectedLabels) => {
    let count = 0;
    const values = Object.values(usersConnectedLabels);
    
    values.forEach(item => {
        if(item === label) {
            count = count + 1;
        }
    });
    return count;
}

function hex2rgb(c) {
    var bigint = parseInt(c.split('#')[1], 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

export const filterContacts = (document, filter) => {
    const contactPannel = document.getElementById("pane-side");

    const contacts = contactPannel.querySelectorAll('.X7YrQ');

    var translateY = 0;
    contacts.forEach(item => {
        
        const itemWithBackground = item.querySelector('._2UaNq');

        if(filter.length > 0 && itemWithBackground.style.background !== hex2rgb(filter[0].color)) {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
            item.style.transform = "translateY("+translateY+"px)";
            translateY = translateY + 72;
        }
    });
}

export const convertStrToNode = (field, className, fileName) => {
    const rawData = field.split(';');

    if(
        !!rawData[1] && 
        rawData[0].includes('data:') &&
        rawData[1].includes('base64')
    ) {
        if(rawData[0].includes('image')) {
            return <img className={className} src={field} />
        } else if(rawData[0].includes('audio')) {
            return `${fileName}`;
        } else if(rawData[0].includes('text')) {
            return `${fileName}`;
        } else if(rawData[0].includes('application')) {
            return `${fileName}`;
        }
    } else {
        return field;
    }
}

///////////// QuickReply /////////////

export const setNewQuickReply = (text) => {
    chrome.storage.local.get(['quickReplies'], (items) => {
        if (items.quickReplies == null || items.quickReplies == undefined) {
            items.quickReplies = {};
        }

        const newId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);

        const value = {
            id: newId,
            text: text
        };
        items.quickReplies[newId] = value;

        chrome.storage.local.set({'quickReplies': {...items.quickReplies}}, () => {});
    });
}

export const setNewQuickReplyMediaQuery = (text, fileName) => {
    chrome.storage.local.get(['quickReplies'], (items) => {
        if (items.quickReplies == null || items.quickReplies == undefined) {
            items.quickReplies = {};
        }

        const newId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);

        const value = {
            id: newId,
            text: text,
            fileName: fileName
        };
        items.quickReplies[newId] = value;

        chrome.storage.local.set({'quickReplies': {...items.quickReplies}}, () => {});
    });
}


export const deleteQuickReply = (id) => {
    chrome.storage.local.get(['quickReplies'], (items) => {
        if (items.quickReplies == null || items.quickReplies == undefined) {
            return;
        }

        const keys = Object.keys(items.quickReplies);
        const filteredKeys = keys.filter(key => key !== id);

        const filteredObj = filteredKeys.reduce((result, key) => {
            result[key] = items.quickReplies[key];
            return result;
        }, {});

        chrome.storage.local.set({'quickReplies': {...filteredObj}}, () => {});
    });
}

export const editQuickReply = (id, text) => {
    chrome.storage.local.get(['quickReplies'], (items) => {
        if (items.quickReplies == null || items.quickReplies == undefined) {
            return;
        }

        items.quickReplies[id].text = text;
        items.quickReplies[id].id = id;

        chrome.storage.local.set({'quickReplies': {...items.quickReplies}}, () => {});
    });
}



///////////// UsersLabels /////////////

export const setUsersLabels = (color, label, user) => {

    const newId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);

    chrome.storage.sync.get(['usersLabel'], (items) => {
        if (items.usersLabel == null || items.usersLabel == undefined) {
            items.usersLabel = {};
        }

        if(!items.usersLabel[label]) {
            const value = {
                id: newId,
                color: color,
                label: label,
            };
            items.usersLabel[label] = value;
        } else {
            items.usersLabel[label].color = color;
        }
        chrome.storage.sync.set({'usersLabel': {...items.usersLabel}}, () => {});
    });

    chrome.storage.sync.get(['usersConnectedLabels'], (items) => {
        if (items.usersConnectedLabels == null || items.usersConnectedLabels == undefined) {
            items.usersConnectedLabels = {};
        }

        items.usersConnectedLabels[user] = label;
        chrome.storage.sync.set({'usersConnectedLabels': {...items.usersConnectedLabels}}, () => {});
    });
}

export const deleteUsersLabels = (label) => {
    chrome.storage.sync.get(['usersLabel'], (items) => {
        if (items.usersLabel == null || items.usersLabel == undefined) {
            return;
        }

        const keys = Object.keys(items.usersLabel);
        const filteredKeys = keys.filter(key => key !== label);

        const filteredObj = filteredKeys.reduce((result, key) => {
            result[key] = items.usersLabel[key];
            return result;
        }, {});

        chrome.storage.sync.set({'usersLabel': {...filteredObj}}, () => {});
    });

    chrome.storage.sync.get(['usersConnectedLabels'], (items) => {
        if (items.usersConnectedLabels == null || items.usersConnectedLabels == undefined) {
            return;
        }

        const keys = Object.keys(items.usersConnectedLabels);

        const filteredObj = keys.reduce((result, key) => {
            if(items.usersConnectedLabels[key] !== label) {
                result[key] = items.usersConnectedLabels[key];
            }
            return result;
        }, {});

        chrome.storage.sync.set({'usersConnectedLabels': {...filteredObj}}, () => {});
    });
}

export const editUsersLabels = (id, label, oldLabel) => {
    chrome.storage.sync.get(['usersLabel'], (items) => {
        if (items.usersLabel == null || items.usersLabel == undefined) {
            return;
        }

        items.usersLabel[label] = items.usersLabel[oldLabel];
        delete items.usersLabel[oldLabel];
        items.usersLabel[label].label = label;

        chrome.storage.sync.set({'usersLabel': {...items.usersLabel}}, () => {});
    });

    chrome.storage.sync.get(['usersConnectedLabels'], (items) => {
        if (items.usersConnectedLabels == null || items.usersConnectedLabels == undefined) {
            return;
        }

        const keys = Object.keys(items.usersConnectedLabels);

        const filteredObj = keys.reduce((result, key) => {
            if(items.usersConnectedLabels[key] !== oldLabel) {
                result[key] = items.usersConnectedLabels[key];
            } else {
                result[key] = label;
            }
            return result;
        }, {});

        chrome.storage.sync.set({'usersConnectedLabels': {...filteredObj}}, () => {});
    });
}


///////////// UsersNotes /////////////

export const setUsersNote = (user, note) => {
    chrome.storage.sync.get(['usersNote'], (items) => {
        if (items.usersNote == null || items.usersNote == undefined) {
            items.usersNote = {};
        }

        items.usersNote[user] = note;
        chrome.storage.sync.set({'usersNote': {...items.usersNote}}, () => {});
    });
}