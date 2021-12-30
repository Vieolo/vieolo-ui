/// <reference types="react" />
export default function Input(props: {
    value: string;
    placeholder?: string;
    onChange: (v: string) => void;
    error: boolean;
    size?: 'small' | 'medium' | 'large' | 'full';
    type?: 'text' | 'number' | 'password';
    disabled?: boolean;
}): JSX.Element;
