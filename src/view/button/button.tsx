// React
import React, { useState } from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
// import IconTwo from '@mui/icons-material/Backup';
// import IconThree from '@mui/icons-material/Cake';
// import IconFour from '@mui/icons-material/DataUsage';

// Component
import Button from '../../lib/button/button';
import Select from '../../lib/form/select';

// Types
import { ColorOptionType } from '../../lib/private/types';

type ButtonPropsType = React.ComponentProps<typeof Button>;

export function buttonOptions(): { [key: string]: ButtonPropsType } {

    let baseProps: ButtonPropsType = {
        onClick: () => alert("Clicked"),
        color: 'primary',
        text: "Button"
    }

    return {
        "Base": {
            ...baseProps
        },
    }
}


export function ButtonCreator(props: { p: ButtonPropsType }) {

    let [color, setColor] = useState<ColorOptionType>('primary');
    let [emphasis, setEmphasis] = useState<string>('high');
    let [height, setHeight] = useState<string>('medium');
    let [width, setWidth] = useState<string>('content');
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
                items={(['large', 'medium', 'small']).map(c => {
                    return {
                        title: c,
                        value: c
                    }
                })}
                onSelect={v => setHeight(v[0] as any)}
                selectedItems={[height]}
                title={"Height"}
            />

            <br />
            <br />

            <Select
                error={false}
                items={(['content', 'full']).map(c => {
                    return {
                        title: c,
                        value: c
                    }
                })}
                onSelect={v => setWidth(v[0] as any)}
                selectedItems={[width]}
                title={"Width"}
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
            <Button
                onClick={props.p.onClick}
                className={props.p.className}
                color={color}
                disabled={props.p.disabled}
                text={props.p.text}
                borderRadius={borderRadius as any}
                emphasis={emphasis as any}
                endIcon={props.p.endIcon}
                fontSize={props.p.fontSize}
                height={height as any}
                startIcon={props.p.startIcon}
                style={props.p.style}
                toLowerCase={props.p.toLowerCase}
                type={props.p.type}
                width={width as any}
            />
        </div>
    </div>

}

