// Vieolo UI
import Typography from "../Typography";
import Flex from "../Flex";
import Card from "../Card";

// Utility
import { handleOnKeyDown } from "../utility/onkeydown_utility";
import { ColorOptionType, GridGapType } from "../types";
import { BorderRadiusType } from "../types/types";

export type RadioButtonType = {
    id: string,
    ariaLabel?: string,
    title?: string,
    subTitle?: string,
    /** 
     * If an icon is provided, it will replace the rounded checkbox
     */
    icon?: React.ReactNode
}

export default function RadioGroup(props: {
    value: string,
    options: RadioButtonType[],
    onOptionChange: (o: string) => void,
    direction?: 'vertical' | 'horizontal',
    disabled?: boolean,
    /** Defaults to half */
    horizontalButtonPadding?: "none" | 'half' | 'one' | 'two',
    verticalButtonPadding?: "none" | 'half' | 'one' | 'two',
    /** defaults to primary */
    color?: ColorOptionType,
    /** Defaults to none */
    gap?: GridGapType,
    isUnselectedTransparent?: boolean
    /** defaults to half */
    borderRadius?: BorderRadiusType
}) {

    return <div className={`vieolo-radio-group${props.disabled ? ' disabled' : ''}`}>
        <Flex
            direction={props.direction === 'vertical' ? 'column' : 'row'}
            rowGap={props.gap || 'none'}
            columnGap={props.gap || 'none'}
        >
            {
                props.options.map((o: RadioButtonType) => {
                    return <div
                        key={o.id}
                        aria-label={o.ariaLabel || undefined}
                        tabIndex={props.disabled ? undefined : 0}
                        className={'vieolo-radio-group__button'}
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
                    >
                        <Card
                            className={`padding-vertical--${props.verticalButtonPadding || 'half'} padding-horizontal--${props.horizontalButtonPadding || 'half'}`}
                            borderRadius={props.borderRadius || 'half'}
                            color={props.color}
                            emphasis={props.value === o.id ? 'medium' : 'none'}
                        >
                            <Flex columnGap="half" alignItems="center">
                                {
                                    o.icon &&
                                    o.icon
                                }
                                {
                                    (o.title || o.subTitle) &&
                                    <div>
                                        {
                                            o.title &&
                                            <Typography text={o.title} fontWeight='bold' />
                                        }
                                        {
                                            o.subTitle &&
                                            <Typography text={o.subTitle} type='paragraph-small' />
                                        }
                                    </div>
                                }
                            </Flex>
                        </Card>
                    </div>
                })
            }
        </Flex>
    </div>   
}