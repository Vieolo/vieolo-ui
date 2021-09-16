// React
import React from 'react';

// Material UI
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';

// Components
import IconButton from './icon_button';

// Typography
import TypographyTitleMedium from '../typography/typography_title_medium';


export default function BackButton(props: {
    icon?: React.ReactNode,
    backButtonText?: string,
    onClick?: () => void,
}) {    

    let icon = props.icon || <ArrowBackIcon />
    let backButtonText = props.backButtonText || 'Go Back';
    let onBack = props.onClick || window.history.back;

    return <div className="vieolo-back-button">
        <IconButton
            icon={icon}
            color={'primary'}
            onClick={() => {onBack();}}
            />
        <TypographyTitleMedium text={backButtonText} />
    </div>
}