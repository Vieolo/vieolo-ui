// React
import React from 'react';


export default function Button(props: {
	text: string,
	onClick?: () => void,
	disabled? : boolean,
	color: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'alert' | 'accessory-blue' | 'accessory-orange' | 'accessory-green',
	startIcon?: React.ReactNode,
	endIcon?: React.ReactNode,
	fullWidth?: boolean,
	size?: 'large' | 'medium' | 'small',
	className?: string,
	toLowerCase?: boolean,
	fontSize?: number,
	style?: React.CSSProperties,
	type?: 'button' | 'submit' | 'reset',
	variant?: 'text' | 'outlined' | 'contained'
}) {
	let s: {[key: string]: any} = {};
	let c: string = `vieolo-button`;

	if (props.toLowerCase) {
		s['textTransform'] = 'initial';		
	}

	if (props.fontSize) {
		s['fontSize'] = `${props.fontSize}px`;
	}

	if (props.className) c += " " + props.className;

	if (props.color) {
		c += " " + props.color + "-background";
		c += " " + "ripple-" + props.color 
	}
	
	if (props.disabled) c += " disabled";

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