// React
import React from 'react';



export default function Switch(props: {
    switchID: string,
    on: boolean,
    onChange: (value: boolean) => void,
    disabled?: boolean
}) {
    return <div className={`vieolo-switch${props.disabled ? ' disabled' : ''}`} >
        <input id={props.switchID} type="checkbox" name="set-name" className="switch-input" checked={props.on} readOnly/>
        <label htmlFor={props.switchID} className="switch-label" onClick={() => {props.onChange(!props.on);}}>
            <span className="switch-on"></span>
            <span className="switch-off"></span>
        </label>
    </div>
}