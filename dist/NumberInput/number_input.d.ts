/// <reference types="react" />
import Input from '../Input';
import { numberValidation } from '@vieolo/validation-js';
type InputSetPropType = Omit<React.ComponentProps<typeof Input>, "onChange" | "value">;
type NumberValidationOptions = Omit<Parameters<typeof numberValidation>[0], "value">;
export default function NumberInput(props: {
    onChange: (v: [number | null, string, boolean]) => void;
    value: [number | null, string, boolean];
    validation: NumberValidationOptions;
} & InputSetPropType): JSX.Element;
export {};
