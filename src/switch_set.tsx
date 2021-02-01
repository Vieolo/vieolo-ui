// React
import React from 'react';



// Vieolo UI
import Switch from './switch';



export default function SwitchSet (props: {
    title: string,
    subtitle?: string,
    on: boolean,
    onChange: (v: boolean) => void,
    disabled?: boolean,
    switchID: string,
}) {    


    return <div className={`vieolo-switch-set${props.disabled ? ' disabled' : ''}`}>
        <div className="title-container" onClick={() => props.onChange(!props.on)}>
            <p className="title">{props.title}</p>
            {
                props.subtitle &&
                <p className="subtitle">{props.subtitle}</p>
            }
        </div>

        <div className="switch-container">
            <Switch 
                on={props.on}
                onChange={v => {props.onChange(!props.on)}}
                switchID={props.switchID}
                disabled={props.disabled}                
                />
        </div>
    </div> 
}