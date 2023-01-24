// React
import React from 'react';
import Spinner from '../Spinner/spinner';

// Type
import { BorderRadiusType, ColorOptionType, EmphasisType } from '../types/types';
import { getBorderRadiusClasses, getEmphasisClasses } from '../utility/style_utility';




export default function IconButton(props: {
	color?: ColorOptionType,
	className?: string,
	disabled?: boolean,
	/** default: medium */
	size?: 'large' | 'medium' | 'small' | 'extra-small',
	/** default: none */
	emphasis?: EmphasisType
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	icon: React.ReactNode,
	tooltip?: string,
	tooltipPosition?: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right',
	borderRadius?: BorderRadiusType,
	style?: React.CSSProperties,
	/** default: 2 */
	borderWidth?: '0' | '1' | '2',
	type?: 'button' | 'submit' | 'reset',
	ariaLabel?: string,
	isTransparent?: boolean,
	isLoading?: boolean
}) {	
	let c = `vieolo-icon-button vieolo-icon-button--${props.size || 'medium'}`;

	c += getBorderRadiusClasses('vieolo-icon-button', props.borderRadius || 'default')

	let e = props.emphasis || 'none';
	let col = props.color || 'primary';

	c += getEmphasisClasses(e, col, {
		hasRipple: true,
		hoverable: true,
		borderWidth: props.borderWidth,
		transparentBackground: props.isTransparent
	});	

	if (props.tooltip) c += " vieolo-tooltip";	

	if (props.disabled) c += " disabled";	

	if (props.className) c += " " + props.className;

	return <button className={c} onClick={props.isLoading ? undefined : props.onClick} style={props.style || {}} type={props.type} aria-label={props.ariaLabel} >
		{props.isLoading ? <Spinner size={props.size} color={col} colorType={e === 'high' ? 'text' : 'normal'} /> : props.icon}
		{
			props.tooltip &&
			<div className={`tooltip-text-${props.tooltipPosition || 'up'}`}>{props.tooltip}</div>
		}
	</button>
}
