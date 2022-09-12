// React
import React from 'react';

// Vieolo UI
import Flex from '../Flex';
import Card from '../Card';
import Typography from '../Typography';


export default function FormSection (props: {
    title: string,
    /** This string is displayed on the right side of the form section header */
    secondaryValue?: string,
    children?: React.ReactNode,
    disabled?: boolean
}) {    

    return <Card className={`vieolo-form-section${props.disabled ? ' disabled' : ''}`}>
        <Flex className="vieolo-form-section__header-container">
            <Typography text={props.title} fontWeight={'bold'}/>
            {
                props.secondaryValue &&
                <Typography text={props.secondaryValue} />
            }
        </Flex>
        <Flex className="vieolo-form-section__content-container">
            {props.children}
        </Flex>
    </Card> 
}