// React
import React from 'react';

// Vieolo UI
import Switch from '../Switch';
import Typography from '../Typography';

// Types
import { RowHeightType } from '../types/types';



export default function SwitchSet (props: {
    title: string | React.ReactNode,
    subtitle?: string | React.ReactNode,
    on: boolean,
    onChange: (v: boolean) => void,
    switchID: string,
    disabled?: boolean,
    /**
     * The height of the row
     * To change the default height, override the "vieolo-swith-set--default-height" CSS class
     */
    height?: RowHeightType | "default"
}) {    

    let c = `vieolo-switch-set`
    if (props.height && props.height !== 'default') {
        c += ` row-height--${props.height}`
    } else {
        c += " vieolo-switch-set--height-default"
    }    
    
    if (props.disabled) c += " disabled"; 

    return <div 
        className={c} 
        tabIndex={0}
        onKeyDown={e => {
            if (["Enter", "Space"].includes(e.code) && !props.disabled) {
                props.onChange(!props.on)
            }
        }}
    >
        <div className="vieolo-switch-set__title-container" onClick={() => props.onChange(!props.on)}>
            {
                typeof props.title === 'string'
                    ? <Typography type='paragraph-large' text={props.title} />
                    : <>
                        {props.title}
                    </>                
            }            
            {
                props.subtitle &&
                <>
                    {
                        typeof props.subtitle === 'string'
                            ? <Typography type='caption-large' text={props.subtitle} />
                            : <>
                                {props.subtitle}
                            </>
                    }
                </>                
            }
        </div>

        <div className="vieolo-switch-set__switch-container">
            <Switch 
                on={props.on}
                onChange={v => {props.onChange(!props.on)}}
                switchID={props.switchID}
                disabled={props.disabled}                
                />
        </div>
    </div> 
}