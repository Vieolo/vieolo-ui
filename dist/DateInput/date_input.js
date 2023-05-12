import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import InputSet from "../InputSet/input_set";
// "@vieolo/vieolo-ui/dist/date_picker"
// Installed Packages
import VDate from "@vieolo/vdate";
import { dateDDMMYYYY } from '@vieolo/regex-library';
export default function DateInput(props) {
    return _jsx(InputSet, { label: props.label || '', ariaLabel: props.ariaLabel || props.label, disabled: props.disabled, tip: props.tip, autoFocus: props.autoFocus, error: parseInputDateToVDate(props.value) === null, onKeyDown: props.onKeyDown, onChange: v => {
            // Preventing the user to type more than 10 characters
            if (v.length > 10)
                return;
            if (v.length > 0 && v[v.length - 1] !== '/' && isNaN(+v[v.length - 1]))
                return;
            if (v[v.length - 1] === '/' && [1, 2, 4, 5, 7, 8, 9, 10].includes(v.length))
                return;
            //  Adding "/" if the user has typed 2 characters
            if (props.value.length === 1 && v.length === 2)
                v += "/";
            //  Adding "/" if the user has typed 5 characters
            if (props.value.length === 4 && v.length === 5)
                v += "/";
            // Adding "/" in between the second and third character if the third character is not "/"
            if (props.value.length === 2 && v.length === 3 && v[2] !== "/")
                v = `${v[0]}${v[1]}/${v[2]}`;
            // Adding "/" in between the fifth and sixth character if the sixth character is not "/"
            if (props.value.length === 5 && v.length === 6 && v[5] !== "/")
                v = `${v.substring(0, 5)}/${v[5]}`;
            // Preventing the user to enter more than two "/"
            if (props.value.length === 3 && v.length === 4 && v[2] === "/" && v[3] === "/")
                return;
            if (props.value.length === 6 && v.length === 7 && v[5] === "/" && v[6] === "/")
                return;
            let d = parseInputDateToVDate(v);
            props.onChange(d, v);
        }, value: props.value, placeholder: props.dateFormat, size: "small" });
}
// TODO: Add support for different types of date format
export function parseInputDateToVDate(input) {
    if (!dateDDMMYYYY.test(input))
        return null;
    let d = new VDate(input.split('/').reverse().join("-"));
    if (isNaN(d.getTime()))
        return null;
    return d;
}
