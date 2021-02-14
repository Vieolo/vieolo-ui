// React
import React from 'react';
// Components
import Input from './input';
export default function TimePicker(props) {
    return React.createElement(Input, { error: parseInputTimeToCustomDate(props.value)[0] == null, onChange: v => {
            // Preventing the user to type more than 5 characters
            if (v.length > 5)
                return;
            //  Adding ":" if the user has typed 2 characters
            if (props.value.length == 1 && v.length == 2)
                v += ":";
            // Adding ":" in between the second and third character if the third character is not ":"
            if (props.value.length == 2 && v.length == 3 && v[2] != ":")
                v = `${v[0]}${v[1]}:${v[2]}`;
            let [h, m] = parseInputTimeToCustomDate(v);
            props.onChange(h, m, v);
        }, value: props.value, placeholder: "00:00", size: "small" });
}
export function parseInputTimeToCustomDate(input) {
    if (input.length != 5)
        return [null, null];
    else if (!input.includes(':'))
        return [null, null];
    let splited = input.split(':');
    if (splited[0].length != 2 || splited[1].length != 2)
        return [null, null];
    else if (isNaN(parseInt(splited[0])) || isNaN(parseInt(splited[1])))
        return [null, null];
    let hour = parseInt(splited[0]);
    let minute = parseInt(splited[1]);
    if (hour < 0 || hour > 23)
        return [null, null];
    if (minute < 0 || minute > 59)
        return [null, null];
    return [hour, minute];
}
