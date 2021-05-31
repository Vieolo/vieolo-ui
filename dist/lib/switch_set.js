import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Switch from './switch';
export default function SwitchSet(props) {
    return _jsxs("div", Object.assign({ className: `vieolo-switch-set${props.disabled ? ' disabled' : ''}` }, { children: [_jsxs("div", Object.assign({ className: "title-container", onClick: () => props.onChange(!props.on) }, { children: [_jsx("p", Object.assign({ className: "title" }, { children: props.title }), void 0),
                    props.subtitle &&
                        _jsx("p", Object.assign({ className: "subtitle" }, { children: props.subtitle }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "switch-container" }, { children: _jsx(Switch, { on: props.on, onChange: v => { props.onChange(!props.on); }, switchID: props.switchID, disabled: props.disabled }, void 0) }), void 0)] }), void 0);
}
