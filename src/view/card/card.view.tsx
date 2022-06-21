// React
import React from 'react';

// Material UI
import IconFour from '@mui/icons-material/DataUsage';

// Component
import Card from '../../Card';

// Types
import { ViewData } from '../main/main';
import IconButton from '../../IconButton';

type CardPropsType = React.ComponentProps<typeof Card>;

export function cardOptions(): ViewData {

    return {
        constants: {

        } as Partial<CardPropsType>,
        variables: {
            isClickable: 'boolean',
            borderRadius: 'borderRadius',
            emphasis: 'emphasis',
            color: 'colors',
            padding: {
                options: ["none", 'half', 'one'],
                default: 'none'
            },
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
            padding={props.p.padding}
            onClick={(props.p as any).isClickable ? () => {} : undefined}
        >
            <IconButton 
                icon={<IconFour />}
                onClick={e => e.stopPropagation()}
            />
        </Card>
    </div>
}