import { jsx as _jsx } from "react/jsx-runtime";
export default function Divider(props) {
    // The base class
    let className = 'vieolo-divider';
    // The position class
    className += ` vieolo-divider--${props.direction} vieolo-divider--${props.position || 'start'}`;
    let dividerClass = "";
    // The length class
    dividerClass += ` ${props.direction === 'horizontal' ? 'width' : 'height'}--${props.length}`;
    // The thickness class
    dividerClass += ` ${props.direction === 'horizontal' ? 'height' : 'widtg'}--half`;
    // The color class
    dividerClass += ` background-color--${props.color || 'primary'}-${props.colorType || 'light'}`;
    // The border radius class
    dividerClass += ` border-radius--half`;
    return _jsx("div", Object.assign({ className: className }, { children: _jsx("div", { className: dividerClass }, void 0) }), void 0);
}
