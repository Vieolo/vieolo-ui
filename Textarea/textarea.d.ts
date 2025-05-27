/// <reference types="react" />
/**
 * @deprecated Use the `Input` component instead
 */
export default function Textarea(props: {
    value: string;
    placeholder?: string;
    onChange: (v: string) => void;
    error: boolean;
    size?: 'small' | 'medium' | 'large' | 'full';
    ariaLabel?: string;
}): JSX.Element;
