// React
import React from 'react';
import Card from '../Card';

// Vieolo UI
import Flex from '../Flex';
import Typography from '../Typography';


export default function Form (props: {
    title: string,
    /** This string is displayed on the right side of the form section header */
    secondaryValue?: string,
    children?: React.ReactNode [],
    disabled?: boolean
}) {    

    return <Card className={`global-form-section${props.disabled ? ' disabled' : ''}`}>
        <Flex className="form-section-header">
            <Typography text={props.title} fontWeight={'bold'}/>
            {
                props.secondaryValue &&
                <Typography text={props.secondaryValue} />
            }
        </Flex>
        <Flex className="form-section-content">
            {props.children}
        </Flex>
    </Card> 
}