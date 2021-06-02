// React
import React from 'react';


// Components
import IconButton from './button/icon_button';


export default function Chip(props: {
	className?: string,
	onChipSelect?: () => void,
	selected?: boolean,
	disabled?: boolean,
	icon?: React.ReactNode,
	style?: React.CSSProperties,
	label: string
	buttonIcon?: any,
	buttonComponent?: React.ReactNode,
	onButtonClick?: () => void,
	id?: string
}) {

	let s: { [key: string]: any } = {};

	if (props.onChipSelect) s['cursor'] = 'pointer';

	let button: React.ReactNode;

	if (props.buttonComponent) {
		button = props.buttonComponent;
	} else if (props.onButtonClick && props.buttonIcon) {
		button = <IconButton
			icon={props.buttonIcon}
			onClick={props.onButtonClick}
			size={'small'}
		/>
	}

	return <div
		className={`vieolo-chip ${props.className || ''}`}
		style={{ ...s, ...props.style }}
		id={props.id}
		onClick={() => {
			if (props.onChipSelect) {
				props.onChipSelect()
			}
		}}
	>

		<div className={`chip-content${props.selected ? ' chip-content-selected' : ''}`}>
			{
				props.icon &&
				props.icon
			}

			<p>{props.label}</p>

			{
				((props.onButtonClick && props.buttonIcon) || (props.buttonComponent)) &&
				<span>
					{button}
				</span>
			}

		</div>

	</div>
}