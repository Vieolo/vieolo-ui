// React
import React from 'react';



export default function Input(props: {
    value: string,
    placeholder?: string,
    onChange: (v: string) => void,
    error: boolean,
    size?: 'small' | 'medium' | 'large' | 'full',
    type?: 'text' | 'number' | 'password',
    disabled?: boolean,
    ariaLabel?: string,
    autoFocus?: boolean,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    inputType?: 'input' | 'textarea'
}) {
    let size = props.size || 'medium';
    let width = '180px';
    if (size === 'small') width = '100px';
    else if (size === 'large') width = '240px';
    else if (size === 'full') width = '100%';

    if (props.inputType === 'textarea') {
        return <textarea
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            className={`vieolo-textarea${props.error ? ' input-error' : ''}`}
            placeholder={props.placeholder || ''}
            style={{ width: width }}
            aria-label={props.ariaLabel}
        >
        </textarea>
    }

    return <input
        autoFocus={props.autoFocus}
        type={props.type || 'text'}
        value={props.value}
        placeholder={props.placeholder}
        onChange={e => { props.onChange(e.target.value) }}
        className={`vieolo-input${props.error ? ' input-error' : ''}${props.disabled ? ' disabled' : ''}`}
        style={{ width: width }}
        aria-label={props.ariaLabel}
        onKeyDown={props.onKeyDown}
    />
}