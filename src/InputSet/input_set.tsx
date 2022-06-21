// React
import React from 'react';

// Private Components
import TipIcon from '../private/tip_icon';


// Public Components
import Input from '../Input/input';
import IconButton from '../IconButton';



export default function InputSet(props: {
    label: string,
    ariaLabel?: string,
    placeholder?: string,
    tip?: string,
    error: boolean,
    value: string,
    onChange: (value: string) => void,
    disabled?: boolean,
    size?: 'small' | 'medium' | 'large' | 'full',
    type?: 'text' | 'number' | 'password',
    autoFocus?: boolean,
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
    actionButton?: {
        description: string,
        icon: React.ReactNode,
        onClick: () => void
    }
}) {

    let size = props.size || 'medium';
    let width = '180px';
    if (size === 'small') width = '100px';
    else if (size === 'large') width = '240px';
    else if (size === 'full') width = '100%';

    let actionComponent = <span></span>;

    if (props.actionButton) {
        actionComponent = <IconButton
            icon={props.actionButton.icon}
            onClick={props.actionButton.onClick}
            tooltip={props.actionButton.description}
            tooltipPosition={'down-left'}
            size={'small'}
        />
    } else if (props.tip) {
        actionComponent = <div className="tip-div vieolo-tooltip">
            <TipIcon />
            <div className="tooltip-text-small tooltip-text-down-left">{props.tip}</div>
        </div>
    }

    return <div
        className={`vieolo-input-set${props.disabled ? ' disabled' : ''}`} style={{ width: width }}>
        {
            (props.label || props.actionButton) &&
            <div className="label-container">
                <label>
                    {props.label}
                </label>
                {actionComponent}
            </div>
        }

        <Input
            value={props.value}
            error={props.error}
            onChange={props.onChange}
            placeholder={props.placeholder || ''}
            size={props.size}
            type={props.type}
            ariaLabel={props.ariaLabel || props.label}
            autoFocus={props.autoFocus}
            onKeyDown={props.onKeyDown}
        />
    </div>
}