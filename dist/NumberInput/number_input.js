import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import Input from '../Input';
// Installed Packages
import { numberValidation } from '@vieolo/validation-js';
export default function NumberInput(props) {
    return _jsx(Input, { ...props, error: props.error === true || !props.value.isValid, value: props.value.text, onChange: (v) => {
            let validaiton = numberValidation({ ...props.validation, value: v });
            props.onChange({
                isValid: validaiton.isValid,
                number: validaiton.isValid ? validaiton.value : null,
                text: v,
                errorMessage: validaiton.message
            });
        } });
}
