// React
import React from 'react';


// Components
import Input from './input';


export default function TimePicker(props: { 
    value: string,
    onChange: (hour: number, minute: number, text: string) => void
}): JSX.Element {

    return <Input 
        error={parseInputTimeToCustomDate(props.value)[0] == null}
        onChange={v => {
            if (v.length > 5) return;
            let [h, m] = parseInputTimeToCustomDate(v);
            props.onChange(h, m, v);
        }}
        value={props.value}
        placeholder="00:00"
        size="small"
    />

}


export function parseInputTimeToCustomDate(input: string) : [number, number] {
	if (input.length != 5) return [null, null];
	else if (!input.includes(':')) return [null, null];

	let splited = input.split(':');

	if (splited[0].length != 2 || splited[1].length != 2) return [null, null];
	else if (isNaN(parseInt(splited[0])) || isNaN(parseInt(splited[1]))) return [null, null];
	
	let hour = parseInt(splited[0]);
	let minute = parseInt(splited[1]);

	if (hour < 0 || hour > 23) return [null, null];
	if (minute < 0 || minute > 59) return [null, null];

	return [hour, minute]

}
