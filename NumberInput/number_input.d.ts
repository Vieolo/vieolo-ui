/// <reference types="react" />
import Input from '../Input';
import { numberValidation } from '@vieolo/validation';
import { NumberInputValueType } from '../types/types';
type InputSetPropType = Omit<React.ComponentProps<typeof Input>, "onChange" | "value">;
type NumberValidationOptions = Omit<Parameters<typeof numberValidation>[0], "value">;
export default function NumberInput(props: {
    onChange: (v: NumberInputValueType) => void;
    value: NumberInputValueType;
    validation: NumberValidationOptions;
} & InputSetPropType): JSX.Element;
export {};
