// Vieolo UI
import Input from '../Input';

// Installed Packages
import { numberValidation } from '@vieolo/validation-js';

// Types
import { NumberInputValueType } from '../types/types'

type InputSetPropType = Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> 
type NumberValidationOptions = Omit<Parameters<typeof numberValidation>[0], "value">;


export default function NumberInput(props: {
    onChange: (v: NumberInputValueType) => void,
    value: NumberInputValueType,
    validation: NumberValidationOptions
} & InputSetPropType) {    

    return <Input
        {...props}
        error={props.error === true || !props.value.isValid}
        value={props.value.text}
        onChange={(v) => {
            let validaiton = numberValidation({...props.validation, value: v});
            props.onChange({
                isValid: validaiton.isValid,
                number: validaiton.isValid ? validaiton.value : null,
                text: v,
                errorMessage: validaiton.message
            });
        }}
    />
}