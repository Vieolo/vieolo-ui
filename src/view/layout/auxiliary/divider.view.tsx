// React
import React from 'react';

// Component
import Divider from '../../../Divider'

// Types
import { ViewData } from '../../main/main';

type DividerPropsType = React.ComponentProps<typeof Divider>;

export function dividerOptions(): ViewData {

    return {
        constants: {

        } as Partial<DividerPropsType>,
        variables: {
            direction: {
                options: ["horizontal", "vertical"],
                default: 'horizontal'
            },
            length: {
                options: ["px-100", "pc-50", "pc-100", "one", "two"],
                default: "px-100"
            },
            color: 'colors',
            colorType: {
                options: ["normal", "light", "text"],
                default: "light"
            },
            position: {
                options: ["start", "center", "end"],
                default: "start"
            },
            thickness: {
                options: ["1", "2", "half"],
                default: "1"
            }
        }
    }
}


export function DividerCreator(props: {p: DividerPropsType}) {

    return <div className="height--vh-50 width--vw-50 background-color--tertiary-light">
        <Divider
            direction={props.p.direction}
            length={props.p.length}
            color={props.p.color}
            colorType={props.p.colorType}
            position={props.p.position}
            thickness={props.p.thickness}
        />
    </div>
}