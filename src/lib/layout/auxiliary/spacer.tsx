export type SpacerSizeType = "none" | "half" | 'one' | 'two';

export default function Spacer(props: {
    height?: SpacerSizeType,
    width?: SpacerSizeType
}) {
    return <div className={`vieolo-spacer height--${props.height || 'none'} width--${props.width || 'none'}`}></div>
}