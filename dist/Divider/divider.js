import { jsx as _jsx } from "react/jsx-runtime";
export default function Divider(props) {
    // The base class
    let className = 'vieolo-divider';
    // The position class
    className += ` vieolo-divider--${props.direction} vieolo-divider--${props.position || 'start'}`;
    if (props.spaceAround) {
        className += ` padding-${props.direction === 'horizontal' ? 'vertical' : 'horizontal'}--${props.spaceAround}`;
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
    return _jsx("div", Object.assign({ className: className }, { children: _jsx("div", { className: dividerClass }, void 0) }), void 0);
}
