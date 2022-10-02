// Vieolo UI
import InputSet from '../InputSet';

// Installed Packages
import { numberValidation } from '@vieolo/validation-js';

type InputSetPropType = Omit<React.ComponentProps<typeof InputSet>, "onChange" | "value"> 
type NumberValidationOptions = Omit<Parameters<typeof numberValidation>[0], "value">;

export default function NumberInputSet(props: {
    onChange: (v: [number | null, string, boolean]) => void,
    value: [number | null, string, boolean],
    validation: NumberValidationOptions
} & InputSetPropType) {    

    return <InputSet
        {...props}
        error={props.error === true || !props.value[2]}
        value={props.value[1]}
        onChange={(v) => {
            let validaiton = numberValidation({...props.validation, value: v});
            props.onChange([validaiton.isValid ? validaiton.value : null, v, validaiton.isValid]);
        }}
    />
}