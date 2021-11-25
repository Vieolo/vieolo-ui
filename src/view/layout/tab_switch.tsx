// React
import React, { useState } from 'react';

// Component
import TabSwitch from '../../lib/layout/tab_switch';
import Select from '../../lib/form/select';

type TabSwitchPropsType = React.ComponentProps<typeof TabSwitch>;

export function tabSwitchOptions(): { [key: string]: TabSwitchPropsType } {

    let items: { value: string, title: string }[] = [
        { title: "One", value: "One" },
        { title: "Two", value: "Two" },
        { title: "Three", value: "Three" },
    ];

    let baseProps: TabSwitchPropsType = {
        onSelect: () => { },
        options: items,
        value: "One",
    }

    return {
        "basic": {
            ...baseProps
        },
    }
}


export function TabSwitchCreator(props: { p: TabSwitchPropsType }) {

    let [tab, setTab] = useState<string>("One");
    let [borderRadius, setBorderRadius] = useState<string>(null);
    let [tabWidth, setTabWidth] = useState<string>("140");

    return <div className="grid-two-column">
        <div>
            <Select
                error={false}
                items={(['full', 'normal', 'half', 'none']).map(c => {
                    return {
                        title: c,
                        value: c
                    }
                })}
                onSelect={v => setBorderRadius(v[0] as any)}
                selectedItems={[borderRadius]}
                title={"Border Radius"}
            />

            <div className="padding--one"></div>

            <Select
                error={false}
                items={(['140', '100', '80', '200']).map(c => {
                    return {
                        title: c,
                        value: c
                    }
                })}
                onSelect={v => setTabWidth(v[0] as any)}
                selectedItems={[tabWidth]}
                title={"Tab Width"}
            />
        </div>

        <div>
            <TabSwitch
                onSelect={v => setTab(v)}
                options={props.p.options}
                value={tab}
                verticalMargin={props.p.verticalMargin}
                borderRadius={borderRadius as any}
                tabWidth={parseInt(tabWidth)}
            />
        </div>
    </div>

}

