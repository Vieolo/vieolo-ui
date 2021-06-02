// React
import React from 'react';


// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyCaptionMedium from '../typography/typography_caption_medium';


// Components
import IconButton from '../button/icon_button';


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

    let className: string = "vieolo-item-row";
    if (props.cardStyle) className += " " + props.cardStyle;


    let contentClassName: string = "item-content";
    if (props.selected) contentClassName += " item-selected";
    if (props.onClick) contentClassName += " item-clickable";

    if (props.leadingIcon) contentClassName += " item-with-icon";
    else contentClassName += " item-without-icon";

    return <div className={className}>

        <div className={contentClassName} onClick={() => {
            if (props.onClick) props.onClick();
        }}>
            {
                props.leadingIcon &&
                props.leadingIcon
            }

            <div className="title-col">
                <TypographyParagraphMedium text={props.title} />
                {
                    props.subTitle &&
                    <TypographyCaptionMedium text={props.subTitle} showTitle />
                }
            </div>

            {
                (props.buttonClick && props.buttonIcon) &&
                <div className="button-col">
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