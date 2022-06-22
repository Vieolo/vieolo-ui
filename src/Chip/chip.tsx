// React
import React from 'react';
import { BorderRadiusType, ColorOptionType } from '../types/types';
import { getEmphasisClasses } from '../utility/style_utility';


// Components
import IconButton from '../IconButton';


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
	emphasis?: 'medium' | 'low',
	borderRadius?: BorderRadiusType
	id?: string
}) {

	let color = props.color || 'primary';
	let c: string = `vieolo-chip vieolo-chip--border-radius-${props.borderRadius || 'default'}`;
	let e = props.emphasis || 'low';

	if (props.disabled) c += " disabled";

	c += getEmphasisClasses(props.selected ? 'high' : e, color, {
		hasRipple: true,
		hoverable: true
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
		/>
	}

	return <div
		className={c}
		style={{ ...s, ...props.style }}
		id={props.id}
		onClick={() => {
			if (props.onChipSelect) {
				props.onChipSelect()
			}
		}}
	>

		<div className={`vieolo-chip__content`}>
			{
				props.icon &&
				props.icon
			}

			<p className={props.icon ? "margin-left--5" : ""}>{props.label}</p>

			{
				((props.onButtonClick && props.buttonIcon) || (props.buttonComponent)) &&
				<span>
					{button}
				</span>
			}

		</div>

	</div>
}