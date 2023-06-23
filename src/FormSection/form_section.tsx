// React
import React from 'react';

// Vieolo UI
import Flex from '../Flex';
import Card from '../Card';
import Typography from '../Typography';

type CardPropType = Pick<React.ComponentProps<typeof Card>, "borderRadius" | "color" | "emphasis" | "elevation">

export default function FormSection (props: {
    title: string,
    /** This string is displayed on the right side of the form section header */
    secondaryValue?: string | React.ReactNode,
    children?: React.ReactNode,
    disabled?: boolean
} & CardPropType) {    

    return <Card 
            borderRadius={props.borderRadius}
            color={props.color}
            emphasis={props.emphasis}
            elevation={props.elevation}
            className={`vieolo-form-section${props.disabled ? ' disabled' : ''}`}
        >
        <Flex className="vieolo-form-section__header-container">
            <Typography text={props.title} fontWeight={'bold'}/>
            {
                props.secondaryValue &&
                <>
                    {
                        typeof props.secondaryValue === 'string'
                            ? <Typography text={props.secondaryValue} />
                            : props.secondaryValue
                    }
                </>
            }
        </Flex>
        <Flex className="vieolo-form-section__content-container">
            {props.children}
        </Flex>
    </Card> 
}