// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Component
import Typography from '../../lib/typography/typography_base';

// Types
import { ViewData } from '../main/main';

type TypographyPropsType = React.ComponentProps<typeof Typography>;

export function typographyOptions(): ViewData {

    return {
        constants: {

        } as Partial<TypographyPropsType>,
        variables: {
            showTitle: 'booleanTrueDefault',
            type: {
                default: 'typography-paragraph-medium',
                options: [
                    'typography-caption-small',
                    'typography-caption-medium',
                    'typography-caption-large',
                    'typography-paragraph-small',
                    'typography-paragraph-medium',
                    'typography-paragraph-large',
                    'typography-title-small',
                    'typography-title-medium',
                    'typography-title-large'
                ]
            }
        }
    }
}


export function TypographyCreator(props: {p: TypographyPropsType}) {

    return <Typography
        className={(props.p as any).type}
        text='Sample Text'
        showTitle={props.p.showTitle}
    />
}