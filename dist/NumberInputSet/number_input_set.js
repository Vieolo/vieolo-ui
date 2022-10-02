import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import InputSet from '../InputSet';
// Installed Packages
import { numberValidation } from '@vieolo/validation-js';
export default function NumberInputSet(props) {
    return _jsx(InputSet, Object.assign({}, props, { error: props.error === true || !props.value[2], value: props.value[1], onChange: (v) => {
            let validaiton = numberValidation({ ...props.validation, value: v });
            props.onChange([validaiton.isValid ? validaiton.value : null, v, validaiton.isValid]);
        } }), void 0);
}
