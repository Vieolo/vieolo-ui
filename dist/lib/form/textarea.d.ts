/// <reference types="react" />
export default function Textarea(props: {
    value: string;
    placeholder?: string;
    onChange: (v: string) => void;
    error: boolean;
    size?: 'small' | 'medium' | 'large' | 'full';
}): JSX.Element;
