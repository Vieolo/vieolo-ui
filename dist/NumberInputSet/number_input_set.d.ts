/// <reference types="react" />
import InputSet from '../InputSet';
import { numberValidation } from '@vieolo/validation-js';
declare type InputSetPropType = Omit<React.ComponentProps<typeof InputSet>, "onChange" | "value">;
declare type NumberValidationOptions = Omit<Parameters<typeof numberValidation>[0], "value">;
export default function NumberInputSet(props: {
    onChange: (v: [number | null, string, boolean]) => void;
    value: [number | null, string, boolean];
    validation: NumberValidationOptions;
} & InputSetPropType): JSX.Element;
export {};
