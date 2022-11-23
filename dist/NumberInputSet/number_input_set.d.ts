/// <reference types="react" />
import InputSet from '../InputSet';
import { numberValidation } from '@vieolo/validation-js';
import { NumberInputValueType } from '../types/types';
type InputSetPropType = Omit<React.ComponentProps<typeof InputSet>, "onChange" | "value" | 'error'>;
type NumberValidationOptions = Omit<Parameters<typeof numberValidation>[0], "value">;
export default function NumberInputSet(props: {
    onChange: (v: NumberInputValueType) => void;
    value: NumberInputValueType;
    validation: NumberValidationOptions;
    error?: boolean | string;
} & InputSetPropType): JSX.Element;
export {};
