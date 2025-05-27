import { jsx as _jsx } from "react/jsx-runtime";
export default function Spacer(props) {
    return _jsx("div", { className: `vieolo-spacer height--${props.height || 'none'} width--${props.width || 'none'}` });
}
