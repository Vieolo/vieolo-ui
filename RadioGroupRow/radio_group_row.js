import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import RadioGroup from '../RadioGroup';
//Private
import ComponentRowTemplate from '../private/ComponentRowTemplate';
export default function RadioGroupRow(props) {
    return _jsx(ComponentRowTemplate, { title: props.title, responsive: props.responsive, subtitle: props.subtitle, handleKeyboardNav: false, className: "vieolo-radio-group-row", height: props.height, disabled: props.disabled, rightSideComponent: _jsx(RadioGroup, { ...props, direction: "horizontal" }) });
}
