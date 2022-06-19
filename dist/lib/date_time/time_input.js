import { jsx as _jsx } from "react/jsx-runtime";
// Components
import InputSet from '../form/input_set';
export default function TimeInput(props) {
    return _jsx(InputSet, { label: props.label || '', ariaLabel: props.ariaLabel || props.label, disabled: props.disabled, tip: props.tip, error: parseInputTimeToCustomDate(props.value)[0] === null, onChange: v => {
            // Preventing the user to type more than 5 characters
            if (v.length > 5)
                return;
            //  Adding ":" if the user has typed 2 characters
            if (props.value.length === 1 && v.length === 2)
                v += ":";
            // Adding ":" in between the second and third character if the third character is not ":"
            if (props.value.length === 2 && v.length === 3 && v[2] !== ":")
                v = `${v[0]}${v[1]}:${v[2]}`;
            // Preventing the user to enter more than one ":"
            if (props.value.length === 3 && v.length === 4 && v[2] === ":" && v[3] === ":")
                return;
            let [h, m] = parseInputTimeToCustomDate(v);
            props.onChange(h, m, v);
        }, value: props.value, placeholder: "00:00", size: "small" }, void 0);
}
export function parseInputTimeToCustomDate(input) {
    if (input.length !== 5)
        return [null, null];
    else if (!input.includes(':'))
        return [null, null];
    let splited = input.split(':');
    let numberRegex = /[0-9]{2}/u;
    if (splited[0].length !== 2 || splited[1].length !== 2)
        return [null, null];
    else if (isNaN(parseInt(splited[0])) || isNaN(parseInt(splited[1])))
        return [null, null];
    else if (!numberRegex.test(splited[0]) || !numberRegex.test(splited[1]))
        return [null, null];
    let hour = parseInt(splited[0]);
    let minute = parseInt(splited[1]);
    if (hour < 0 || hour > 23)
        return [null, null];
    if (minute < 0 || minute > 59)
        return [null, null];
    return [hour, minute];
}
