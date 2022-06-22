import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import RadioGroup from '../RadioGroup';
//Private
import SetRowTemplate from '../private/SetRowTemplate';
export default function RadioGroupSet(props) {
    return _jsx(SetRowTemplate, { title: props.title, subtitle: props.subtitle, handleKeyboardNav: false, className: "vieolo-radio-group-set", height: props.height, disabled: props.disabled, rightSideComponent: _jsx(RadioGroup, { value: props.value, options: props.options, onOptionChange: props.onOptionChange, disabled: props.disabled, direction: "horizontal", horizontalButtonPadding: props.horizontalButtonPadding }, void 0) }, void 0);
}
