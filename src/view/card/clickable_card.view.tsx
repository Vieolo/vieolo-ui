// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/ArrowRight';

// Component
import ClickableCard from '../../ClickableCard';

// Types
import { ViewData } from '../main/main';

type ClickableCardPropsType = React.ComponentProps<typeof ClickableCard>;

export function clickableCardOptions(): ViewData {

    return {
        constants: {

        } as Partial<ClickableCardPropsType>,
        variables: {
            withIcon: 'boolean',
            withDescription: 'boolean',
            withRightItems: 'boolean',
            keepEmphasisTextColorClasses: 'boolean',
            descriptionTypography: 'typographyOptions',
            borderRadius: 'borderRadius',
            emphasis: 'emphasis',
            color: 'colorsOptional',
        }
    }
}


export function ClickableCardCreator(props: {p: ClickableCardPropsType}) {

    return <ClickableCard
        onClick={() => {}}
        title="Start a new Project"
        ariaLabel='start project'
        emphasis={props.p.emphasis}
        borderRadius={props.p.borderRadius}
        color={props.p.color}
        keepEmphasisTextColorClasses={props.p.keepEmphasisTextColorClasses}
        description={!(props.p as any).withDescription ? undefined : {
            text: "A new project allows you to organize your tasks in a much more managable and production environment",
            typographyType: (props.p as any).descriptionTypography
        }}
        icon={(props.p as any).withIcon ? <IconOne /> : undefined}
        width={'250px'}
        rightItems={!(props.p as any).withRightItems ? undefined : [
            <IconTwo />
        ]}
    />
}