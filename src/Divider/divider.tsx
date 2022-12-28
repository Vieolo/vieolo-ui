// Types
import { ColorOptionSubType, ColorOptionType, WidthAndHeightSize } from "../types/types";

export type DividerThickness = "1" | "2" | 'half';

export default function Divider(props: {
    direction: 'horizontal' | 'vertical',
    length: WidthAndHeightSize,
    color?: ColorOptionType,
    colorType?: ColorOptionSubType,
    position?: 'start' | 'center' | 'end',
    thickness?: DividerThickness,
    spaceAround?: "half" | 'one' | 'two'
}) {
    // The base class
    let className = 'vieolo-divider';
    // The position class
    className += ` vieolo-divider--${props.direction} vieolo-divider--${props.position || 'start'}`

    if (props.spaceAround) {
        className += ` padding-${props.direction === 'horizontal' ? 'vertical' : 'horizontal'}--${props.spaceAround}`
    }
    
    let dividerClass = "";
    // The length class
    dividerClass += ` ${props.direction === 'horizontal' ? 'width' : 'height'}--${props.length}`;
    // The thickness class
    dividerClass += ` vieolo-divider--thickness-${props.direction === 'horizontal' ? 'horizontal' : 'vertical'}--${props.thickness || 'half'}`;
    // The color class
    dividerClass += ` background-color--${props.color || 'primary'}-${props.colorType || 'light'}`;
    // The border radius class
    dividerClass += ` border-radius--half`;
    
    return <div className={className}>
        <div className={dividerClass}></div>
    </div>
}