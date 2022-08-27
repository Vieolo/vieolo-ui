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

        }
    }
}


export function SubDashboardCreator(props: { p: SubDashboardPropsType }) {

    let [selected, setSelected] = useState<string>("");

    return <SubDashboard
        items={["First", "Second", "Third"].map(z => {
            return {
                id: z,
                selected: selected === z,
                title: z,
                onClick: () => {
                    setSelected(z)
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
    >
        {
            selected &&
            <Typography text={selected} />
        }
    </SubDashboard>
}