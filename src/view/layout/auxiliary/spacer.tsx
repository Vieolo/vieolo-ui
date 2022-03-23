// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Component
import Spacer from '../../../lib/layout/auxiliary/spacer';

// Types
import { ViewData } from '../../main/main';

type SpacerPropsType = React.ComponentProps<typeof Spacer>;

export function spacerOptions(): ViewData {

    return {
        constants: {

        } as Partial<SpacerPropsType>,
        variables: {
            height: {
                options: ["none", "half", "one", "two"],
                default: "none"
            },
            width: {
                options: ["none", "half", "one", "two"],
                default: "none"
            }
        }
    }
}


export function SpacerCreator(props: {p: SpacerPropsType}) {

    return <div>
        <div className="background-color--secondary-normal height--two width--two"></div>
        <Spacer height={props.p.height} width={props.p.width} />
        <div className="background-color--secondary-normal height--two width--two"></div>
        <Spacer height={props.p.height} width={props.p.width} />
        <div className="flex">
            <div className="background-color--success-normal height--two width--two"></div>
            <Spacer height={props.p.height} width={props.p.width} />
            <div className="background-color--success-normal height--two width--two"></div>
        </div>
    </div>
}