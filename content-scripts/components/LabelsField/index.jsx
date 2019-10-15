import React, { useState } from 'react';
import { array } from 'prop-types';
import Icon from 'antd/es/icon';
import Modal from 'antd/es/modal';
import { connect } from 'react-redux';
import LabelsSettings from './LabelsSettings';
import * as css from './style.css';



const propTypes = {
    colorFilters: array,
};

function LabelsField({
    colorFilters
}) {

    const [isModalSettingsVisible, setModalSettingsVisible] = useState(false);

    const handleOpenSettingsModal = () => {
        setModalSettingsVisible(!isModalSettingsVisible);
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
                        <div key={item.id}>
                            <div className={css.colorField}>
                                <div className={css.colorCircle} style={{background: `${item.color}`}} />
                                <p>{item.label}</p>
                            </div>
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
    colorFilters: state.app.colorFilters
});

LabelsField.propTypes = propTypes;

export default connect(mapStateToProps)(LabelsField);