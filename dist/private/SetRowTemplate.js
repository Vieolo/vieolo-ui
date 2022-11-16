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
    return _jsxs("div", { className: c, tabIndex: props.handleKeyboardNav ? 0 : undefined, onKeyDown: e => {
            e.stopPropagation();
            if (!props.handleKeyboardNav || !props.onRowClick)
                return;
            handleOnKeyDown(e, {
                onEnter: () => {
                    if (props.onRowClick)
                        props.onRowClick();
                }
            });
        }, children: [_jsxs("div", { className: "vieolo-set-row-template__title-container", onClick: e => {
                    e.stopPropagation();
                    if (props.onRowClick)
                        props.onRowClick();
                }, children: [typeof props.title === 'string'
                        ? _jsx(Typography, { type: 'paragraph-large', text: props.title })
                        : _jsx(_Fragment, { children: props.title }), props.subtitle &&
                        _jsx(_Fragment, { children: typeof props.subtitle === 'string'
                                ? _jsx(Typography, { type: 'caption-large', text: props.subtitle })
                                : _jsx(_Fragment, { children: props.subtitle }) })] }), _jsx("div", { className: 'vieolo-set-row-template__right-container', children: props.rightSideComponent })] });
}
