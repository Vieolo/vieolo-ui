// React
import React, { useState } from 'react';

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

    let [selected, setSelected] = useState<string>("get_started/introduciton");

    return <div className='width--px-500 max-width--vw-90'>
        <TreeList
            selectedID={selected}
            onItemSelect={(id, p) => setSelected(id)}
            items={[
                {
                    id: "get_started",
                    title: "Get Started",
                    icon: <IconOne />,
                    children: [
                        { id: "get_started/introduciton", title: "Introduction", icon: <IconThree />, selected: true },
                        { id: "get_started/team_members", title: "Team Members", children: [{ id: "get_started/add", title: "Add" }, { id: "get_started/edot", title: "Edit" }, { id: "get_started/delete", title: "Delete" }] }
                    ]
                },
                {
                    id: "what_after",
                    title: "What you can do afterwards",
                    icon: <IconTwo />,
                    children: [
                        { id: "what_after/introduction", title: "Introduction", icon: <IconThree /> },
                        { id: "what_after/lots", title: "Lots of things", children: [{ id: "what_after/introduction", title: "Like this" }, { id: "what_after/introduction", title: "or that" }, { id: "what_after/introduction", title: "Or even this" }] },
                        {
                            id: "what_after/very nested",
                            title: "Very nested", children: [
                                {
                                    id: "what_after/introduction",
                                    title: "Parent 1", children: [
                                        { id: "what_after/introduction", title: "Child 1", children: [{ id: "what_after/introduction", title: "GrandChild 1" }, { id: "what_after/introduction", title: "GrandChild 2", children: [{ id: "what_after/introduction", title: "Some other small child" }] }] }
                                    ]
                                },
                                { id: "what_after/introduction", title: "Edit" },
                                { id: "what_after/introduction", title: "Delete" }
                            ]
                        }
                    ]
                },
            ]}
        />
    </div>
}
