// React
import React from 'react';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';

// Components
import IconButton from '../button/icon_button';
import TypographyCaptionLarge from '../typography/typography_caption_large';

// Material UI
import CloseIcon from '@mui/icons-material/CloseRounded';

// Types
import { BorderRadiusType, ColorOptionType, ElevationType, EmphasisType } from '../private/types';
import { getEmphasisClasses } from '../utility/style_utility';


export type ItemStyleType = {
    elevation?: ElevationType,
    emphasis?: "none" | "low",
    borderRadius?: BorderRadiusType,
    color?: ColorOptionType,
}


export default function ItemRow(props: {
    title?: string,
    subTitle?: string,
    onClick?: () => void,
    selected?: boolean,
    leadingIcon?: React.ReactNode,
    buttonIcon?: React.ReactNode,
    buttonClick?: () => void,
    buttonSize?: 'small' | 'medium',
    buttonColor?: ColorOptionType,
    itemStyle?: ItemStyleType,
    disabled?: boolean,
    searchRow?: {
        query: string,
        onQueryChange: (c: string) => void
    }
}) {

    let color = (props.itemStyle || {color: undefined}).color || 'secondary';
    let borderRadius = ` vieolo-item-row--border-radius-${(props.itemStyle && props.itemStyle.borderRadius) ? props.itemStyle.borderRadius : 'default'}`;

    let contentClassName: string = "vieolo-item-row__item-content";
    contentClassName += borderRadius;
    if (props.onClick) contentClassName += " cursor--pointer";
    
    if (props.leadingIcon) contentClassName += " vieolo-item-row__item-with-icon";
    else contentClassName += " vieolo-item-row__item-without-icon";
    
    let e: EmphasisType = props.selected ? "high" : (props.itemStyle || {emphasis: undefined}).emphasis || "low";
    
    contentClassName += getEmphasisClasses(e, color, {
        hasRipple: props.onClick !== undefined,
        hoverable: props.onClick !== undefined,
        removeTextColorClasses: true
    })
    
    let mainClassName = `vieolo-item-row elevation--${(props.itemStyle || {elevation: undefined}).elevation || '0'}`;
    mainClassName += borderRadius;

    if (props.disabled) mainClassName += ` disabled`;

    return <div className={mainClassName}>

        <div className={contentClassName} onClick={() => {
            if (props.onClick) props.onClick();
        }}>

            {
                props.leadingIcon &&
                <div className="vieolo-item-row__leading-icon-div">
                    {props.leadingIcon}
                </div>
            }

            {
                props.searchRow
                    ? <input
                        value={props.searchRow.query}
                        onChange={e => props.searchRow?.onQueryChange(e.target.value)}
                        placeholder={props.title || "Search..."}
                    />
                    : <div className="vieolo-item-row__title-col">
                        <TypographyParagraphMedium text={props.title || ''} fontWeight={'bold'} color={props.selected ? color : undefined } colorType={props.selected ? 'text' : undefined} />
                        {
                            props.subTitle &&
                            <TypographyCaptionLarge text={props.subTitle} showTitle color={props.selected ? color : undefined } colorType={props.selected ? 'text' : undefined} />
                        }
                    </div>

            }

            {
                (props.buttonClick && props.buttonIcon)
                    ? <div className={`vieolo-item-row__button-col`}>
                        <IconButton
                            icon={props.buttonIcon}
                            onClick={props.buttonClick}
                            color={props.buttonColor || 'primary'}
                            size={props.buttonSize || 'small'}
                        />
                    </div>
                    : (props.searchRow && props.searchRow.query.trim()) &&
                    <div className="vieolo-item-row__button-col">
                        <IconButton
                            icon={<CloseIcon />}
                            onClick={() => props.searchRow!.onQueryChange('')}
                            color={'error'}
                            size={'small'}
                        />
                    </div>
            }
        </div>

    </div>
}