// Vieolo UI
import Button from "../Button"
import Divider, { DividerThickness } from "../Divider/divider"
import Flex from "../Flex"
import { EmphasisType } from "../types"

// Types
import { BorderRadiusType, ColorOptionSubType, ColorOptionType } from "../types/types"

export type TabRowItem = {
    text: string,
    value: string,
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
}

export default function TabRow(props: {
    items: TabRowItem[],
    tabColor?: ColorOptionType,
    tabButtonBorderRadius?: BorderRadiusType,
    tabButtonHeight?: 'small' | 'medium' | 'large',
    selectedUnderlineColor?: ColorOptionType,
    onItemSelect: (value: string) => void,
    selectedItem?: string,
    /** @default `none-background */
    normalTabEmphasis?: EmphasisType,
    /** @default `none-background */
    selectedTabEmphasis?: EmphasisType,
    /** 
     * Will only affect the selected tab
     * it is usefull when a tab is clicked and the data for the tab has to be feched
     */
    isLoading?: boolean,
    lowerBorder?: {
        color?: ColorOptionType,
        colorType?: ColorOptionSubType,
        thickness?: DividerThickness
    }
}) {
    return <div className="vieolo-tab-row">
        <Flex columnGap="half" className="padding-horizontal--half overflow--hide-scrollbar" wrap="scroll">
            {
                props.items.map((item, i) => {
                    let isSelected = item.value === props.selectedItem;
                    let emphasis: EmphasisType = 'none-background';
                    if (isSelected && props.selectedTabEmphasis) emphasis = props.selectedTabEmphasis;
                    else if (!isSelected && props.normalTabEmphasis) emphasis = props.normalTabEmphasis;
                    
                    return <Flex
                        key={`${item.value} ${i}`}
                        direction='column'
                        className="padding-top--half"
                        justifyContent="space-between"
                        alignItems="center"
                        rowGap="half"
                    >
                        <Button
                            text={item.text}
                            ariaLabel={`${item.value} tab`}
                            borderRadius={props.tabButtonBorderRadius}
                            color={props.tabColor}
                            endIcon={item.endIcon}
                            startIcon={item.startIcon}
                            emphasis={emphasis}
                            height={props.tabButtonHeight || 'small'}
                            isTransparent
                            isLoading={isSelected && props.isLoading}
                            onClick={() => {
                                props.onItemSelect(item.value);
                            }}
                        />

                        {
                            isSelected
                                ? <Divider length="pc-100" thickness="2" color={props.selectedUnderlineColor || 'secondary'} direction='horizontal' colorType="normal" />
                                : <div style={{height: "2px"}}></div>
                        }
                    </Flex>
                })
            }
        </Flex>
        <Divider
            direction="horizontal"
            length="pc-100"
            thickness={(props.lowerBorder && props.lowerBorder.thickness) ? props.lowerBorder.thickness : '1'}
            color={(props.lowerBorder && props.lowerBorder.color) ? props.lowerBorder.color : 'primary'}
            colorType={(props.lowerBorder && props.lowerBorder.colorType) ? props.lowerBorder.colorType : 'normal'}
        />
    </div>
}
