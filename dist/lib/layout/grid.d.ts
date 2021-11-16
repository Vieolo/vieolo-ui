/// <reference types="react" />
export default function Grid(props: {
    className?: string;
    columnGap?: 'half' | 'one' | 'two';
    rowGap?: 'half' | 'one' | 'two';
    /**
     * Sets the columns of the grid for some of the most used formats
     * Passing this value will cause the component to ignore `templateColumn`
     */
    preDefined?: 'one-one' | 'one-one-two' | 'two-one-one' | 'one-one-one-one' | 'three-one' | 'one-three';
    templateColumn?: string;
    templateRow?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode[];
}): JSX.Element;
