/// <reference types="react" />
import Input from '../Input';
import { stringValidation } from '@vieolo/validation';
import { StringInputValueType } from '../types/types';
type InputSetPropType = Omit<React.ComponentProps<typeof Input>, "onChange" | "value">;
type StringValidationOptions = Omit<Parameters<typeof stringValidation>[0], "value">;
export default function StringInput(props: {
    onChange: (v: StringInputValueType) => void;
    value: StringInputValueType;
    validation: StringValidationOptions;
} & InputSetPropType): JSX.Element;
export {};
