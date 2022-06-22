// React
import React from 'react';

// Types
import { RowHeightType } from '../types/types';

// Vieolo UI
import Typography from '../Typography';
import { handleOnKeyDown } from '../utility/onkeydown_utility';

export default function SetRowTemplate(props: { // internal
    title: string | React.ReactNode,
    subtitle: string | React.ReactNode,
    disabled?: boolean | undefined,
    height?: RowHeightType | "default",
    className?: string,
    handleKeyboardNav: boolean,
    rightSideComponent: React.ReactNode,
    onRowClick?: () => void
}) {

    let c = `vieolo-set-row-template`
    if (props.height && props.height !== 'default') {
        c += ` row-height--${props.height}`
    } else {
        c += " vieolo-set-row-template--height-default"
    }


    if (props.className) c += ` ${props.className}`;

    if (props.disabled) c += " disabled"; 

    return <div 
        className={c} 
        tabIndex={props.handleKeyboardNav ? 0 : undefined}
        onKeyDown={e => {
            if (!props.handleKeyboardNav || !props.onRowClick) return;
            handleOnKeyDown(e, {
                onEnter: () => {
                    if (props.onRowClick) props.onRowClick();
                }
            })
        }}
    >
        <div 
            className={"vieolo-set-row-template__title-container"}
            onClick={() => {
                if (props.onRowClick) props.onRowClick();
            }}
            >
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
        <div className={'vieolo-set-row-template__right-container'}>
            {props.rightSideComponent}
        </div>
    </div>
}