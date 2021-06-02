/// <reference types="react" />
export default function TimePicker(props: {
    value: string;
    onChange: (hour: number | null, minute: number | null, text: string | null) => void;
    label?: string;
    disabled?: boolean;
    tip?: string;
}): JSX.Element;
export declare function parseInputTimeToCustomDate(input: string): [number | null, number | null];
