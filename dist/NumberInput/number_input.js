import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import Input from '../Input';
// Installed Packages
import { numberValidation } from '@vieolo/validation-js';
export default function NumberInput(props) {
    return _jsx(Input, { ...props, error: props.error === true || !props.value[2], value: props.value[1], onChange: (v) => {
            let validaiton = numberValidation({ ...props.validation, value: v });
            props.onChange([validaiton.isValid ? validaiton.value : null, v, validaiton.isValid]);
        } });
}
