import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import SubNavbarRow from "../SubNavbarRow";
export default function Page(props) {
    return _jsxs("div", { className: "vieolo-page", children: [props.hasSubNavbarRow &&
                _jsx(SubNavbarRow, { ...(props.subNavbarOptions || {}) }), _jsx("div", { className: `vieolo-page__content ${props.className || ""}`, children: props.children })] });
}
