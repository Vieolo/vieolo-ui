// Vieolo UI
import Input from '../Input';

// Installed Packages
import { numberValidation } from '@vieolo/validation-js';

type InputSetPropType = Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> 
type NumberValidationOptions = Omit<Parameters<typeof numberValidation>[0], "value">;

export default function NumberInput(props: {
    onChange: (v: [number | null, string, boolean]) => void,
    value: [number | null, string, boolean],
    validation: NumberValidationOptions
} & InputSetPropType) {    

    return <Input
        {...props}
        error={props.error === true || !props.value[2]}
        value={props.value[1]}
        onChange={(v) => {
            let validaiton = numberValidation({...props.validation, value: v});
            props.onChange([validaiton.isValid ? validaiton.value : null, v, validaiton.isValid]);
        }}
    />
}