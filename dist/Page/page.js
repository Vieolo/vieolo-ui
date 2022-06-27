import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import SubNavbarRow from "../SubNavbarRow";
export default function Page(props) {
    return _jsxs("div", Object.assign({ className: "vieolo-page" }, { children: [props.hasSubNavbarRow &&
                _jsx(SubNavbarRow, Object.assign({}, (props.subNavbarOptions || {})), void 0),
            _jsx("div", Object.assign({ className: `vieolo-page__content ${props.className || ""}` }, { children: props.children }), void 0)] }), void 0);
}
