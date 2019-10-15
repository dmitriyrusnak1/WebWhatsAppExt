import React, { useState } from 'react';
import Input from 'antd/es/input';
import * as css from './style.css';


function NoteField() {

const [notes, setNotes] = useState('');

    const handleChangeNotes = (e) => {
        const value = e.target.value;
        setNotes(value);
    }

    return (
        <div className={css.notesFieldWrapper}>
            <h1>Notes</h1>
            <Input.TextArea
                rows={6}
                placeholder="Some text about the user"
                value={notes}
                onChange={handleChangeNotes}
            />
        </div>
    );
}

export default NoteField;