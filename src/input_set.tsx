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
    return <div 
        className={`vieolo-input-set${props.disabled ? ' disabled' : ''}`}>
        <label>
            {props.label}
        </label>
        {
            props.tip &&
            <div className="tip-div tooltip">
                <div className="tip-icon">!</div>
                <div className="tooltip-text-down">{props.tip}</div>
            </div>
        }
        <br/>
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