// React
import React from 'react';


// Components
import Input from './input';



export default function TextareaSet(props: {
    label: string,
    placeholder?: string,
    tip?: string,
    error: boolean,
    value: string,
    onChange: (value: string) => void,
    disabled?: boolean,
    size?: 'small' | 'medium' | 'large' | 'full',
    type?: 'text' | 'number' | 'password'
}) {

    let size = props.size || 'medium';
    let width = '180px';
    if (size == 'small') width = '100px';
    else if (size == 'large') width = '240px';
    else if (size == 'full') width = '100%';

    return <div
        className={`vieolo-input-set${props.disabled ? ' disabled' : ''}`} style={{width: width}}>
        <div className="label-container">
            <label>
                {props.label}
            </label>
            {
                props.tip &&
                <div className="tip-div vieolo-tooltip">
                    <div className="tip-icon">!</div>
                    <div className="tooltip-text-small tooltip-text-down-left">{props.tip}</div>
                </div>
            }
        </div>

        <Input
            value={props.value}
            error={props.error}
            onChange={props.onChange}
            placeholder={props.placeholder || ''}
            size={props.size}
            type={props.type}
        />
    </div>
}