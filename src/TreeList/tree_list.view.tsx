// React
import React from 'react';

// Vieolo UI
import TreeList from './tree_list';

import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';

// Types
import { ViewData } from '../view/main/main';

type TreeListPropsType = React.ComponentProps<typeof TreeList>;

export function treeListOptions(): ViewData {

    return {
        constants: {

        } as Partial<TreeListPropsType>,
        variables: {

        }
    }
}


export function TreeListCreator(props: { p: TreeListPropsType }) {

    return <div className='width--px-500 max-width--vw-90'>
        <TreeList
            items={[
                {
                    title: "Get Started",
                    icon: <IconOne />,
                    children: [
                        { title: "Introduction", icon: <IconThree /> },
                        { title: "Team Members", children: [{ title: "Add" }, { title: "Edit" }, { title: "Delete" }] }
                    ]
                },
                {
                    title: "What you can do afterwards",
                    icon: <IconTwo />,
                    children: [
                        { title: "Introduction", icon: <IconThree /> },
                        { title: "Lots of things", children: [{ title: "Like this" }, { title: "or that" }, { title: "Or even this" }] },
                        {
                            title: "Very nested", children: [
                                {
                                    title: "Parent 1", children: [
                                        { title: "Child 1", children: [{ title: "GrandChild 1" }, { title: "GrandChild 2", children: [{ title: "Some other small child" }] }] }
                                    ]
                                },
                                { title: "Edit" },
                                { title: "Delete" }
                            ]
                        }
                    ]
                },
            ]}
        />
    </div>
}
