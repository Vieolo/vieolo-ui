/// <reference types="react" />
export default function SwitchSet(props: {
    title: string;
    subtitle?: string;
    on: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
    switchID: string;
}): JSX.Element;
