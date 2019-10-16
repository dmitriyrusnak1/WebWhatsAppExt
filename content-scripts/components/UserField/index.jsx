import React from 'react';
import { object } from 'prop-types';
import { isEmpty } from 'lodash';
import Avatar from 'antd/es/avatar';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import * as css from './style.css';



const propTypes = {
    selectedUser: object
};


function UserField({selectedUser}) {

    return (
        <div className={css.userFieldWrapper}>
            <h1>User</h1>
            {
                !isEmpty(selectedUser) &&
                <div>
                    {
                        !!selectedUser.image ?
                        <Avatar size="large" src={selectedUser.image} /> :
                        <Avatar size="large" icon="user" />
                    }
                    <p>{selectedUser.name}</p>
                </div>
            }
            <Divider />
        </div>
    );
}


const mapStateToProps = (state) =>({
    selectedUser: state.app.selectedUser
});

UserField.propTypes = propTypes;

export default connect(mapStateToProps)(UserField);