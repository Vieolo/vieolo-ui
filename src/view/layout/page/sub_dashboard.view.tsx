// React
import React, { useState } from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
// import IconTwo from '@mui/icons-material/Backup';
// import IconThree from '@mui/icons-material/Cake';
// import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import SubDashboard from '../../../SubDashboard';

// Types
import { ViewData } from '../../main/main';
import Typography from '../../../Typography';

type SubDashboardPropsType = React.ComponentProps<typeof SubDashboard>;

export function subDashboardOptions(): ViewData {

    return {
        constants: {

        } as Partial<SubDashboardPropsType>,
        variables: {
            withListOptions: 'boolean'
        }
    }
}


export function SubDashboardCreator(props: { p: SubDashboardPropsType }) {

    let [selected, setSelected] = useState<string>("");

    return <SubDashboard
        items={[{title: "First"}, {title: "Second"}, {title: "Third"}, {title: "one", group: "Fourth"}, {title: "two", group: "Fourth"}].map(z => {
            return {
                id: z.title,
                selected: selected === z.title,
                title: z.title,
                group: z.group,
                onClick: () => {
                    setSelected(z.title)
                },
            }
        })}
        emptyIcon={<IconOne />}
        emptyText={"Please select one of the items"}
        handleSubPageInURL
        subNavbarOptions={{
            backButtonText: "Go Back",
            onBack: () => {}
        }}
        itemListOptions={!(props.p as any).withListOptions ? undefined : {
            title: "Pages",
            controlItemBorderRadius: true,
            rowGap:"none"
        }}
    >
        {
            selected &&
            <Typography text={selected} />
        }
    </SubDashboard>
}