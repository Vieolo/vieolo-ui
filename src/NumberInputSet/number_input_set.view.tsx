// React
import React, { useState } from 'react';

// Vieolo UI
import NumberInputSet from '../../src/NumberInputSet';
import { NumberInputValueType } from '../types/types';

// Types
import { ViewData } from '../view/main/main';

type NumberInputSetPropsType = React.ComponentProps<typeof NumberInputSet>;

export function numberInputOptions(): ViewData {

    return {
        constants: {

        } as Partial<NumberInputSetPropsType>,
        variables: {

        }
    }
}


export function NumberInputSetCreator(props: {p: NumberInputSetPropsType}) {

    let [value, setValue] = useState<NumberInputValueType>({
        isValid: true,
        number: 0,
        text: "0",        
    })

    return <NumberInputSet
        label='Label'
        onChange={v => setValue(v)}
        validation={{
            allowFloat: true,
            decimalPlaceCount: 2,
            max: 100,
            min: 0,
            optional: true,
            tooLargeMessage: "Oops, Too large!"
        }}
        value={value}
    />
}