/// <reference types="react" />
export default function Checkbox(props: {
    value: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
    ariaLabel?: string;
}): JSX.Element;
