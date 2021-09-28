// React
import React from 'react';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';

// Components
import IconButton from '../button/icon_button';
import TypographyCaptionLarge from '../typography/typography_caption_large';


export default function ItemRow(props: {
    title: string,
    subTitle?: string,
    onClick?: () => void,
    selected?: boolean,
    leadingIcon?: React.ReactNode,
    buttonIcon?: React.ReactNode,
    buttonClick?: () => void,
    buttonSize?: 'small' | 'medium',
    buttonColor?: 'primary' | 'secondary' | 'tertiary' | 'background' | 'alert' | 'error' | 'success' | 'accessory-orange' | 'accessory-blue' | 'accessory-green',
    cardStyle?: 'card-light-shadow' | 'card-dark-shadow' | 'card-no-shadow'
}) {

    let contentClassName: string = "vieolo-item-row__item-content";
    if (props.selected) contentClassName += " vieolo-item-row__item-selected";
    if (props.onClick) contentClassName += " vieolo-item-row__item-clickable";
    if (props.cardStyle) contentClassName += " " + props.cardStyle;

    if (props.leadingIcon) contentClassName += " vieolo-item-row__item-with-icon";
    else contentClassName += " vieolo-item-row__item-without-icon";

    return <div className={"vieolo-item-row"}>

        <div className={contentClassName} onClick={() => {
            if (props.onClick) props.onClick();
        }}>
            {
                props.leadingIcon &&
                <div className="vieolo-item-row__leading-icon-div">
                    {props.leadingIcon}
                </div>
            }

            <div className="vieolo-item-row__title-col">
                <TypographyParagraphMedium text={props.title} />
                {
                    props.subTitle &&
                    <TypographyCaptionLarge text={props.subTitle} showTitle />
                }
            </div>

            {
                (props.buttonClick && props.buttonIcon) &&
                <div className={`vieolo-item-row__button-col`}>
                    <IconButton
                        icon={props.buttonIcon}
                        onClick={props.buttonClick}
                        color={props.buttonColor || 'primary'}
                        size={props.buttonSize || 'small'}
                    />
                </div>
            }
        </div>

    </div>
}