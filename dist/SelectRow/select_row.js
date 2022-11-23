import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import Select from '../Select';
// Private
import ComponentRowTemplate from '../private/ComponentRowTemplate';
export default function SelectRow(props) {
    return _jsx(ComponentRowTemplate, { title: props.rowTitle, subtitle: props.rowSubtitle, disabled: props.disabled, handleKeyboardNav: false, className: "vieolo-select-set", height: props.height, rightSideComponent: _jsx(Select, { ...props }) });
}
