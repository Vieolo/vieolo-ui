// Vieolo UI
import Card from "../Card";
import DropDownMenu, { DropDownMenuItemType } from "../DropDownMenu";
import Flex from "../Flex";
import IconButton from "../IconButton";
import Typography from '../Typography';

// Icons
import MoreIcon from '@mui/icons-material/MoreVertRounded';
import Divider from "../Divider";


// Types
type CardPropsType = React.ComponentProps<typeof Card>;



export default function ActionCard(props: {
    headerTitle: string,
    headerIcon?: React.ReactNode,
    dropDownMenu?: {
        items: DropDownMenuItemType[],
        onItemSelect: (v: string) => void
    },
    footerComponents?: React.ReactNode[]
} & CardPropsType) {

    return <Card
        {...props}
        padding="none"
        emphasis="none"
    >
        <Flex alignItems="center" columnGap="one" justifyContent="space-between" className="padding-vertical--half padding-horizontal--one">
            <Flex alignItems="center" columnGap="one">
                {
                    props.headerIcon &&
                    props.headerIcon
                }
                <Typography text={props.headerTitle} type='title-medium' />
            </Flex>

            {
                (props.dropDownMenu && props.dropDownMenu.items.length > 0) &&
                <DropDownMenu 
                    buttonComponent={
                        <IconButton 
                            icon={<MoreIcon />}
                            onClick={() => {}}
                            color={props.color}
                            size='extra-small'
                        />
                    }
                    items={props.dropDownMenu.items}
                    onItemSelect={props.dropDownMenu.onItemSelect}
                />
            }
        </Flex>
        <Divider direction="horizontal" length="pc-100" position="center" thickness="1"  color={props.color} colorType='normal' />

        <Card padding={props.padding} emphasis={props.emphasis} borderRadius='none'>
            {
                props.children
            }
        </Card>

        {
            (props.footerComponents && props.footerComponents.length > 0) &&
            <>
                <Divider direction="horizontal" length="pc-100" position="center" thickness="1" spaceAround="half" color={props.color} />
                <Flex alignItems="center" columnGap="one" justifyContent="space-between" className="padding-vertical--half">
                <Flex alignItems="center" columnGap="one" className="padding-left--one">
                    {props.footerComponents}
                </Flex>
            </Flex>
            </>
        }
    </Card>

}