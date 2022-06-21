// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';

// Component
import TitlePeriodCard from '../../TitlePeriodCard';

// Types
import { ViewData } from '../main/main';

type TitlePeriodCardPropsType = React.ComponentProps<typeof TitlePeriodCard>;

export function titlePeriodCardOptions(): ViewData {

    return {
        constants: {

        } as Partial<TitlePeriodCardPropsType>,
        variables: {
            emphasis: {
                options: ["none", "low"],
                default: "none",
            },
            color: 'colors',
            expandable: 'booleanTrueDefault',
            withDescription: 'booleanTrueDefault',
            withActions: 'boolean',
            excludeLastDay: 'boolean'
        }
    }
}


export function TitlePeriodCardCreator(props: { p: TitlePeriodCardPropsType }) {

    return <div className="width--pc-50">
        <TitlePeriodCard
            start={"2020-10-10"}
            end={"2020-10-24"}
            title={"Employee Leave"}
            dateDisplayFormat="dd/mm/yyyy"
            emphasis={props.p.emphasis}
            color={props.p.color}
            excludeLastDay={props.p.excludeLastDay}
            elevation={"1"} // To detect the outline of the card better
            description={!(props.p as any).withDescription ? '' : "Some description to be shown here! Some description to be shown here! Some description to be shown here! Some description to be shown here! Some description to be shown here! Some description to be shown here! Some description to be shown here! Some description to be shown here!"}
            initialState={(props.p as any).expandable ? "expanded" : undefined}
            actions={!(props.p as any).withActions ? undefined : [
                { id: "one", onClick: () => { }, icon: <IconOne />, color: 'secondary' },
                { id: "two", onClick: () => { }, icon: <IconTwo />, color: 'accessory-orange' },
            ]}
        />
    </div>
}