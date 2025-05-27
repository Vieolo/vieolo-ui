/// <reference types="react" />
export type SpacerSizeType = "none" | "half" | 'one' | 'two';
export default function Spacer(props: {
    height?: SpacerSizeType;
    width?: SpacerSizeType;
}): JSX.Element;
