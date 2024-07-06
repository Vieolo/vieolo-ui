// React
import React from 'react';



export default function Switch(props: {
    switchID: string,
    on: boolean,
    onChange: (value: boolean) => void,
    disabled?: boolean,
    ariaLabel?: string,
    dataTestID?: string,
}) {
    return <div className={`vieolo-switch${props.disabled ? ' disabled' : ''}`} >
        <input id={props.switchID} type="checkbox" name="set-name" className="switch-input" data-testid={props.dataTestID} checked={props.on} readOnly />
        <label 
            htmlFor={props.switchID} 
            className="switch-label" 
            onClick={(e) => { 
                e.stopPropagation();
                props.onChange(!props.on); 
            }} 
            aria-label={props.ariaLabel}
        >
            <span className="switch-on"></span>
            <span className="switch-off"></span>
        </label>
    </div>
}