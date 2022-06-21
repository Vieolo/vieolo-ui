// React
import React from 'react';

// Material UI
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';

// Components
import IconButton from '../IconButton';

// Typography
import Typography from '../Typography';


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
        <Typography type='title-medium' text={backButtonText} />
    </div>
}