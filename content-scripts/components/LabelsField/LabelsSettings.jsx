import React from 'react';
import { array } from 'prop-types';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import { connect } from 'react-redux';
import EditLabels from './EditLabels';
import * as css from './style.css';



const propTypes = {
    colorFilters: array,
};

function LabelsSettings({
    colorFilters
}) {

    const handleOpenNewLabel = () => {

    };

    return (
        <div className={css.labelsSettingsWrapper}>
            <h1>edit exist label</h1>
            {colorFilters.map(item => <EditLabels key={item.id} label={item} />)}
            <div className={css.newLabelButton}>
                <Button onClick={handleOpenNewLabel}>Add New Label<Icon type="plus" /></Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>({
    colorFilters: state.app.colorFilters
});

LabelsSettings.propTypes = propTypes;

export default connect(mapStateToProps)(LabelsSettings);