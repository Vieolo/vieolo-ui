// Vieolo UI
import Typography from "../Typography";
import Flex, { FlexDirection } from "../Flex";
import Card from "../Card";
import Checkbox from "../CheckBox";

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

type RadioGroupDirection = 'vertical' | 'horizontal';

export type RadioGroupResponsiveChanges = {
    direction?: RadioGroupDirection
}

export default function RadioGroup(props: {
    value: string,
    options: RadioButtonType[],
    onOptionChange: (o: string) => void,
    direction?: RadioGroupDirection,
    lg?: RadioGroupResponsiveChanges,
    md?: RadioGroupResponsiveChanges,
    sm?: RadioGroupResponsiveChanges 
    disabled?: boolean,
    /** Defaults to half */
    horizontalButtonPadding?: "none" | 'half' | 'one' | 'two',
    verticalButtonPadding?: "none" | 'half' | 'one' | 'two',
    /** defaults to primary */
    color?: ColorOptionType,
    /** Defaults to none */
    gap?: GridGapType,
    /** defaults to half */
    borderRadius?: BorderRadiusType
}) {
    
    function getFlexDir(dir?: RadioGroupDirection) : FlexDirection {
        return dir === 'vertical' ? 'column' : 'row'
    }

    return <div className={`vieolo-radio-group${props.disabled ? ' disabled' : ''}`}>
        <Flex
            direction={getFlexDir(props.direction)}
            rowGap={props.gap || 'none'}
            columnGap={props.gap || 'none'}
            lg={props.lg && props.lg.direction ? {direction: getFlexDir(props.lg.direction)} : undefined}
            md={props.md && props.md.direction ? {direction: getFlexDir(props.md.direction)} : undefined}
            sm={props.sm && props.sm.direction ? {direction: getFlexDir(props.sm.direction)} : undefined}
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
                                    o.icon
                                        ? o.icon
                                        : <Checkbox type="round" value={props.value === o.id} onChange={() => {}} />
                                }
                                {
                                    (o.title || o.subTitle) &&
                                    <div>
                                        {
                                            o.title &&
                                            <Typography text={o.title} fontWeight='bold' nonselectable />
                                        }
                                        {
                                            o.subTitle &&
                                            <Typography text={o.subTitle} type='paragraph-small' nonselectable />
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