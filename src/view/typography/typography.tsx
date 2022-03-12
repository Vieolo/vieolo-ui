// React
import React from 'react';

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
            },
            showTitle: 'booleanTrueDefault',
            color: 'colorsOptional',
            margin: {
                default: '0',
                options: ["0", "5", "10", "20", "half", "one", "two"]
            },
            fontWeight: 'fontWeightOptional'
        }
    }
}


export function TypographyCreator(props: { p: TypographyPropsType }) {

    return <Typography
        className={(props.p as any).type}
        text='Sample Text'
        showTitle={props.p.showTitle}
        color={props.p.color}
        margin={props.p.margin}
        fontWeight={props.p.fontWeight}
    />
}