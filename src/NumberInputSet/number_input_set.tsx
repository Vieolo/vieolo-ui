// Vieolo UI
import InputSet from '../InputSet';

// Installed Packages
import { numberValidation } from '@vieolo/validation';

// Types
import { NumberInputValueType } from '../types/types'

type InputSetPropType = Omit<React.ComponentProps<typeof InputSet>, "onChange" | "value" | 'error'> 
type NumberValidationOptions = Omit<Parameters<typeof numberValidation>[0], "value">;

export default function NumberInputSet(props: {
    onChange: (v: NumberInputValueType) => void,
    value: NumberInputValueType,
    validation: NumberValidationOptions,
    error?: boolean | string
} & InputSetPropType) {    

    let error: boolean | string = false;

    if (props.error === true || (typeof props.error === 'string' && props.error.length > 0) || !props.value.isValid) {
        if (props.error !== undefined && typeof error === 'string') error = props.error
        else if (props.value.errorMessage && props.value.errorMessage.length > 0) error = props.value.errorMessage
        else error = true;
    }

    return <InputSet
        {...props}
        error={error}
        value={props.value.text}
        onChange={(v) => {
            let validaiton = numberValidation({...props.validation, value: v});
            props.onChange({
                isValid: validaiton.isValid,
                number: validaiton.isValid ? validaiton.value : null,
                text: v,
                errorMessage: validaiton.message
            })
        }}
    />
}