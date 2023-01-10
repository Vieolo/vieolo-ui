// React
import { useEffect, useState } from "react";

// Vieolo UI
import Card from "../Card"
import Typography from "../Typography"
import Flex from "../Flex";
import IconButton from "../IconButton";

// Icons
import {
    ArrowDown as ExpandIcon,
    ArrowUp as CollapseIcon
} from '../icons/icons';


type CardPropType = Omit<React.ComponentProps<typeof Card>, "children" | "onClick"> 

export type TreeListItem = {
    title: string,
    id: string,
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
    selected?: boolean,
    children?: TreeListItem[],
    /**
     * In some cases, the parent row is just a placeholder for the children and has
     * no actual functionality beside expanding and collapsing the list of children.
     * It should be used for row that have children
     */
    blockOnClick?: boolean,
    /**
     * If this string is provided, this item will have this title on the top, slightly
     * seperating it from the rest of the items. This is useful when you need the user
     * to be ablt to differentiate some of the items from the rest.
     */
    group?: {
        title: string,
        card?: CardPropType
    }
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

    useEffect(() => {
        function loop(children: TreeListItem[]) {
            for (let i = 0; i < children.length; i++) {
                const ch = children[i];
                if (ch.id === props.selectedId) {
                    setMode("expanded");
                    break;
                } else {
                    if (ch.children) {
                        loop(ch.children)
                    }
                }
            }            
        }

        if (props.item.children && props.item.children.length > 0) {
            loop(props.item.children)            
        }
    }, [props.selectedId, props.item.children])
    
    let hasChildren = props.item.children && props.item.children.length > 0
    let isSelected = props.item.selected || (props.selectedId && props.item.id === props.selectedId)

    return <Card className="vieolo-tree-list-item" padding="none">
        {
            props.item.group &&
            <Card 
                {...(props.item.group.card || {})}
                className="margin-top--one margin-bottom--half"
            >
                <Typography text={props.item.group.title} type='title-small' />
            </Card>
        }
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
                onClick={(isSelected || props.item.blockOnClick) ? undefined : () => { 
                    props.onItemSelected(props.item.id, props.item.title)
                }}
            >
                <Flex className="height--pc-100" justifyContent="space-between" alignItems="center">
                    <Flex alignItems="center" columnGap="half">
                        {
                            props.item.startIcon &&
                            props.item.startIcon
                        }
                        <Typography text={props.item.title} type='title-small' color={isSelected ? "primary" : undefined} colorType={isSelected ? 'text-light' : undefined} />
                    </Flex>
                    {
                        props.item.endIcon &&
                        props.item.endIcon
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
