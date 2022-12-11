import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import FormDialog from "../FormDialog";
import Divider from "../Divider";
export default function Walkthrough(props) {
    let page = props.pages[props.currentPage];
    if (!page)
        return _jsx("div", {});
    let extraButtons = [];
    let extraButtonsLeft = [];
    if (props.currentPage !== 0 && !page.preventBack) {
        extraButtonsLeft.push({
            color: 'error',
            onClick: () => props.onBack(),
            text: props.backButtonText || 'Back',
            emphasis: 'none-background',
            startIcon: props.backButtonIcon
        });
    }
    if ((props.currentPage + 1) !== props.totalPage && !page.preventSkip) {
        extraButtons.push({
            color: 'primary',
            onClick: () => props.onSkip(),
            text: props.skipButtonText || 'Skip',
            emphasis: 'low',
            startIcon: props.skipButtonIcon
        });
    }
    // Setting the text for the `Next` button
    let saveButtonText = props.nextButtonText || "Next";
    let saveButtonIcon = props.nextButtonIcon;
    if (props.currentPage === 0 && page.index === 0) {
        saveButtonText = props.startButtonText || "Start";
        saveButtonIcon = props.startButtonIcon;
    }
    else if ((props.currentPage + 1) === props.totalPage) {
        saveButtonText = props.doneButtonText || "Done";
        saveButtonIcon = props.doneButtonIcon;
    }
    return _jsxs(FormDialog, { headerTitle: `${page.index ? page.index + ". " : ""} ${page.title}`.trim(), onCancel: props.onCancel || (() => { }), onSave: () => props.onNext(), ariaLabel: props.ariaLabel, isLoading: props.isLoading, inline: props.displayType !== 'modal', removeCancelButton: true, headerRightComponent: props.onCancel ? 'close' : undefined, className: props.className, saveButtonDisabled: props.disableNextButton, extraButtons: extraButtons, extraButtonsLeft: extraButtonsLeft, padding: 0, saveButtonConfig: {
            text: saveButtonText,
            startIcon: saveButtonIcon
        }, children: [_jsx("div", { style: { width: `${((props.currentPage + 1) / props.totalPage) * 100}%` }, children: _jsx(Divider, { direction: "horizontal", length: "pc-100", color: (props.progressBarConfig && props.progressBarConfig.color) ? props.progressBarConfig.color : 'primary', thickness: (props.progressBarConfig && props.progressBarConfig.thickness) ? props.progressBarConfig.thickness : '2', colorType: (props.progressBarConfig && props.progressBarConfig.colorType) ? props.progressBarConfig.colorType : 'normal' }) }), _jsx("div", { className: "padding--one", children: page.content })] });
}
