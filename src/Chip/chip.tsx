// React
import React from 'react';
import { BorderRadiusType, ColorOptionType } from '../types/types';
import { getEmphasisClasses } from '../utility/style_utility';


// Components
import IconButton from '../IconButton';
import { EmphasisType } from '../types';


export default function Chip(props: {
	className?: string,
	/** When the chip itself is clicked */
	onChipSelect?: () => void,
	selected?: boolean,
	disabled?: boolean,
	/** This is an informative and non-functional icon which appear on the left side of the Chip */
	icon?: React.ReactNode,
	style?: React.CSSProperties,
	label: string
	/** The icon for the default button of the Chip which appears on the right side of the Chip */
	buttonIcon?: any,
	/** The callback function for the default button of the Chip which appears on the right side of the Chip */
	onButtonClick?: () => void,
	/** The custom button component which will appear on the right side of the Chip and has a higher priority than the default button */
	color?: ColorOptionType,
	buttonComponent?: React.ReactNode,
	emphasis?: EmphasisType,
	isTransparent?: boolean,
	borderRadius?: BorderRadiusType
	id?: string,
	size?: "medium" | 'small',
	ariaLabel?: string
}) {

	let color = props.color || 'primary';
	let c: string = `vieolo-chip vieolo-chip--border-radius-${props.borderRadius || 'default'} vieolo-chip--${props.size || "medium"}`;
	let e = props.emphasis || 'low';

	if (props.disabled) c += " disabled";

	c += getEmphasisClasses(props.selected ? 'high' : e, color, {
		hasRipple: props.onChipSelect !== undefined,
		hoverable: props.onChipSelect ? true : false,
		transparentBackground: props.isTransparent
	});

	let s: { [key: string]: any } = {};

	if (props.onChipSelect) s['cursor'] = 'pointer';

	let button: React.ReactNode;

	if (props.buttonComponent) {
		button = props.buttonComponent;
	} else if (props.onButtonClick && props.buttonIcon) {
		button = <IconButton
			icon={props.buttonIcon}
			onClick={e => {
				e.stopPropagation();
				if (props.onButtonClick) props.onButtonClick();
			}}
			borderRadius={props.borderRadius !== 'default' ? props.borderRadius : 'full'}
			color={color}
			size={'extra-small'}
			emphasis="none"
			borderWidth='0'
			ariaLabel={`${props.ariaLabel || (props.label + " chip")} button`}
		/>
	}

	return <div
		className={c}
		style={{ ...s, ...props.style }}
		id={props.id}
		aria-label={props.ariaLabel || `${props.label} chip`}
		onClick={e => {
			if (props.onChipSelect) {
				e.stopPropagation();
				props.onChipSelect()
			}
		}}
	>

		<div className={`vieolo-chip__content`}>
			{
				props.icon &&
				props.icon
			}

			{props.label}

			{
				((props.onButtonClick && props.buttonIcon) || (props.buttonComponent)) &&
				<span>
					{button}
				</span>
			}

		</div>

	</div>
}