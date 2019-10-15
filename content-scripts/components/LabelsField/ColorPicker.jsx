import React from "react";
import { object, func, string } from 'prop-types';
import { CustomPicker } from "react-color";
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import { Hue, Saturation } from "react-color/lib/components/common";
import * as css from './style.css';


const propTypes = {
    hsl: object,
    hsv: object,
    onChange: func,
    handleChangeNewLabel: func,
    newLabel: string,
    addNewLabel: func
};

export function MyPicker({
    hsl,
    hsv,
    onChange,
    handleChangeNewLabel,
    newLabel,
    addNewLabel }) {
  
      return (
        <div className={css.colorPickerWrapper}>
            <div>
                <h1>create new label</h1>
                <h3>choose color</h3>
                <div className={css.saturationField}>
                    <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
                </div>
                <div className={css.hueField}>
                    <Hue hsl={hsl} onChange={onChange} />
                </div>
            </div>
            <div>
                <h3>choose label name</h3>
                <Input
                    placeholder="Type..."
                    value={newLabel}
                    onChange={handleChangeNewLabel}
                    className={css.messageField}
                />
            </div>
            <div>
                <Button onClick={addNewLabel}>Add</Button>
            </div>
        </div>
      );
  }
  
  MyPicker.propTypes = propTypes;
  
  export default CustomPicker(MyPicker);