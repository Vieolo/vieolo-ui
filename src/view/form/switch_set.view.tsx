// React
import React, { useState } from 'react';

// Component
import SwitchSet from '../../lib/form/switch_set';
import { TypographyCaptionLarge, TypographyParagraphMedium } from '../../lib/typography';

// Types
import { ViewData } from '../main/main';

type SwitchSetPropsType = React.ComponentProps<typeof SwitchSet>;

export function switchSetOptions(): ViewData {

    return {
        constants: {
            switchID: 'sample_id'
        } as Partial<SwitchSetPropsType>,
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


export function SwitchSetCreator(props: { p: SwitchSetPropsType }) {
    let [on, setOn] = useState<boolean>(false);

    return <SwitchSet
        on={on}
        onChange={v => setOn(v)}
        switchID={props.p.switchID}
        disabled={props.p.disabled}
        height={props.p.height}
        title={
            (props.p as any).titleType === 'string'
                ? "Switch Title"
                : <div className='flex'>
                    <TypographyParagraphMedium text='Switch Title' />
                    <div className="padding-left--half"></div>
                    <a href="/">Know More</a>
                </div>
        }
        subtitle={
            (props.p as any).withSubtitle
                ? (props.p as any).subtitleType === 'string'
                    ? "Switching this switch results in a change that no one expects"
                    : <div className='flex'>
                        <TypographyCaptionLarge text='This action is not allowed' />
                        <div className="padding-left--half"></div>
                        <a href="/">Know More</a>
                    </div>
                : null
        }
    />

}

