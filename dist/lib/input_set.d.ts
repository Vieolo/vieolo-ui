/// <reference types="react" />
export default function TextareaSet(props: {
    label: string;
    placeholder?: string;
    tip?: string;
    error: boolean;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large' | 'full';
    type?: 'text' | 'number' | 'password';
}): JSX.Element;
