/// <reference types="react" />
export default function Switch(props: {
    switchID: string;
    on: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
}): JSX.Element;
