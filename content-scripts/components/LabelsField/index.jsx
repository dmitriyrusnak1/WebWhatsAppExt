import React, { useState } from 'react';
import { array, object, func } from 'prop-types';
import { isEmpty } from 'lodash';
import Icon from 'antd/es/icon';
import Checkbox from 'antd/es/checkbox';
import Modal from 'antd/es/modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LabelsSettings from './LabelsSettings';
import { deleteCurrentUsersLabels, addCurrentUsersLabels } from '../../utils';
import { addUserToLabel, deleteUserToLabel } from '../../../src/reducers/app/actions';
import * as css from './style.css';



const propTypes = {
    colorFilters: array,
    selectedUser: object,
    usersConnectedLabels: object,
    addUserToLabel: func,
    deleteUserToLabel: func
};

function LabelsField({
    colorFilters,
    selectedUser,
    usersConnectedLabels,
    deleteUserToLabel,
    addUserToLabel
}) {

    const [isModalSettingsVisible, setModalSettingsVisible] = useState(false);

    const handleOpenSettingsModal = () => {
        setModalSettingsVisible(!isModalSettingsVisible);
    }

    const showLabelForUser = (id) => {
        const rawLabel = colorFilters.filter(item => item.id === id)[0];
        if(isEmpty(selectedUser)) return null;

        const isUserConnectToLabel =
            (usersConnectedLabels[selectedUser.name] && usersConnectedLabels[selectedUser.name] === rawLabel.label) ? true : false;

        return isUserConnectToLabel;
    }

    const handleSwitchLabelForUser = (id) => () => {
        const rawLabel = colorFilters.filter(item => item.id === id)[0];
        if(isEmpty(selectedUser)) return null;

        const user = selectedUser.name;
        const label = rawLabel.label;

        const isChecked = showLabelForUser(id);
        if(isChecked) {
            deleteUserToLabel(user);
            deleteCurrentUsersLabels(user);
        } else {
            addUserToLabel(label, user);
            addCurrentUsersLabels(label, user);
        }
    }

    return (
        <div className={css.labelsFieldWrapper}>
            <div className={css.labelHeader}>
                <h1>Labels</h1>
                <Icon onClick={handleOpenSettingsModal} type="setting" />
            </div>
            <div>
                {
                    colorFilters.map(item => 
                        <div
                            key={item.id}
                            className={css.labelsListField}
                            style={{
                                background: showLabelForUser(item.id) ? `${item.color}` : "inherit",
                                transition: 'all .6s'
                            
                            }}
                            onClick={handleSwitchLabelForUser(item.id)}
                        >
                            <div className={css.colorField}>
                                <div className={css.colorCircle} style={{background: `${item.color}`}} />
                                <p>{item.label}</p>
                            </div>
                            {!isEmpty(selectedUser) && <Checkbox checked={showLabelForUser(item.id)} />}
                        </div>
                    )
                }
            </div>
            <Modal
                visible={isModalSettingsVisible}
                footer={null}
                onCancel={handleOpenSettingsModal}
                width={900}
            >
                <LabelsSettings />
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) =>({
    colorFilters: state.app.colorFilters,
    selectedUser: state.app.selectedUser,
    usersConnectedLabels: state.app.usersConnectedLabels
});

const mapDispatchToProps = (dispatch) => ({
    addUserToLabel: bindActionCreators(addUserToLabel, dispatch),
    deleteUserToLabel: bindActionCreators(deleteUserToLabel, dispatch)
});

LabelsField.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(LabelsField);