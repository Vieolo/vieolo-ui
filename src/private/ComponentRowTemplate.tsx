// React
import React from 'react';

// Types
import { RowHeightType } from '../types/types';

// Vieolo UI
import Typography from '../Typography';
import { handleOnKeyDown } from '../utility/onkeydown_utility';

export type ComponentRowTemplateResponsive = boolean | 'lg' | 'md' | 'sm'; // internal

export default function ComponentRowTemplate(props: { // internal
    title: string | React.ReactNode,
    subtitle: string | React.ReactNode,
    disabled?: boolean | undefined,
    height?: RowHeightType | "default",
    className?: string,
    handleKeyboardNav: boolean,
    rightSideComponent: React.ReactNode,
    onRowClick?: () => void,
    /**
     * Whether the title column should be positioned on the top of right component to accomodate for smaller screens.
     * 
     * You can explicitly determine the breakpoint from which the row is responsive. If a boolean is given, the breakpoint will be considered to the mobile layout
     */
    responsive?: ComponentRowTemplateResponsive
}) {

    let c = `vieolo-component-row-template`
    if (props.height && props.height !== 'default') {
        c += ` row-height--${props.height}`
    } else {
        c += " vieolo-component-row-template--height-default"
    }
    
    if (props.responsive) {
        let resB = 'sm'
        if (props.responsive !== true && props.responsive !== 'sm') {
            resB = props.responsive 
        }
        c += ` vieolo-component-row-template--responsive-${resB}`
    }

    if (props.onRowClick) c += " vieolo-component-row-template--clickable"


    if (props.className) c += ` ${props.className}`;

    if (props.disabled) c += " disabled"; 

    return <div 
        className={c} 
        tabIndex={props.handleKeyboardNav ? 0 : undefined}
        onClick={e => {
            e.stopPropagation();
            if (props.onRowClick) props.onRowClick();
        }}
        onKeyDown={e => {
            e.stopPropagation();
            if (!props.handleKeyboardNav || !props.onRowClick) return;
            handleOnKeyDown(e, {
                onEnter: () => {
                    if (props.onRowClick) props.onRowClick();
                }
            })
        }}
    >
        <div 
            className={"vieolo-component-row-template__title-container"}
            >
            {
                typeof props.title === 'string'
                    ? <Typography type='paragraph-large' fontWeight='bold' text={props.title} />
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
        <div className={'vieolo-component-row-template__right-container'}>
            {props.rightSideComponent}
        </div>
    </div>
}