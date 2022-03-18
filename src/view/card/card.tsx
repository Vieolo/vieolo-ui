// React
import React from 'react';

// Material UI
import IconFour from '@mui/icons-material/DataUsage';

// Component
import Card from '../../lib/card/card';

// Types
import { ViewData } from '../main/main';
import IconButton from '../../lib/button/icon_button';

type CardPropsType = React.ComponentProps<typeof Card>;

export function cardOptions(): ViewData {

    return {
        constants: {

        } as Partial<CardPropsType>,
        variables: {
            borderRadius: 'borderRadius',
            emphasis: 'emphasis',
            color: 'colors',
            elevation: {
                options: ["0", "1", "2"],
                default: "0"
            },

        }
    }
}


export function CardCreator(props: { p: CardPropsType }) {

    return <div className="background-color--tertiary-light padding--one">
        <Card
            borderRadius={props.p.borderRadius}
            color={props.p.color}
            elevation={props.p.elevation}
            emphasis={props.p.emphasis}
            width='200px'
            height='80px'
        >
            <IconButton 
                icon={<IconFour />}
                onClick={() => {}}
            />
        </Card>
    </div>
}