/// <reference types="react" />
export default function TimeInput(props: {
    value: string;
    onChange: (hour: number | null, minute: number | null, text: string | null) => void;
    label?: string;
    disabled?: boolean;
    tip?: string;
    ariaLabel?: string;
    optional?: boolean;
}): JSX.Element;
export declare function parseInputTimeToCustomDate(input: string): [number | null, number | null];
