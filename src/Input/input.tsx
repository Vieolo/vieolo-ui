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
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}) {
    let size = props.size || 'medium';
    let width = '180px';
    if (size === 'small') width = '100px';
    else if (size === 'large') width = '240px';
    else if (size === 'full') width = '100%';

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