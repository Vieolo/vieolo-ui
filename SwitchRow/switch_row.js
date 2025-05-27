import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import Switch from '../Switch';
// Private
import SetRowTemplate from '../private/ComponentRowTemplate';
export default function SwitchRow(props) {
    function handleChange() {
        props.onChange(!props.on);
    }
    return _jsx(SetRowTemplate, { title: props.title, subtitle: props.subtitle, disabled: props.disabled, height: props.height, className: "vieolo-switch-set", handleKeyboardNav: true, onRowClick: handleChange, rightSideComponent: _jsx(Switch, { on: props.on, onChange: () => { }, switchID: props.switchID, disabled: props.disabled, ariaLabel: `${(props.ariaLabel || props.title)} switch`, dataTestID: props.dataTestID }) });
}
