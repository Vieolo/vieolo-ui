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
    icon?: React.ReactNode,
    children?: TreeListItem[]
}

export default function TreeList(props: {
    items: TreeListItem[]
}) {
    return <div className="vieolo-tree-list">
        <Flex direction="column" rowGap="half">
            {
                props.items.map(item => {
                    return <SingleParent item={item} key={item.title} />
                })
            }
        </Flex>
    </div>
}

function SingleParent(props: { item: TreeListItem }) {
    let [mode, setMode] = useState<"expanded" | "collapsed">("collapsed")
    let hasChildren = props.item.children && props.item.children.length > 0

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
            <Card emphasis="none-background" onClick={() => { }} padding='half' className="height--pc-100 width--pc-100 vieolo-tree-list-item__row">
                <Flex className="height--pc-100" justifyContent="space-between" alignItems="center">
                    <Typography text={props.item.title} type='title-small' />
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
                        return <SingleParent item={c} key={c.title} />
                    })
                }
            </div>
        }
    </Card>
}
