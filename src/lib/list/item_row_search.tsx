// React
import React from 'react';

// Material UI
import CloseIcon from '@material-ui/icons/CloseRounded';

// Vieolo UI
import IconButton from '../button/icon_button';


export default function ItemRowSearch(props: {
    query: string,
    onChange: (v: string) => void,
    cardStyle?: 'card-light-shadow' | 'card-dark-shadow' | 'card-no-shadow'
}) {

    let className: string = "vieolo-item-row";
    if (props.cardStyle) className += " " + props.cardStyle;

    return <div className={className}>

        <div className={"vieolo-item-row__item-content vieolo-item-row__item-without-icon"}>

            <input
                value={props.query}
                onChange={e => props.onChange(e.target.value)}
                placeholder={"Search..."}
            />

            {
                props.query.trim() &&
                <div className="vieolo-item-row__button-col">
                    <IconButton
                        icon={<CloseIcon />}
                        onClick={() => props.onChange('')}
                        color={'error'}
                        size={'small'}
                    />
                </div>
            }
        </div>

    </div>
}