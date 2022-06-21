/// <reference types="react" />
export declare type RadioButtonType = {
    id: string;
    /** If passing a component, do not add an on click functionality as it is handled by the Radio Button */
    button: string | React.ReactNode;
};
export default function RadioGroup(props: {
    value: string;
    options: RadioButtonType[];
    onOptionChange: (o: string) => void;
    direction?: 'vertical' | 'horizontal';
    /** Defaults to 10px */
    horizontalButtonPadding?: number;
}): JSX.Element;
