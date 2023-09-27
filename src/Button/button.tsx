// React
import React from 'react';

// Components
import DropDownMenu, { DropDownMenuItemType } from '../DropDownMenu/dropdown_menu';
import Spinner from '../Spinner/spinner';

// Types
import { EmphasisType, BorderRadiusType, ColorOptionType, ScreenSizeType } from '../types/types';
import { getEmphasisClasses } from '../utility/style_utility';

type ButtonGenerlProps = {
	height?: 'large' | 'medium' | 'small' | 'extra-small',
}

export default function Button(props: {
	text: string,
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	disabled?: boolean,
	color?: ColorOptionType,
	startIcon?: React.ReactNode,
	endIcon?: React.ReactNode,
	/** 
	 * selects the subclass of the `vieolo-button`
	 * default: medium 
	 */
	height?: 'large' | 'medium' | 'small' | 'extra-small',
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
	isTransparent?: boolean,
	/** Adds an Icon button to the right side of the button */
	auxiliary?: {
		icon: React.ReactNode,
		onClick: (dropDownItemValue?: string) => void,
		dropDownMenuItems?: DropDownMenuItemType[],
		ariaLabel?: string,
		isLoading?: boolean
	},
	ariaLabel?: string,
	isLoading?: boolean,
	
	lg?: ButtonGenerlProps,
	md?: ButtonGenerlProps,
	sm?: ButtonGenerlProps,
}) {
	
    function getClassName(size?: ScreenSizeType) {
		let s = ''
		if (!size || size === 'xl') {
			s = props.height || 'medium'	
		} else {
			let so = props[size]
			if (so) {
				s = so.height || ''
			}
			
			if (s.trim()) s = `${s}--${size}`
		}
		
		if (s.trim()) return `vieolo-button--${s}`
		return ''
    }

    let xlClass = "vieolo-button " + getClassName()
    let lgClass = props.lg ? getClassName('lg') : " "
    let mdClass = props.md ? getClassName('md') : " "
    let smClass = props.sm ? getClassName('sm') : " "    

	let w = props.width || 'content';
    let c = xlClass + lgClass + mdClass + smClass
	c += `vieolo-button--${w}-width vieolo-button--border-radius-${props.borderRadius || 'default'}`;

	let e = props.emphasis || 'high';
	let s: React.CSSProperties = {};


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

	c += getEmphasisClasses(e, props.color || 'primary', {
		hasRipple: props.onClick !== undefined,
		hoverable: true,
		transparentBackground: props.isTransparent
	});

	if (props.disabled) c += " disabled";

	if (props.className) c += " " + props.className;

	let button = <button 
		className={c} 
		onClick={(props.isLoading || props.disabled) ? undefined : props.onClick} 
		style={s} 
		aria-label={props.ariaLabel}
	>
		{
			props.isLoading
				? <Spinner size={props.height} color={props.color || 'primary'} colorType={e === 'high' ? 'text' : 'normal'}  />
				: <>
					{
						props.startIcon &&
						<span className="start-icon">
							{props.startIcon}
						</span>
					}
				</>
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
			{props.auxiliary.isLoading ? <Spinner size={props.height} color={props.color || 'primary'} colorType={e === 'high' ? 'text' : 'normal'} /> : props.auxiliary.icon}
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