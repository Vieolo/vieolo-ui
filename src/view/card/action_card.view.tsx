// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
// import IconTwo from '@mui/icons-material/Backup';
// import IconThree from '@mui/icons-material/Cake';
// import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import ActionCard from '../../ActionCard';

// Types
import { ViewData } from '../main/main';
import Typography from '../../Typography';
import Button from '../../Button';
import GridContainer from '../../GridContainer';
import Grid from '../../Grid';

type ActionCardPropsType = React.ComponentProps<typeof ActionCard>;

export function actionCardOptions(): ViewData {

    return {
        constants: {

        } as Partial<ActionCardPropsType>,
        variables: {
            withHeaderIcon: 'boolean',
            emphasis: 'emphasis',
            withFooterButtons: 'booleanTrueDefault',
            withDropDownMenu: 'booleanTrueDefault'
        }
    }
}


export function ActionCardCreator(props: { p: ActionCardPropsType }) {

    return <div className='width--pc-100 max-width--px-500'>
        <ActionCard
            headerTitle='Report'
            headerIcon={(props.p as any).withHeaderIcon ? <IconOne /> : undefined}
            emphasis={props.p.emphasis}
            elevation={'1'}
            footerComponents={!(props.p as any).withFooterButtons ? undefined : [
                <Button
                    key={"footer button 1"}
                    color='primary'
                    text='View All'
                    emphasis='none-normal'
                    height='extra-small'
                    borderRadius='half'
                />,
                <Button
                    key={"footer button 2"}
                    color='primary'
                    text='Download'
                    emphasis='medium'
                    height='extra-small'
                    borderRadius='half'
                />
            ]}
            dropDownMenu={!(props.p as any).withDropDownMenu ? undefined : {
                items: [
                    { title: "Edit", value: 'edit' },
                    { title: "Delete", value: 'delete' },
                ],
                onItemSelect: () => { }
            }}
        >
            <GridContainer>
                <Grid xl={6}>
                    <Typography text='This is the content of this card' />
                    <Typography text='Anything can be placed here' />
                </Grid>

                <Grid xl={6}>

                </Grid>
            </GridContainer>
        </ActionCard>
    </div>
}   