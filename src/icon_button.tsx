// React
import React from 'react';




export default function IconButton(props: {
	color?: 'primary' | 'secondary' | 'tertiary' | 'background' | 'alert' | 'error' | 'success' | 'accessoryOrange' | 'accessoryBlue' | 'accessoryGreen',
	className?: string,
	disabled?: boolean,
	size?: 'small' | 'medium',
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	icon: React.ReactNode,
	tooltip?: string,
	tooltipPosition?: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right'
}) {

	let rippleClass: string;
    let hoverClass: string;
    let colorClass = `${props.color || 'primary'}-color`;

	if (props.color == "error") {
		rippleClass = "ripple-error";
		hoverClass = "hover-error";
	}else if (props.color == "alert") {
		rippleClass = "ripple-alert";
		hoverClass = "hover-alert";
	}else if (props.color == "success") {
		rippleClass = "ripple-success";
		hoverClass = "hover-success";
	}else if (props.color == "accessoryOrange") {
		rippleClass = "ripple-accessory-orange";
		hoverClass = "hover-accessory-orange";
	}else {
		rippleClass = 'ripple-tertiary';
		hoverClass = "hover-tertiary";
	}

	let className = "icon-button " + " " + colorClass + " " + rippleClass + " " + hoverClass + " " + (props.className || "");

	if (props.tooltip) className += " tooltip";

	if (props.size == "small") className += " icon-button-small";

	if (props.disabled) className += " disabled";	

	return <button className={className} onClick={props.onClick} >
		{props.icon}
		{
			props.tooltip &&
			<div className={`tooltip-text-${props.tooltipPosition || 'up'}`}>{props.tooltip}</div>
		}
	</button>
}
