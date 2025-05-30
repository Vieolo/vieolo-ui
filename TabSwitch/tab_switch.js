import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function TabSwitch(props) {
    let left = 0;
    let anchors = [];
    props.options.forEach((o, i) => {
        if (o.value === props.value)
            left = i * (props.tabWidth || 140);
        anchors.push(
        // eslint-disable-next-line
        _jsx("a", { className: o.value === props.value ? 'vieolo-tab-switch__tab-nav--active' : '', onClick: () => {
                props.onSelect(o.value);
            }, style: { width: props.tabWidth || 140 }, "aria-label": `${o.title} tab`, children: o.title }, o.value));
    });
    return _jsx("div", { className: `vieolo-tab-switch margin-vertical--${(props.verticalMargin || 10).toString()}`, children: _jsxs("nav", { className: "vieolo-tab-switch__tab-nav", children: [_jsx("div", { className: `vieolo-tab-switch__selector border-radius--${props.borderRadius || 'half'}`, style: { "left": left.toString() + "px", "width": `${props.tabWidth || 140}px` } }), anchors] }) });
}
