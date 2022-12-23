// Vieolo UI
import Card from "../Card"
import Typography from "../Typography"

// Icons
// Icons
import {
    ArrowDown as ExpandIcon,
    ArrowUp as CollapseIcon
} from '../icons/icons';
import { useState } from "react";
import Flex from "../Flex";
import IconButton from "../IconButton";

export type TreeListItem = {
    title: string,
    id: string,
    icon?: React.ReactNode,
    selected?: boolean,
    children?: TreeListItem[]
}

export default function TreeList(props: {
    items: TreeListItem[],
    selectedID?: string,
    onItemSelect: (id: string, path: string) => void,
}) {
    return <div className="vieolo-tree-list">
        <Flex direction="column" rowGap="half">
            {
                props.items.map(item => {
                    return <SingleParent item={item} key={item.title} onItemSelected={props.onItemSelect} selectedId={props.selectedID} />
                })
            }
        </Flex>
    </div>
}

function SingleParent(props: { selectedId?: string, item: TreeListItem, onItemSelected: (id: string, path: string) => void }) {
    let [mode, setMode] = useState<"expanded" | "collapsed">("collapsed")
    
    let hasChildren = props.item.children && props.item.children.length > 0
    let isSelected = props.item.selected || (props.selectedId && props.item.id === props.selectedId)

    return <Card className="vieolo-tree-list-item" padding="none">
        <Flex alignItems="center">
            {
                hasChildren &&
                <IconButton
                    icon={mode === 'collapsed' ? <ExpandIcon /> : <CollapseIcon />}
                    onClick={() => setMode(mode === 'collapsed' ? 'expanded' : 'collapsed')}
                    size='extra-small'
                />
            }
            <Card 
                emphasis={isSelected ? "medium" : "none-background"} 
                padding='half' 
                className="height--pc-100 width--pc-100 vieolo-tree-list-item__row"
                onClick={isSelected ? undefined : () => { 
                    props.onItemSelected(props.item.id, props.item.title)
                }}
            >
                <Flex className="height--pc-100" justifyContent="space-between" alignItems="center">
                    <Typography text={props.item.title} type='title-small' color={isSelected ? "primary" : undefined} colorType={isSelected ? 'text-light' : undefined} />
                    {
                        props.item.icon &&
                        props.item.icon
                    }
                </Flex>
            </Card>
        </Flex>

        {
            mode === 'expanded' &&
            <div className="vieolo-tree-list-item__children-container">
                {
                    props.item.children!.map(c => {
                        return <SingleParent onItemSelected={(id, p) => props.onItemSelected(id, `${props.item.title}/${p}`)} item={c} key={c.title} selectedId={props.selectedId} />
                    })
                }
            </div>
        }
    </Card>
}
