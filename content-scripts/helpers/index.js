
import React from 'react';
import Icon from 'antd/es/icon';
import { isEmpty } from 'lodash';

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
    contacts.forEach(item => {
        const nestedNode = item.querySelectorAll('._2UaNq ._19RFN');

        const connectedColors = filter.filter(elem => nestedNode[0].style.background === hex2rgb(elem.color))[0];
        if(!isEmpty(connectedColors)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    if(isEmpty(filter)) {
        contacts.forEach(item => item.style.display = 'block');
    }
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
        } else if(rawData[0].includes('audio') || rawData[0].includes('video')) {
            return <React.Fragment>
                    <Icon style={{marginRight: '10px', color: '#000'}} type="customer-service" />
                    <span>{fileName}</span>
                </React.Fragment>;
        } else if(rawData[0].includes('text')) {
            return <React.Fragment>
                    <Icon style={{marginRight: '10px', color: '#000'}} type="file-text" />
                    <span>{fileName}</span>
                </React.Fragment>;
        } else if(rawData[0].includes('application')) {
            return <React.Fragment>
                    <Icon style={{marginRight: '10px', color: '#000'}} type="file-pdf" />
                    <span>{fileName}</span>
                </React.Fragment>;
        }
    } else {
        return field;
    }
}