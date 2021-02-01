// React
import React from 'react';
export default function Switch(props) {
    return React.createElement("div", { className: `vieolo-switch${props.disabled ? ' disabled' : ''}` },
        React.createElement("input", { id: props.switchID, type: "checkbox", name: "set-name", className: "switch-input", checked: props.on, readOnly: true }),
        React.createElement("label", { htmlFor: props.switchID, className: "switch-label", onClick: () => { props.onChange(!props.on); } },
            React.createElement("span", { className: "switch-on" }),
            React.createElement("span", { className: "switch-off" })));
}
