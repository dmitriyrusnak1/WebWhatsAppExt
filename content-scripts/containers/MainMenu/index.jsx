import React from 'react';
import { UserField, LabelsField, NoteField } from '../../components';
import * as css from './style.css';


function MainMenu() {

    return (
        <div className='mainMenu'>
            <div className={css.mainMenuHeader}>
                <h1> WhatsHub.io </h1>
            </div>
            <UserField />
            <LabelsField />
            <NoteField />
        </div>
    );
}

export default MainMenu;