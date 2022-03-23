// Types
import { ColorOptionType, WidthAndHeightSize } from "../../private/types";

export default function Divider(props: {
    direction: 'horizontal' | 'vertical',
    length: WidthAndHeightSize,
    color?: ColorOptionType,
    colorType?: 'light' | 'normal' | 'text',
    position?: 'start' | 'center' | 'end';
}) {
    // The base class
    let className = 'vieolo-divider';
    // The position class
    className += ` vieolo-divider--${props.direction} vieolo-divider--${props.position || 'start'}`
    
    let dividerClass = "";
    // The length class
    dividerClass += ` ${props.direction === 'horizontal' ? 'width' : 'height'}--${props.length}`;
    // The thickness class
    dividerClass += ` ${props.direction === 'horizontal' ? 'height' : 'widtg'}--half`;
    // The color class
    dividerClass += ` background-color--${props.color || 'primary'}-${props.colorType || 'light'}`;
    // The border radius class
    dividerClass += ` border-radius--half`;
    
    return <div className={className}>
        <div className={dividerClass}></div>
    </div>
}