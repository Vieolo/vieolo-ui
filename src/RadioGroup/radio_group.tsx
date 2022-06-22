// Vieolo UI
import Typography from "../Typography";

// Utility
import { handleOnKeyDown } from "../utility/onkeydown_utility";

export type RadioButtonType = {
    id: string,
    /** If passing a component, do not add an on click functionality as it is handled by the Radio Button */
    button: string | React.ReactNode
}

export default function RadioGroup(props: {
    value: string,
    options: RadioButtonType[],
    onOptionChange: (o: string) => void,
    direction?: 'vertical' | 'horizontal',
    disabled?: boolean,
    /** Defaults to 10px */
    horizontalButtonPadding?: number
}) {

    let className = `vieolo-radio-group__radio-contents vieolo-radio-group__radio-contents--${props.direction || 'horizontal'}`;

    let buttonClass = 'vieolo-radio-group__radio-button';

    return <div className={`vieolo-radio-group${props.disabled ? ' disabled' : ''}`}>
        <div
            className={className}
        >
            {
                props.options.map((o: RadioButtonType) => {
                    return <div
                        key={o.id}
                        tabIndex={props.disabled ? undefined : 0}
                        className={`${buttonClass} ${props.value === o.id ? buttonClass + "--selected" : ""} ${buttonClass}--${props.direction || 'horizontal'}`}
                        onClick={() => {
                            props.onOptionChange(o.id);
                        }}
                        onKeyDown={(e) => {
                            if (props.disabled) return;
                            handleOnKeyDown(e, {
                                onEnter: () => {
                                    props.onOptionChange(o.id);
                                }
                            })
                        }}
                        style={{
                            padding: `0 ${props.horizontalButtonPadding || 10}px`
                        }}
                    >
                        {
                            typeof o.button === 'string'
                                ? <Typography text={o.button} />
                                : <>
                                    {o.button}
                                </>
                        }
                    </div>
                })
            }
        </div>
    </div>
}