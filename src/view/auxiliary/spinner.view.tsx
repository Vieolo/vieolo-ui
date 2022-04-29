// React
import React from 'react';

// Component
import Spinner from '../../lib/auxiliary/spinner';

// Types
import { ViewData } from '../main/main';

type SpinnerPropsType = React.ComponentProps<typeof Spinner>;

export function spinnerOptions(): ViewData {

    return {
        constants: {

        } as Partial<SpinnerPropsType>,
        variables: {
            color: 'colors',
            size: {
                options: ["extra-small", "small", "medium", "large"],
                default: 'medium'
            }
        }
    }
}


export function SpinnerCreator(props: {p: SpinnerPropsType}) {

    return <Spinner
        color={props.p.color}
        size={props.p.size}
    />
}