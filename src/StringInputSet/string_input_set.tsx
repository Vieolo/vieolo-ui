// Vieolo UI
import InputSet from '../InputSet';

// Installed Packages
import { stringValidation } from '@vieolo/validation';

// Types
import { StringInputValueType } from '../types/types'

type InputSetPropType = Omit<React.ComponentProps<typeof InputSet>, "onChange" | "value" | 'error'> 
type StringValidationOptions = Omit<Parameters<typeof stringValidation>[0], "value">;

export default function StringInputSet(props: {
    onChange: (v: StringInputValueType) => void,
    value: StringInputValueType,
    validation: StringValidationOptions,
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
            let validaiton = stringValidation({...props.validation, value: v});
            props.onChange({
                isValid: validaiton.isValid,
                string: validaiton.isValid ? validaiton.value : null,
                text: v,
                errorMessage: validaiton.message
            })
        }}
    />
}