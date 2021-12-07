// React
import React, { useState } from 'react';

// Component
import TabSwitch from '../../lib/layout/tab_switch';

// Types
import { ViewData } from '../main/main';

type TabSwitchPropsType = React.ComponentProps<typeof TabSwitch>;

export function tabSwitchOptions(): ViewData {

    return {
        constants: {
            options: [
                { title: "One", value: "One" },
                { title: "Two", value: "Two" },
                { title: "Three", value: "Three" },
            ]
        } as Partial<TabSwitchPropsType>,
        variables: {
            borderRadius: {
                options: ['full', 'normal', 'half', 'none'],
                default: ""
            },
            tabWidth: {
                options: ['140', '100', '80', '200'],
                default: 140,
                type: 'number'
            }
        }
    }
}


export function TabSwitchCreator(props: { p: TabSwitchPropsType }) {

    let [tab, setTab] = useState<string>("One");

    return <TabSwitch
        onSelect={v => setTab(v)}
        options={props.p.options}
        value={tab}
        verticalMargin={props.p.verticalMargin}
        borderRadius={props.p.borderRadius}
        tabWidth={props.p.tabWidth}
    />

}

