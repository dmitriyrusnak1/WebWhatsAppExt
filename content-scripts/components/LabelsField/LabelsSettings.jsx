import React, { useState } from 'react';
import { array, func, object } from 'prop-types';
import { isEmpty } from 'lodash';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditLabels from './EditLabels';
import ColorPicker from './ColorPicker';
import { addNewLabel } from '../../../src/reducers/app/actions';
import { setUsersLabels } from '../../utils';
import { genRandomId } from '../../helpers';
import * as css from './style.css';



const propTypes = {
    colorFilters: array,
    addNewLabel: func,
    selectedUser: object
};

function LabelsSettings({
    colorFilters,
    addNewLabel,
    selectedUser
}) {

    const [addNewLabelMode, setAddNewLabelMode] = useState(false);
    const [color, setColor] = useState('#ffffff');
    const [newLabel, setNewLabel] = useState('');

    const handleOpenNewLabel = () => {
        setAddNewLabelMode(!addNewLabelMode);
    };

    const onChange = (obj) => {
        setColor(obj.hex);
    }

    const handleChangeNewLabel = (e) => {
        const value = e.target.value;
        setNewLabel(value);
    }

    const handleAddNewLabel = () => {
        if(!newLabel) return null;
        const newId = genRandomId();
        setUsersLabels(color, newLabel, selectedUser.name, newId);
        addNewLabel(color, newLabel, selectedUser.name, newId);
        setColor('#ffffff');
        setNewLabel('');
    }

    return (
        <div className={css.labelsSettingsWrapper}>
            <h1>edit exist label</h1>
            {colorFilters.map(item => <EditLabels key={item.id} label={item} />)}
            <div className={css.newLabelButton}>
                <Button
                    onClick={handleOpenNewLabel}
                    disabled={isEmpty(selectedUser) ? true : false}
                >
                    Add New Label<Icon type="plus" />
                </Button>
            </div>
            {
                addNewLabelMode ?
                    <ColorPicker
                        onChange={onChange}
                        color={color}
                        handleChangeNewLabel={handleChangeNewLabel}
                        newLabel={newLabel}
                        addNewLabel={handleAddNewLabel}
                    /> :
                    null
            }
        </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    addNewLabel: bindActionCreators(addNewLabel, dispatch),
});

const mapStateToProps = (state) =>({
    colorFilters: state.app.colorFilters,
    selectedUser: state.app.selectedUser,
});

LabelsSettings.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(LabelsSettings);