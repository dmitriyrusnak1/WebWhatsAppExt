import React, { useState } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import Icon from 'antd/es/icon';
import { bindActionCreators } from 'redux';
import { deleteLabel, changeLabel } from '../../../src/reducers/app/actions';
import * as css from './style.css';



const propTypes = {
    label: object,
    deleteLabel: func,
    changeLabel: func
};


function EditLabels({
    label,
    deleteLabel,
    changeLabel,
}) {

    const [editMode, setEditMode] = useState(false);
    const [labelValue, setLabelValue] = useState(label.label);
    
    const handleDeleteLabel = () => {
        deleteLabel(label.id);
    };

    const handleChangeEditMode = () => {
        if(labelValue !== label.label) {
            changeLabel(label.id, labelValue);
        }
        setEditMode(!editMode); 
    };

    const handleChangeLabel = (e) => {
        const value = e.target.value;
        setLabelValue(value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if(labelValue !== label.label) {
                changeLabel(label.id, labelValue);
            }
            setEditMode(!editMode);
        }
    }


    return (
        <>
            <div className={css.editLabelsWrapper}>
                <div>
                    <div className={css.colorField}>
                        <div className={css.colorCircle} style={{background: `${label.color}`}} />
                        {
                            !editMode ?
                            <p>{label.label}</p> :
                            <input
                                value={labelValue}
                                onChange={handleChangeLabel}
                                onKeyPress={handleKeyPress}
                            />
                        }
                    </div>
                </div>
                <div className={css.iconsField}>
                    {
                        !editMode ?
                            <Icon type="edit" onClick={handleChangeEditMode} /> :
                            <Icon type="save" onClick={handleChangeEditMode} />
                    }
                    <Icon type="close" onClick={handleDeleteLabel} />
                </div>
            </div>
            <div className={css.divider} />
        </>
    );
}



const mapDispatchToProps = (dispatch) => ({
    deleteLabel: bindActionCreators(deleteLabel, dispatch),
    changeLabel: bindActionCreators(changeLabel, dispatch)
});


EditLabels.propTypes = propTypes;


export default connect(null, mapDispatchToProps)(EditLabels);