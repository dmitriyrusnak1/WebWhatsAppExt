import React from 'react';
import Checkbox from 'antd/es/checkbox';
import classNames from 'classnames';
import { countFilteredUsers } from '../../helpers';
import * as css from './style.css';


function FilterItem({
    item,
    usersConnectedLabels,
    showChosenFilters,
    onHandleClick
}) {
    const [isHovering, setHovering] = React.useState(false);
    
    const handleMouseOver = (e) => {
        setHovering(true)
    }
  
    const handleMouseOut = (e) => {
        setHovering(false)
    }

    return (
        <div
            onClick={onHandleClick(item)}
            className={classNames({
                [css.hoverFilterEffect]: isHovering,
                [css.filterItem]: true
            })}
            style={{
                background: showChosenFilters(item.id) ? `${item.color}` : 'inherit',
                transition: 'all .6s'
            }}
        >
            <div
                className={classNames({
                    [css.filterField]: true,
                })}
            >
                <div
                    className={css.field}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    <div className={css.colorField}>
                        <div className={css.colorCircle} style={{background: `${item.color}`}} />
                        <p>{item.label}</p>
                        <p>({countFilteredUsers(item.label, usersConnectedLabels)})</p>
                    </div>
                </div>
                <Checkbox
                    checked={showChosenFilters(item.id)}
                    className={css.filterCheckbox}
                />
            </div>
            <div className={css.divider} />
        </div>
    );
}

export default FilterItem;