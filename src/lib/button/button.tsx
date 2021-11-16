// React
import React from 'react';

// Types
import { EmphasisType, BorderRadiusType, ColorOptionType } from '../private/types';


export default function Button(props: {
	text: string,
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	disabled? : boolean,
	color: ColorOptionType,
	startIcon?: React.ReactNode,
	endIcon?: React.ReactNode,
	/** 
	 * selects the subclass of the `vieolo-button`
	 * default: medium 
	 */
	height?: 'large' | 'medium' | 'small',
	/** default: content */
	width?: 'content' | 'full',
	className?: string,
	toLowerCase?: boolean,
	fontSize?: number,
	style?: React.CSSProperties,
	type?: 'button' | 'submit' | 'reset',
	/** default: high */
	emphasis?: EmphasisType,
	/** default: `vieolo-button` css class */
	borderRadius?: BorderRadiusType
}) {
	let s: {[key: string]: any} = {};
	let h = props.height || 'medium';
	let w = props.width || 'content';
	let c: string = `vieolo-button vieolo-button--${h} vieolo-button--${w}-width vieolo-button--border-radius-${props.borderRadius || 'default'}`;
	let e = props.emphasis || 'high';
	

	if (props.toLowerCase) {
		s['textTransform'] = 'initial';		
	}

	if (props.fontSize) {
		s['fontSize'] = `${props.fontSize}px`;
	}

	if (e === 'high') {
		c = `${c} background-color--${props.color}-normal ripple ripple--${props.color}-light color--${props.color}-text border--px-0`;
	} else if (e === 'medium') {
		c = `${c} background-color--${props.color}-light ripple ripple--${props.color}-normal  border--px-0`;
	} else if (e === 'low') {
		c = `${c} background-color--white border--${props.color}-light hover--${props.color}-light color--${props.color}-normal  border--px-2 border--solid`;
	}else {
		c = `${c} background-color--white border--white hover-border--${props.color}-light color--${props.color}-normal border--px-2 border--solid ripple--${props.color}-light`;
	}
	
	if (props.disabled) c += " disabled";

	if (props.className) c += " " + props.className;

	return <button className={c} onClick={props.onClick} style={s}>
		{
			props.startIcon &&
			<span className="start-icon">
				{props.startIcon}
			</span>
		}
		{props.text}
		{
			props.endIcon &&
			<span className='end-icon'>
				{props.endIcon}
			</span>
		}
	</button>

}