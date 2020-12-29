// React
import React from 'react';


// Components
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
    return <div 
        className={`vieolo-textarea-set${props.disabled ? ' disabled' : ''}`}>
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
        <Textarea 
            value={props.value}
            error={props.error}
            onChange={props.onChange}
            placeholder={props.placeholder || ''}
            size={props.size}
            />        
    </div>
}