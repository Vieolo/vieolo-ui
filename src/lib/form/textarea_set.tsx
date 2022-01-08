// React
import React from 'react';


// Private Components
import TipIcon from '../private/tip_icon';


// Public Components
import Textarea from './textarea';



export default function TextareaSet(props: {
    label: string,
    placeholder?: string,
    tip?: string,
    error: boolean,
    value: string,
    onChange: (value: string) => void,
    disabled?: boolean,
    size?: 'small' | 'medium' | 'large' | 'full',
}) {

    let size = props.size || 'medium';
    let width = '180px';
    if (size == 'small') width = '100px';
    else if (size == 'large') width = '240px';
    else if (size == 'full') width = '100%';

    return <div
        className={`vieolo-textarea-set${props.disabled ? ' disabled' : ''}`} style={{width: width}}>
        <div className="label-container">
            <label>
                {props.label}
            </label>
            {
                props.tip &&
                <div className="tip-div vieolo-tooltip">
                    <TipIcon />
                    <div className="tooltip-text-small tooltip-text-down-left">{props.tip}</div>
                </div>
            }
        </div>
        <Textarea
            value={props.value}
            error={props.error}
            onChange={props.onChange}
            placeholder={props.placeholder || ''}
            size={props.size}
            ariaLabel={props.label}
        />
    </div >
}