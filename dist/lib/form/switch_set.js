import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Switch from './switch';
// Typography
import TypographyParagraphLarge from '../typography/typography_paragraph_large';
import TypographyCaptionLarge from '../typography/typography_caption_large';
export default function SwitchSet(props) {
    return _jsxs("div", Object.assign({ className: `vieolo-switch-set${props.disabled ? ' disabled' : ''}`, tabIndex: 0, onKeyDown: e => {
            if (["Enter", "Space"].includes(e.code)) {
                props.onChange(!props.on);
            }
        } }, { children: [_jsxs("div", Object.assign({ className: "vieolo-switch-set__title-container", onClick: () => props.onChange(!props.on) }, { children: [_jsx(TypographyParagraphLarge, { text: props.title }, void 0),
                    props.subtitle &&
                        _jsx(TypographyCaptionLarge, { text: props.subtitle }, void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "vieolo-switch-set__switch-container" }, { children: _jsx(Switch, { on: props.on, onChange: v => { props.onChange(!props.on); }, switchID: props.switchID, disabled: props.disabled }, void 0) }), void 0)] }), void 0);
}
