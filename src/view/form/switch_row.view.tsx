// React
import React, { useState } from 'react';

// Vieolo UI
import SwitchRow from '../../SwitchRow';
import Typography from '../../Typography';

// Types
import { ViewData } from '../main/main';

type SwitchRowPropsType = React.ComponentProps<typeof SwitchRow>;

export function switchRowOptions(): ViewData {

    return {
        constants: {
            switchID: 'sample_id'
        } as Partial<SwitchRowPropsType>,
        variables: {
            disabled: {
                options: [false, true],
                default: false,
            },
            withSubtitle: {
                options: [true, false],
                default: false
            },
            titleType: {
                options: ['string', 'component'],
                default: 'string'
            },
            subtitleType: {
                options: ['string', 'component'],
                default: 'string'
            },
            height: {
                options: ["small", "medium", "large", "over", "default"],
                default: "default"
            }
        }
    }

}


export function SwitchRowCreator(props: { p: SwitchRowPropsType }) {
    let [on, setOn] = useState<boolean>(false);

    return <SwitchRow
        on={on}
        onChange={v => setOn(v)}
        switchID={props.p.switchID}
        disabled={props.p.disabled}
        height={props.p.height}
        title={
            (props.p as any).titleType === 'string'
                ? "Switch Title"
                : <div className='flex'>
                    <Typography text='Switch Title' />
                    <div className="padding-left--half"></div>
                    <a href="/">Know More</a>
                </div>
        }
        subtitle={
            (props.p as any).withSubtitle
                ? (props.p as any).subtitleType === 'string'
                    ? "Switching this switch results in a change that no one expects"
                    : <div className='flex'>
                        <Typography type='caption-large' text='This action is not allowed' />
                        <div className="padding-left--half"></div>
                        <a href="/">Know More</a>
                    </div>
                : null
        }
    />

}

