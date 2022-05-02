import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Switch from './switch';
import Typography from '../typography/typography';
export default function SwitchSet(props) {
    let c = `vieolo-switch-set`;
    if (props.height && props.height !== 'default') {
        c += ` row-height--${props.height}`;
    }
    else {
        c += " vieolo-switch-set--height-default";
    }
    if (props.disabled)
        c += " disabled";
    return _jsxs("div", Object.assign({ className: c, tabIndex: 0, onKeyDown: e => {
            if (["Enter", "Space"].includes(e.code) && !props.disabled) {
                props.onChange(!props.on);
            }
        } }, { children: [_jsxs("div", Object.assign({ className: "vieolo-switch-set__title-container", onClick: () => props.onChange(!props.on) }, { children: [typeof props.title === 'string'
                        ? _jsx(Typography, { type: 'paragraph-large', text: props.title }, void 0)
                        : _jsx(_Fragment, { children: props.title }, void 0),
                    props.subtitle &&
                        _jsx(_Fragment, { children: typeof props.subtitle === 'string'
                                ? _jsx(Typography, { type: 'caption-large', text: props.subtitle }, void 0)
                                : _jsx(_Fragment, { children: props.subtitle }, void 0) }, void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "vieolo-switch-set__switch-container" }, { children: _jsx(Switch, { on: props.on, onChange: v => { props.onChange(!props.on); }, switchID: props.switchID, disabled: props.disabled }, void 0) }), void 0)] }), void 0);
}
