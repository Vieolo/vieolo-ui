
// React
import React, { useState } from 'react';

// Vieolo UI
import StringInputSet from './string_input_set';
import { StringInputValueType } from '../types/types';

// Types
import { ViewData } from '../view/main/main';

type StringInputSetPropsType = React.ComponentProps<typeof StringInputSet>;

export function stringInputSetOptions(): ViewData {

    return {
        constants: {

        } as Partial<StringInputSetPropsType>,
        variables: {

        }
    }
}


export function StringInputSetCreator(props: { p: StringInputSetPropsType }) {

    let [value, setValue] = useState<StringInputValueType>({isValid: false, string: "", text: ""})

    return <StringInputSet
        label='String Input'
        onChange={v => setValue(v)}
        validation={{
            maxLength: 20,
            emptyMessage: "Please add a text",
            optional: false,
            regexTest: "general",
            tooLongMessage: "Oh, way too long"
        }}
        value={value}       
    />
}
