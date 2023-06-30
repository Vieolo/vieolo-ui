// React, Router
import { useHistory } from 'react-router-dom';

// Vieolo UI
import Flex from "../Flex";
import Grid from "../Grid";
import GridContainer from "../GridContainer";
import Typography from "../Typography";
import IconButton from "../IconButton";
import { ArrowBackIcon } from "../icons";
import { ElevationType } from '../types';

export default function SubNavbarRow(props: {
    /** 
     * The span of the middle column of the grid 
     * The total span of the column is 12
     * This value represents the span of the middle value and remainder of 12 is divided to two for left and right cols
     * This value should be a multiplication of 2
     */
    midColumnSize?: number,
    elevation?: ElevationType,
    removeBackButton?: boolean,
    icon?: React.ReactNode,
    backButtonText?: string,
    onBack?: () => void,
    actions?: any[],
    center?: React.ReactNode,
}) {

    let history = useHistory();
    
    let midCol = props.midColumnSize || 4;
    let icon = props.icon || <ArrowBackIcon />
    let backButtonText = props.backButtonText || 'Go Back';
    let onBack = props.onBack || history.goBack;
    
    let c = "vieolo-sub-navbar-row" 
    c += ` vieolo-sub-navbar-row--elevation-${props.elevation || 'default'}`
    

    return <div className={c}>
        <GridContainer className="padding-horizontal--one height--pc-100">
            <Grid xl={((12 - midCol) / 2) as any} className="height--pc-100">
                <Flex alignItems="center" columnGap="half" className="height--pc-100">
                    {
                        !props.removeBackButton &&
                        <IconButton
                            icon={icon}
                            onClick={() => onBack()}
                            color={"primary"}
                            size='small'
                        />
                    }

                    <Typography text={backButtonText} fontWeight='bold' />
                </Flex>
            </Grid>

            <Grid xl={midCol as any} className="height--pc-100">
                <Flex alignItems="center" justifyContent="center" className="height--pc-100">
                    {props.center && props.center}
                </Flex>
            </Grid>

            <Grid xl={((12 - midCol) / 2) as any} className="height--pc-100">
                <Flex direction="row-reverse" alignItems="center" columnGap="one" className="height--pc-100">
                    {props.actions || []}
                </Flex>
            </Grid>
        </GridContainer>
    </div>
}