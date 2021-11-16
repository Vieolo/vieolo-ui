// React
import React, { useState } from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
// import IconTwo from '@mui/icons-material/Backup';
// import IconThree from '@mui/icons-material/Cake';
// import IconFour from '@mui/icons-material/DataUsage';

// Component
import IconButton from '../../lib/button/icon_button';
import Select from '../../lib/form/select';

// Types
import { ColorOptionType } from '../../lib/private/types';

type IconButtonPropsType = React.ComponentProps<typeof IconButton>;

export function iconButtonOptions(): { [key: string]: IconButtonPropsType } {

    let baseProps: IconButtonPropsType = {
        icon: <IconOne />,
        onClick: () => alert("Clicked"),
        color: 'primary',
        size: 'medium',
    }

    return {
        "Base": {
            ...baseProps
        }
    }
}


export function IconButtonCreator(props: { p: IconButtonPropsType }) {

    let [color, setColor] = useState<ColorOptionType>('primary');
    let [emphasis, setEmphasis] = useState<string>('none');
    let [size, setSize] = useState<string>('medium');
    let [borderRadius, setBorderRadius] = useState<string>('default');

    return <div className="grid-two-column">
        <div>
            <Select
                error={false}
                items={(['primary', 'secondary', 'tertiary', 'error', 'success', 'alert', 'accessory-blue', 'accessory-green', 'accessory-orange'] as ColorOptionType[]).map(c => {
                    return {
                        title: c,
                        value: c
                    }
                })}
                onSelect={v => setColor(v[0] as any)}
                selectedItems={[color]}
                title={"Color"}
            />

            <br />
            <br />

            <Select
                error={false}
                items={(['high', 'medium', 'low', 'none']).map(c => {
                    return {
                        title: c,
                        value: c
                    }
                })}
                onSelect={v => setEmphasis(v[0] as any)}
                selectedItems={[emphasis]}
                title={"Emphasis"}
            />

            <br />
            <br />

            <Select
                error={false}
                items={(['medium', 'small']).map(c => {
                    return {
                        title: c,
                        value: c
                    }
                })}
                onSelect={v => setSize(v[0] as any)}
                selectedItems={[size]}
                title={"Size"}
            />            

            <br />
            <br />

            <Select
                error={false}
                items={(['default', 'full', 'normal', 'half', 'none']).map(c => {
                    return {
                        title: c,
                        value: c
                    }
                })}
                onSelect={v => setBorderRadius(v[0] as any)}
                selectedItems={[borderRadius]}
                title={"Border Radius"}
            />
        </div>
        <div>
            <IconButton
                icon={props.p.icon}
                onClick={props.p.onClick}
                className={props.p.className}
                color={color}
                disabled={props.p.disabled}
                size={size as any}
                borderRadius={borderRadius as any}
                emphasis={emphasis as any}
                tooltip={props.p.tooltip}
                tooltipPosition={props.p.tooltipPosition}
            />
        </div>
    </div>

}

