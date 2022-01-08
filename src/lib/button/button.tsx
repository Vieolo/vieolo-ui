// React
import React from 'react';

// Components
import DropDownMenu, { DropDownMenuItemType } from '../menu/dropdown_menu';

// Types
import { EmphasisType, BorderRadiusType, ColorOptionType } from '../private/types';


export default function Button(props: {
	text: string,
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	disabled?: boolean,
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
	borderRadius?: BorderRadiusType,
	/** Adds an Icon button to the right side of the button */
	auxiliary?: {
		icon: React.ReactNode,
		onClick: (dropDownItemValue?: string) => void,
		dropDownMenuItems?: DropDownMenuItemType[],
		ariaLabel?: string
	},
	ariaLabel?: string
}) {
	let s: React.CSSProperties = {};
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

	if (props.auxiliary) {
		s.borderTopRightRadius = 0;
		s.borderBottomRightRadius = 0;
		s.marginRight = 2;
	}

	if (e === 'high') {
		c = `${c} background-color--${props.color}-normal ripple ripple--${props.color}-light color--${props.color}-text border--px-0`;
	} else if (e === 'medium') {
		c = `${c} background-color--${props.color}-light ripple ripple--${props.color}-normal  border--px-0`;
	} else if (e === 'low') {
		c = `${c} background-color--white border--${props.color}-light hover--${props.color}-light color--${props.color}-normal  border--px-2 border--solid`;
	} else {
		c = `${c} background-color--white border--white hover-border--${props.color}-light color--${props.color}-normal border--px-2 border--solid ripple--${props.color}-light`;
	}

	if (props.disabled) c += " disabled";

	if (props.className) c += " " + props.className;

	let button = <button className={c} onClick={props.onClick} style={s} aria-label={props.ariaLabel}>
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

	if (props.auxiliary) {
		let aux = <button
			aria-label={props.auxiliary.ariaLabel}
			className={c}
			type={props.type}
			style={{
				borderTopLeftRadius: 0,
				borderBottomLeftRadius: 0,
				width: 40,
				minWidth: 10,
			}}
			onClick={() => {
				if (!props.auxiliary!.dropDownMenuItems || props.auxiliary!.dropDownMenuItems.length === 0) props.auxiliary!.onClick();
			}}
		>
			{props.auxiliary.icon}
		</button>

		return <div className="flex">
			{button}

			{
				(props.auxiliary.dropDownMenuItems && props.auxiliary.dropDownMenuItems.length > 0)
					? <DropDownMenu
						buttonComponent={aux}
						items={props.auxiliary.dropDownMenuItems}
						onItemSelect={v => props.auxiliary!.onClick(v)}
					/>
					: aux 
			}
		</div>
	}

	return button;
}