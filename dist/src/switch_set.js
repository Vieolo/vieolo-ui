// React
import React from 'react';
// Vieolo UI
import Switch from './switch';
export default function SwitchSet(props) {
    return React.createElement("div", { className: `vieolo-switch-set${props.disabled ? ' disabled' : ''}` },
        React.createElement("div", { className: "title-container", onClick: () => props.onChange(!props.on) },
            React.createElement("p", { className: "title" }, props.title),
            props.subtitle &&
                React.createElement("p", { className: "subtitle" }, props.subtitle)),
        React.createElement("div", { className: "switch-container" },
            React.createElement(Switch, { on: props.on, onChange: v => { props.onChange(!props.on); }, switchID: props.switchID, disabled: props.disabled })));
}
