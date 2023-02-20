// React
import { useState } from "react";
// Installed Packages
import { numberValidation } from "@vieolo/validation-js";
/**
 * Creates an state for the number input value type. It takes the validation arguments, checks the validitiy of the initial number (in string format) and returns the states along with the validation.
 *
 * @example
 * ```
 * let [age, setAge, ageValidation] = useNumberInputState({min: 18, max: 80, allowFloat: false, decimalPlaceCount: 0}, "22")
 * ```
 * @param validation The validation arguments
 * @param initialText The initial text. Pass an empty string if there is no initial text
 * @returns It returns [`value`, `setValue`, `validation`]. The first two values are the standard values of the `useState` with the type of `NumberInputValueType` and the
 * the third value is the validation arguments passed to the function.
 */
export function useNumberInputState(validation, initialText) {
    let [n, setN] = useState({
        number: +(initialText || '0'),
        text: initialText || '',
        isValid: numberValidation({ ...validation, value: initialText || '' }).isValid
    });
    return [n, setN, validation];
}
