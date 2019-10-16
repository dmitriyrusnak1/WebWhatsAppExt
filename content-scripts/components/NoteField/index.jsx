import React, { useState, useEffect } from 'react';
import { func, object } from 'prop-types';
import { isEmpty } from 'lodash';
import Input from 'antd/es/input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUsersNote } from '../../helpers';
import { setUserNotes } from '../../../src/reducers/app/actions';
import * as css from './style.css';



const propTypes = {
    setUserNotes: func,
    selectedUser: object,
    userNotes: object
};


function NoteField({ setUserNotes, selectedUser, userNotes }) {

    const [notes, setNotes] = useState('');


    useEffect(() => {
        setNotes('');
        const user = selectedUser.name;
        const value = userNotes[user] ? userNotes[user] : '';
        setNotes(value);
    }, [selectedUser]);

    const handleChangeNotes = (e) => {
        const value = e.target.value;
        setNotes(value);
    }

    const handleSetUserNotes = () => {

        if(!isEmpty(selectedUser)) {
            const user = selectedUser.name;
            setUsersNote(user, notes);
            setUserNotes(user, notes);
        }
    }

    return (
        <div className={css.notesFieldWrapper}>
            <h1>Notes</h1>
            <Input.TextArea
                rows={6}
                placeholder="Some text about the user"
                value={notes}
                onChange={handleChangeNotes}
                onBlur={handleSetUserNotes}
                disabled = {isEmpty(selectedUser) ? true : false}
            />
        </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    setUserNotes: bindActionCreators(setUserNotes, dispatch),
});

const mapStateToProps = (state) =>({
    selectedUser: state.app.selectedUser,
    userNotes: state.app.userNotes
});

NoteField.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(NoteField);