// React
import React from 'react';

// Type
import { BorderRadiusType, ColorOptionType, EmphasisType } from '../private/types';




export default function IconButton(props: {
	color?: ColorOptionType,
	className?: string,
	disabled?: boolean,
	/** default: medium */
	size?: 'small' | 'medium',
	/** default: none */
	emphasis?: EmphasisType
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	icon: React.ReactNode,
	tooltip?: string,
	tooltipPosition?: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right',
	borderRadius?: BorderRadiusType
}) {	
	let c = `vieolo-icon-button vieolo-icon-button--${props.size || 'medium'} vieolo-icon-button--border-radius-${props.borderRadius || 'default'}`;
	let e = props.emphasis || 'none';
	let col = props.color || 'primary';

	if (e === 'high') {
		c = `${c} background-color--${col}-normal ripple ripple--${col}-light color--${col}-text border--px-0`;
	} else if (e === 'medium') {
		c = `${c} background-color--${col}-light ripple ripple--${col}-normal  border--px-0`;
	} else if (e === 'low') {
		c = `${c} background-color--white border--${col}-light hover--${col}-light color--${col}-normal  border--px-2 border--solid`;
	}else {
		c = `${c} background-color--white border--white hover-border--${col}-light color--${col}-normal border--px-2 border--solid ripple--${col}-light`;
	}

	if (props.tooltip) c += " vieolo-tooltip";	

	if (props.disabled) c += " disabled";	

	if (props.className) c += " " + props.className;

	return <button className={c} onClick={props.onClick} >
		{props.icon}
		{
			props.tooltip &&
			<div className={`tooltip-text-${props.tooltipPosition || 'up'}`}>{props.tooltip}</div>
		}
	</button>
}
