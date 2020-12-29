// React
import React from 'react';
export default function Textarea(props) {
    let size = props.size || 'medium';
    let width = '180px';
    if (size == 'small')
        width = '100px';
    else if (size == 'large')
        width = '240px';
    else if (size == 'full')
        width = '100%';
    return React.createElement("textarea", { value: props.value, onChange: e => props.onChange(e.target.value), className: `vieolo-textarea${props.error ? ' input-error' : ''}`, placeholder: props.placeholder || '', style: { width: width } });
}
