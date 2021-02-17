/// <reference types="react" />
export default function TimePicker(props: {
    value: string;
    onChange: (hour: number, minute: number, text: string) => void;
    label?: string;
    disabled?: boolean;
    tip?: string;
}): JSX.Element;
export declare function parseInputTimeToCustomDate(input: string): [number, number];
