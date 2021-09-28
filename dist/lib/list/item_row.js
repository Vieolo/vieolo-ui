import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
// Components
import IconButton from '../button/icon_button';
import TypographyCaptionLarge from '../typography/typography_caption_large';
export default function ItemRow(props) {
    let contentClassName = "vieolo-item-row__item-content";
    if (props.selected)
        contentClassName += " vieolo-item-row__item-selected";
    if (props.onClick)
        contentClassName += " vieolo-item-row__item-clickable";
    if (props.cardStyle)
        contentClassName += " " + props.cardStyle;
    if (props.leadingIcon)
        contentClassName += " vieolo-item-row__item-with-icon";
    else
        contentClassName += " vieolo-item-row__item-without-icon";
    return _jsx("div", Object.assign({ className: "vieolo-item-row" }, { children: _jsxs("div", Object.assign({ className: contentClassName, onClick: () => {
                if (props.onClick)
                    props.onClick();
            } }, { children: [props.leadingIcon &&
                    _jsx("div", Object.assign({ className: "vieolo-item-row__leading-icon-div" }, { children: props.leadingIcon }), void 0),
                _jsxs("div", Object.assign({ className: "vieolo-item-row__title-col" }, { children: [_jsx(TypographyParagraphMedium, { text: props.title }, void 0),
                        props.subTitle &&
                            _jsx(TypographyCaptionLarge, { text: props.subTitle, showTitle: true }, void 0)] }), void 0),
                (props.buttonClick && props.buttonIcon) &&
                    _jsx("div", Object.assign({ className: `vieolo-item-row__button-col` }, { children: _jsx(IconButton, { icon: props.buttonIcon, onClick: props.buttonClick, color: props.buttonColor || 'primary', size: props.buttonSize || 'small' }, void 0) }), void 0)] }), void 0) }), void 0);
}
