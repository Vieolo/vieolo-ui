// React
import React, { useState } from 'react';

// Component
import TabSwitch from '../../lib/layout/tab_switch';

type TabSwitchPropsType = React.ComponentProps<typeof TabSwitch>;

export function tabSwitchOptions(): { [key: string]: TabSwitchPropsType } {

    let items: {value: string, title: string}[] = [
        {title: "One", value: "One"},
        {title: "Two", value: "Two"},
        {title: "Three", value: "Three"},
    ];

    let baseProps: TabSwitchPropsType = {
        onSelect: () => {},
        options: items,
        value: "One",        
    }

    return {
        "basic": {
            ...baseProps
        },
    }
}


export function TabSwitchCreator(props: {p: TabSwitchPropsType}) {

    let [tab, setTab] = useState<string>("One");

    return <TabSwitch
        onSelect={v => setTab(v)}
        options={props.p.options}
        value={tab}
        verticalMargin={props.p.verticalMargin}
    />

}

