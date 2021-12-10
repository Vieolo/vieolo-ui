// React
import React from 'react';

// Vieolo UI
import Switch from './switch';

// Typography
import TypographyParagraphLarge from '../typography/typography_paragraph_large';
import TypographyCaptionLarge from '../typography/typography_caption_large';



export default function SwitchSet (props: {
    title: string | React.ReactNode,
    subtitle?: string | React.ReactNode,
    on: boolean,
    onChange: (v: boolean) => void,
    disabled?: boolean,
    switchID: string,
}) {    


    return <div 
        className={`vieolo-switch-set${props.disabled ? ' disabled' : ''}`} 
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
                    ? <TypographyParagraphLarge text={props.title} />
                    : <>
                        {props.title}
                    </>                
            }            
            {
                props.subtitle &&
                <>
                    {
                        typeof props.subtitle === 'string'
                            ? <TypographyCaptionLarge text={props.subtitle} />
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