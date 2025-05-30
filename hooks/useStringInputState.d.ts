/// <reference types="react" />
import type { StringInputValueType } from "../types";
import { stringValidation } from "@vieolo/validation";
type StringValidationOptions = Omit<Parameters<typeof stringValidation>[0], "value">;
/**
 * Creates an state for the string input value type. It takes the validation arguments, checks the validitiy of the initial string and returns the states along with the validation.
 *
 * @example
 * ```
 * let [name, setName, nameValidation] = useStringInputState({maxLength: 100, optional: true}, "")
 * ```
 * @param validation The validation arguments
 * @param initialText The initial text. Pass an empty string if there is no initial text
 * @returns It returns [`value`, `setValue`, `validation`]. The first two values are the standard values of the `useState` with the type of `StringInputValueType` and the
 * the third value is the validation arguments passed to the function.
 */
export declare function useStringInputState(validation: StringValidationOptions, initialText?: string): [StringInputValueType, React.Dispatch<React.SetStateAction<StringInputValueType>>, StringValidationOptions];
export {};
