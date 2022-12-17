// React
import React from 'react';

// Types
import { ColorOptionType, FontWeightType, TypographyOptionTypes } from '../types/types';


export type TypographyTextAlign = "left" | "center" | "right" | "justify";
export type TypographyFontFamily = "primary" | "secondary";
export type TypographyMargin = "0" | "5" | "10" | "20" | "half" | "one" | "two";
export type TypographyColorType = 'normal' | 'text' | 'light' | 'text-light';

export type TypographyStyle = {
    /** default: paragraph-medium */
    type?: TypographyOptionTypes,
    color?: ColorOptionType,
    colorType?: TypographyColorType,
    margin?: TypographyMargin,
    fontWeight?: FontWeightType,
    fontFamily?: TypographyFontFamily,
    textAlign?: TypographyTextAlign,
}


export default function Typography(props: {
    className?: string,
    text: string,
    showTitle?: boolean,
    dataTestID?: string,
    ariaLabel?: string,        
    style?: React.CSSProperties,    
    nonselectable?: boolean,
    /** This is the title that appears natively by the browser when the user hovers over the text */
    hoverTitle?: string,
    lg?: TypographyStyle,
    md?: TypographyStyle,
    sm?: TypographyStyle,
} & TypographyStyle) {

    function getClassName(size?: "xl" | "lg" | "md" | "sm") {
        let targetStyle: TypographyStyle = (!size || size === 'xl') ? {
            color: props.color,
            colorType: props.colorType,
            fontFamily: props.fontFamily,
            fontWeight: props.fontWeight,
            margin: props.margin,
            textAlign: props.textAlign,
            type: props.type
        } : props[size] || {}
        
        let finalType = targetStyle.type || 'paragraph-medium';
        let finalClassName = `typography-${finalType} `;    
        finalClassName += `color--${targetStyle.color || (finalType.includes("caption") ? 'gray' : 'default')}-${targetStyle.colorType || 'normal'} `;
        finalClassName += `margin-vertical--${targetStyle.margin || "0"} `;
        finalClassName += `font-weight--${targetStyle.fontWeight || (finalType.includes("title") ? 'bold' : 'normal')} `;
        finalClassName += `font-family--${targetStyle.fontFamily || 'primary'} `;
        if (targetStyle.textAlign) finalClassName += `text-align--${targetStyle.textAlign} `;

        if (size) {
            finalClassName = finalClassName.trim().split(" ").map(z => `${z}--${size}`).join(" ")
        }

        return finalClassName
    }

    let xlClass = getClassName()
    let lgClass = props.lg ? getClassName('lg') : " "
    let mdClass = props.md ? getClassName('md') : " "
    let smClass = props.sm ? getClassName('sm') : " "    

    let finalC = xlClass + lgClass + mdClass + smClass

    if (props.className) finalC += `${props.className} `
    if (props.nonselectable) finalC += `nonselectable `    

    return <p
        className={finalC.trim()}
        title={props.showTitle ? (props.hoverTitle || props.text) : ""}
        aria-label={props.ariaLabel}
        data-testid={props.dataTestID}
        style={props.style}
    >
        {props.text}
    </p>
}