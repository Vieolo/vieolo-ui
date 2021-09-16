// React
import React from 'react';


// Global
import BackButton from '../button/back_button';


export default function BackButtonRow(props: {
    removeBackButton?: boolean,
    icon?: React.ReactNode,
    backButtonText?: string,
    onBack?: () => void,
    actions?: any[],
    center?: React.ReactNode,
    centerLarge?: boolean
}) {
            
    let actions = props.actions || [];

    return <div className={`vieolo-back-button-row${props.centerLarge ? ' vieolo-back-button-row-center-large' : ''}`}>
        <div className="back-button-container">
            {
                !props.removeBackButton &&
                <BackButton
                    backButtonText={props.backButtonText}
                    icon={props.icon}
                    onClick={props.onBack}
                    />
            }
        </div>
        
        <div className="center-component">
            {props.center && props.center}
        </div>        

        <div className="other-button-container">
            {actions}
        </div>
    </div>
}