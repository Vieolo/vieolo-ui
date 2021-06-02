import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyCaptionMedium from '../typography/typography_caption_medium';
// Components
import IconButton from '../button/icon_button';
export default function ItemRow(props) {
    let contentClassName = "item-content";
    if (props.selected)
        contentClassName += " item-selected";
    if (props.onClick)
        contentClassName += " item-clickable";
    if (props.cardStyle)
        contentClassName += " " + props.cardStyle;
    if (props.leadingIcon)
        contentClassName += " item-with-icon";
    else
        contentClassName += " item-without-icon";
    return _jsx("div", Object.assign({ className: "vieolo-item-row" }, { children: _jsxs("div", Object.assign({ className: contentClassName, onClick: () => {
                if (props.onClick)
                    props.onClick();
            } }, { children: [props.leadingIcon &&
                    props.leadingIcon,
                _jsxs("div", Object.assign({ className: "title-col" }, { children: [_jsx(TypographyParagraphMedium, { text: props.title }, void 0),
                        props.subTitle &&
                            _jsx(TypographyCaptionMedium, { text: props.subTitle, showTitle: true }, void 0)] }), void 0),
                (props.buttonClick && props.buttonIcon) &&
                    _jsx("div", Object.assign({ className: "button-col" }, { children: _jsx(IconButton, { icon: props.buttonIcon, onClick: props.buttonClick, color: props.buttonColor || 'primary', size: props.buttonSize || 'small' }, void 0) }), void 0)] }), void 0) }), void 0);
}
