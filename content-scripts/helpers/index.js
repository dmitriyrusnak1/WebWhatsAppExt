
///////////// QuickReply /////////////

export const setNewQuickReply = (text) => {
    chrome.storage.sync.get(['quickReplies'], (items) => {
        if (items.quickReplies == null || items.quickReplies == undefined) {
            items.quickReplies = {};
        }

        const newId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);

        const value = {id: newId, text: text};
        items.quickReplies[newId] = value;
        chrome.storage.sync.set({'quickReplies': {...items.quickReplies}}, () => {});
    });
}


export const deleteQuickReply = (id) => {
    chrome.storage.sync.get(['quickReplies'], (items) => {
        if (items.quickReplies == null || items.quickReplies == undefined) {
            return;
        }

        const keys = Object.keys(items.quickReplies);
        const filteredKeys = keys.filter(key => key !== id);

        const filteredObj = filteredKeys.reduce((result, key) => {
            result[key] = items.quickReplies[key];
            return result;
        }, {});

        chrome.storage.sync.set({'quickReplies': {...filteredObj}}, () => {});
    });
}

export const editQuickReply = (id, text) => {
    chrome.storage.sync.get(['quickReplies'], (items) => {
        if (items.quickReplies == null || items.quickReplies == undefined) {
            return;
        }

        items.quickReplies[id].text = text;
        items.quickReplies[id].id = id;

        chrome.storage.sync.set({'quickReplies': {...items.quickReplies}}, () => {});
    });
}


///////////// UsersLabels /////////////

export const setUsersLabels = (color, label, user) => {

    chrome.storage.sync.get(['usersLabel'], (items) => {
        if (items.usersLabel == null || items.usersLabel == undefined) {
            items.usersLabel = {};
        }

        const newId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);

        const value = {
            id: newId,
            color: color,
            label: label,
            user: user
        };
        items.usersLabel[newId] = value;
        chrome.storage.sync.set({'usersLabel': {...items.usersLabel}}, () => {});
    });
}

export const deleteUsersLabels = (id) => {
    chrome.storage.sync.get(['usersLabel'], (items) => {
        if (items.usersLabel == null || items.usersLabel == undefined) {
            return;
        }

        const keys = Object.keys(items.usersLabel);
        const filteredKeys = keys.filter(key => key !== id);

        const filteredObj = filteredKeys.reduce((result, key) => {
            result[key] = items.usersLabel[key];
            return result;
        }, {});

        chrome.storage.sync.set({'usersLabel': {...filteredObj}}, () => {});
    });
}

export const editUsersLabels = (id, label) => {
    chrome.storage.sync.get(['usersLabel'], (items) => {
        if (items.usersLabel == null || items.usersLabel == undefined) {
            return;
        }

        items.usersLabel[id].label = label;
        items.usersLabel[id].id = id;
        items.usersLabel[id].user = items.usersLabel[id].user;

        chrome.storage.sync.set({'usersLabel': {...items.usersLabel}}, () => {});
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