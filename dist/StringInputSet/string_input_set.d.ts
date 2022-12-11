/// <reference types="react" />
import InputSet from '../InputSet';
import { stringValidation } from '@vieolo/validation-js';
import { StringInputValueType } from '../types/types';
type InputSetPropType = Omit<React.ComponentProps<typeof InputSet>, "onChange" | "value" | 'error'>;
type StringValidationOptions = Omit<Parameters<typeof stringValidation>[0], "value">;
export default function StringInputSet(props: {
    onChange: (v: StringInputValueType) => void;
    value: StringInputValueType;
    validation: StringValidationOptions;
    error?: boolean | string;
} & InputSetPropType): JSX.Element;
export {};
