import React from 'react';
import { array } from 'prop-types';
import Icon from 'antd/es/icon';
import { connect } from 'react-redux';
import * as css from './style.css';



const propTypes = {
    colorFilters: array,
};

function LabelsField({
    colorFilters
}) {

    return (
        <div className={css.labelsFieldWrapper}>
            <div className={css.labelHeader}>
                <h1>Labels</h1>
                <Icon type="setting" />
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
        </div>
    );
}

const mapStateToProps = (state) =>({
    colorFilters: state.app.colorFilters
});

LabelsField.propTypes = propTypes;

export default connect(mapStateToProps)(LabelsField);