// Vieolo UI
import Input from '../Input';

// Installed Packages
import { stringValidation } from '@vieolo/validation';

// Types
import { StringInputValueType } from '../types/types'

type InputSetPropType = Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> 
type StringValidationOptions = Omit<Parameters<typeof stringValidation>[0], "value">;


export default function StringInput(props: {
    onChange: (v: StringInputValueType) => void,
    value: StringInputValueType,
    validation: StringValidationOptions
} & InputSetPropType) {    

    return <Input
        {...props}
        error={props.error === true || !props.value.isValid}
        value={props.value.text}
        onChange={(v) => {
            let validaiton = stringValidation({...props.validation, value: v});
            props.onChange({
                isValid: validaiton.isValid,
                string: validaiton.isValid ? validaiton.value : null,
                text: v,
                errorMessage: validaiton.message
            });
        }}
    />
}