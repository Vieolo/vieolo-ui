/// <reference types="react" />
/**
 * @deprecated Use the `InputSet` component instead
 */
export default function TextareaSet(props: {
    label: string;
    placeholder?: string;
    tip?: string;
    error: boolean;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large' | 'full';
}): JSX.Element;
