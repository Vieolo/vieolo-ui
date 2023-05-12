/// <reference types="react" />
import VDate from "@vieolo/vdate";
export default function DateInput(props: {
    value: string;
    onChange: (date: VDate | null, text: string) => void;
    label?: string;
    disabled?: boolean;
    tip?: string;
    ariaLabel?: string;
    autoFocus?: boolean;
    dateFormat: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}): JSX.Element;
export declare function parseInputDateToVDate(input: string): VDate | null;
