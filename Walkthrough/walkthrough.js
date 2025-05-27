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
            ...(props.backButtonConfig || {}),
            color: (props.backButtonConfig && props.backButtonConfig.color) ? props.backButtonConfig.color : 'error',
            onClick: () => props.onBack(),
            text: (props.backButtonConfig && props.backButtonConfig.text) ? props.backButtonConfig.text : "Back",
            emphasis: (props.backButtonConfig && props.backButtonConfig.emphasis) ? props.backButtonConfig.emphasis : 'none-background',
            startIcon: (props.backButtonConfig && props.backButtonConfig.startIcon) ? props.backButtonConfig.startIcon : undefined
        });
    }
    if ((props.currentPage + 1) !== props.totalPage && !page.preventSkip) {
        extraButtons.push({
            ...(props.skipButtonConfig || {}),
            color: (props.skipButtonConfig && props.skipButtonConfig.color) ? props.skipButtonConfig.color : 'primary',
            onClick: () => props.onSkip(),
            text: (props.skipButtonConfig && props.skipButtonConfig.text) ? props.skipButtonConfig.text : "Skip",
            emphasis: (props.skipButtonConfig && props.skipButtonConfig.emphasis) ? props.skipButtonConfig.emphasis : 'low',
            startIcon: (props.skipButtonConfig && props.skipButtonConfig.startIcon) ? props.skipButtonConfig.startIcon : undefined
        });
    }
    // Setting the text for the `Next` button
    let saveButtonConfig = props.nextButtonConfig || {};
    let saveButtonText = saveButtonConfig.text || "Next";
    if (props.currentPage === 0 && page.index === 0) {
        saveButtonConfig = props.startButtonConfig || {};
        saveButtonText = saveButtonConfig.text || "Start";
    }
    else if ((props.currentPage + 1) === props.totalPage) {
        saveButtonConfig = props.doneButtonConfig || {};
        saveButtonText = saveButtonConfig.text || "Done";
    }
    let saveButtonIcon = saveButtonConfig.startIcon;
    return _jsxs(FormDialog, { headerTitle: `${page.index ? page.index + ". " : ""} ${page.title}`.trim(), onCancel: props.onCancel || (() => { }), onSave: () => props.onNext(), ariaLabel: props.ariaLabel, isLoading: props.isLoading, inline: props.displayType !== 'modal', removeCancelButton: true, headerRightComponent: props.onCancel ? 'close' : undefined, className: props.className, saveButtonDisabled: props.disableNextButton, extraButtons: extraButtons, extraButtonsLeft: extraButtonsLeft, padding: 0, saveButtonConfig: {
            ...saveButtonConfig,
            text: saveButtonText,
            startIcon: saveButtonIcon
        }, children: [_jsx("div", { style: { width: `${((props.currentPage + 1) / props.totalPage) * 100}%` }, children: _jsx(Divider, { direction: "horizontal", length: "pc-100", color: (props.progressBarConfig && props.progressBarConfig.color) ? props.progressBarConfig.color : 'primary', thickness: (props.progressBarConfig && props.progressBarConfig.thickness) ? props.progressBarConfig.thickness : '2', colorType: (props.progressBarConfig && props.progressBarConfig.colorType) ? props.progressBarConfig.colorType : 'normal' }) }), _jsx("div", { className: "padding--one", children: page.content })] });
}
