import { jsx as _jsx } from "react/jsx-runtime";
// Utils and logics
import { getEmphasisClasses } from '../utility/style_utility';
export default function Card(props) {
    let em = props.emphasis || 'none';
    let el = props.elevation || "0";
    let br = props.borderRadius || 'default';
    let co = props.color || 'primary';
    let className = `vieolo-card`;
    className += getEmphasisClasses(em, co, { removeTextColorClasses: true });
    className += ` vieolo-card--border-radius-${br}`;
    className += ` elevation--${el}`;
    className += ` padding--${props.padding || 'one'}`;
    let style = {};
    if (props.height)
        style.height = props.height;
    if (props.width)
        style.width = props.width;
    return _jsx("div", Object.assign({ className: className, style: style }, { children: props.children }), void 0);
}
