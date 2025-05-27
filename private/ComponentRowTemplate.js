import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Typography from '../Typography';
import { handleOnKeyDown } from '../utility/onkeydown_utility';
export default function ComponentRowTemplate(props) {
    let c = `vieolo-component-row-template`;
    if (props.height && props.height !== 'default') {
        c += ` row-height--${props.height}`;
    }
    else {
        c += " vieolo-component-row-template--height-default";
    }
    if (props.responsive) {
        let resB = 'sm';
        if (props.responsive !== true && props.responsive !== 'sm') {
            resB = props.responsive;
        }
        c += ` vieolo-component-row-template--responsive-${resB}`;
    }
    if (props.onRowClick)
        c += " vieolo-component-row-template--clickable";
    if (props.className)
        c += ` ${props.className}`;
    if (props.disabled)
        c += " disabled";
    return _jsxs("div", { className: c, tabIndex: props.handleKeyboardNav ? 0 : undefined, onClick: e => {
            e.stopPropagation();
            if (props.onRowClick)
                props.onRowClick();
        }, onKeyDown: e => {
            e.stopPropagation();
            if (!props.handleKeyboardNav || !props.onRowClick)
                return;
            handleOnKeyDown(e, {
                onEnter: () => {
                    if (props.onRowClick)
                        props.onRowClick();
                }
            });
        }, children: [_jsxs("div", { className: "vieolo-component-row-template__title-container", children: [typeof props.title === 'string'
                        ? _jsx(Typography, { type: 'paragraph-large', fontWeight: 'bold', text: props.title })
                        : _jsx(_Fragment, { children: props.title }), props.subtitle &&
                        _jsx(_Fragment, { children: typeof props.subtitle === 'string'
                                ? _jsx(Typography, { type: 'caption-large', text: props.subtitle })
                                : _jsx(_Fragment, { children: props.subtitle }) })] }), _jsx("div", { className: 'vieolo-component-row-template__right-container', children: props.rightSideComponent })] });
}
