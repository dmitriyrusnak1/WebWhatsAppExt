import { genRandomId } from '../helpers';

///////////// QuickReply /////////////

export const setNewQuickReply = (text, newId) => {
    chrome.storage.local.get(['quickReplies'], (items) => {
        if (items.quickReplies == null || items.quickReplies == undefined) {
            items.quickReplies = {};
        }

        const value = {
            id: newId,
            text: text,
            count: 0
        };
        items.quickReplies[newId] = value;

        chrome.storage.local.set({'quickReplies': {...items.quickReplies}}, () => {});
    });
}

export const setNewQuickReplyMediaQuery = (text, fileName, fileSize, fileType, fileLastModified, newId) => {
    chrome.storage.local.get(['quickReplies'], (items) => {
        if (items.quickReplies == null || items.quickReplies == undefined) {
            items.quickReplies = {};
        }

        const value = {
            id: newId,
            text: text,
            fileName: fileName,
            fileSize: fileSize,
            fileType: fileType,
            fileLastModified: fileLastModified,
            count: 0
        };
        items.quickReplies[newId] = value;

        chrome.storage.local.set({'quickReplies': {...items.quickReplies}}, () => {});
    });
}

export const chooseCurrentQuickReply = (id) => {
    chrome.storage.local.get(['quickReplies'], (items) => {
        if (items.quickReplies == null || items.quickReplies == undefined) {
            return;
        }

        items.quickReplies[id].count = items.quickReplies[id].count + 1;

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

export const setUsersLabels = (color, label, user, newId) => {

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


export const deleteCurrentUsersLabels = (user) => {
    chrome.storage.sync.get(['usersConnectedLabels'], (items) => {
        if (items.usersConnectedLabels == null || items.usersConnectedLabels == undefined) {
            return;
        }

        const keys = Object.keys(items.usersConnectedLabels);

        const filteredObj = keys.reduce((result, key) => {
            if(key !== user) {
                result[key] = items.usersConnectedLabels[key];
            }
            return result;
        }, {});

        chrome.storage.sync.set({'usersConnectedLabels': {...filteredObj}}, () => {});
    });
}

export const addCurrentUsersLabels = (label, user) => {
    chrome.storage.sync.get(['usersConnectedLabels'], (items) => {
        if (items.usersConnectedLabels == null || items.usersConnectedLabels == undefined) {
            items.usersConnectedLabels = {};
        }

        items.usersConnectedLabels[user] = label;
        chrome.storage.sync.set({'usersConnectedLabels': {...items.usersConnectedLabels}}, () => {});
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