import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import InputSet from '../InputSet';
// Installed Packages
import { stringValidation } from '@vieolo/validation-js';
export default function StringInputSet(props) {
    let error = false;
    if (props.error === true || (typeof props.error === 'string' && props.error.length > 0) || !props.value.isValid) {
        if (props.error !== undefined && typeof error === 'string')
            error = props.error;
        else if (props.value.errorMessage && props.value.errorMessage.length > 0)
            error = props.value.errorMessage;
        else
            error = true;
    }
    return _jsx(InputSet, { ...props, error: error, value: props.value.text, onChange: (v) => {
            let validaiton = stringValidation({ ...props.validation, value: v });
            props.onChange({
                isValid: validaiton.isValid,
                string: validaiton.isValid ? validaiton.value : null,
                text: v,
                errorMessage: validaiton.message
            });
        } });
}
