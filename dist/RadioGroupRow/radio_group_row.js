import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import RadioGroup from '../RadioGroup';
//Private
import SetRowTemplate from '../private/ComponentRowTemplate';
export default function RadioGroupRow(props) {
    return _jsx(SetRowTemplate, { title: props.title, subtitle: props.subtitle, handleKeyboardNav: false, className: "vieolo-radio-group-row", height: props.height, disabled: props.disabled, rightSideComponent: _jsx(RadioGroup, { value: props.value, options: props.options, onOptionChange: props.onOptionChange, disabled: props.disabled, direction: "horizontal", horizontalButtonPadding: props.horizontalButtonPadding }) });
}
