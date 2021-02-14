/// <reference types="react" />
export default function TimePicker(props: {
    value: string;
    onChange: (hour: number, minute: number, text: string) => void;
}): JSX.Element;
export declare function parseInputTimeToCustomDate(input: string): [number, number];
