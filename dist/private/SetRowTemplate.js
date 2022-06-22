import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Typography from '../Typography';
import { handleOnKeyDown } from '../utility/onkeydown_utility';
export default function SetRowTemplate(props) {
    let c = `vieolo-set-row-template`;
    if (props.height && props.height !== 'default') {
        c += ` row-height--${props.height}`;
    }
    else {
        c += " vieolo-set-row-template--height-default";
    }
    if (props.onRowClick)
        c += " vieolo-set-row-template--clickable";
    if (props.className)
        c += ` ${props.className}`;
    if (props.disabled)
        c += " disabled";
    return _jsxs("div", Object.assign({ className: c, tabIndex: props.handleKeyboardNav ? 0 : undefined, onKeyDown: e => {
            if (!props.handleKeyboardNav || !props.onRowClick)
                return;
            handleOnKeyDown(e, {
                onEnter: () => {
                    if (props.onRowClick)
                        props.onRowClick();
                }
            });
        } }, { children: [_jsxs("div", Object.assign({ className: "vieolo-set-row-template__title-container", onClick: () => {
                    if (props.onRowClick)
                        props.onRowClick();
                } }, { children: [typeof props.title === 'string'
                        ? _jsx(Typography, { type: 'paragraph-large', text: props.title }, void 0)
                        : _jsx(_Fragment, { children: props.title }, void 0),
                    props.subtitle &&
                        _jsx(_Fragment, { children: typeof props.subtitle === 'string'
                                ? _jsx(Typography, { type: 'caption-large', text: props.subtitle }, void 0)
                                : _jsx(_Fragment, { children: props.subtitle }, void 0) }, void 0)] }), void 0),
            _jsx("div", Object.assign({ className: 'vieolo-set-row-template__right-container' }, { children: props.rightSideComponent }), void 0)] }), void 0);
}
