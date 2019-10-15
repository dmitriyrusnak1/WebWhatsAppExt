import React from 'react';
import Avatar from 'antd/es/avatar';
import { Divider } from 'antd';
import * as css from './style.css';


function UserField() {

    return (
        <div className={css.userFieldWrapper}>
            <h1>User</h1>
            <div>
                <Avatar size="large" icon="user" />
                <p>user name</p>
            </div>
            <Divider />
        </div>
    );
}

export default UserField;