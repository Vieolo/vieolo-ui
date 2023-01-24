// Types
import { ColorOptionSubType, ColorOptionType, WidthAndHeightSize } from "../types/types";

export type DividerThickness = "1" | "2" | 'half';

export default function Divider(props: {
    direction?: 'horizontal' | 'vertical',
    length?: WidthAndHeightSize,
    color?: ColorOptionType,
    colorType?: ColorOptionSubType,
    position?: 'start' | 'center' | 'end',
    thickness?: DividerThickness,
    spaceAround?: "half" | 'one' | 'two'
}) {
    // The default values
    let di = props.direction || 'horizontal';
    let pos = props.position || 'start';
    let le = props.length || 'pc-100';
    let th = props.thickness || '1'
    let co = props.color || 'primary';
    let ct = props.colorType || 'light';

    // The base class
    let className = 'vieolo-divider';
    // The position class
    className += ` vieolo-divider--${di} vieolo-divider--${pos || 'start'}`

    if (props.spaceAround) {
        className += ` padding-${di === 'horizontal' ? 'vertical' : 'horizontal'}--${props.spaceAround}`
    }
    
    let dividerClass = "";
    // The length class
    dividerClass += ` ${di === 'horizontal' ? 'width' : 'height'}--${le}`;
    // The thickness class
    dividerClass += ` vieolo-divider--thickness-${di === 'horizontal' ? 'horizontal' : 'vertical'}--${th}`;
    // The color class
    dividerClass += ` background-color--${co}-${ct}`;
    // The border radius class
    dividerClass += ` border-radius--half`;
    
    return <div className={className}>
        <div className={dividerClass}></div>
    </div>
}