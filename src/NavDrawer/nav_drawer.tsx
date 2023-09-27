// Vieolo UI
import Flex from "../Flex"
import Spacer from "../Spacer"
import Typography from "../Typography"
import { ArrowDown, ArrowUp } from "../icons"

export type DrawerSubItem = {
    title: string,
    icon?: React.ReactNode,
    selected?: boolean,
    href?: string,
    onClick?: () => void,
}

export type DrawerItem = {
    /** The title of the item. If custom component is also provided, the title acts as key */
    title: string,
    icon?: React.ReactNode,
    selected?: boolean,
    href?: string,
    onClick?: () => void,
    height?: 'medium' | 'large' | 'small',
    newGroup?: boolean,
    customComponent?: React.ReactNode,
    children?: DrawerSubItem[]
}

export default function NavDrawer(props: {
    state: 'open' | 'closed',
    topContent?: React.ReactNode,
    mainItems: DrawerItem[],
    bottomItems?: DrawerItem[],
    onDrawerClose?: () => void,
    footPrint?: React.ReactNode,
    alwaysOpen?: {
        responsiveBreakpoint: 'xl' | 'lg' | 'md' | 'sm',
    },
    /** Defaults to two */
    itemPaddingLeft?: 'none' | 'half' | 'one' | 'two',
    openItems?: string[],
    onOpenItemsChange?: (oi: string[]) => void,
}) {

    let drawerClass = `vieolo-nav-drawer__drawer vieolo-nav-drawer__drawer--${props.state}`

    if (props.alwaysOpen) {
        drawerClass += ` vieolo-nav-drawer__drawer--always-open`
    }

    if (props.alwaysOpen) {
        drawerClass += ` vieolo-nav-drawer__drawer--responsive-${props.alwaysOpen.responsiveBreakpoint}`
    }

    return <div className={`vieolo-nav-drawer`}>
        <div className={drawerClass}>
            <Flex direction="column" justifyContent="space-between" className="height--pc-100">

                <Flex direction="column">
                    {
                        props.topContent &&
                        <>
                            {props.topContent}
                            <Spacer height="one" />
                        </>
                    }

                    {
                        (props.mainItems || []).map(z => {

                            if (z.customComponent) return <div key={z.title}>
                                {z.customComponent}
                            </div>

                            return <NavDrawerItem
                                key={z.title}
                                paddingLeft={props.itemPaddingLeft}
                                item={z}
                                open={z.children && z.children.length > 0 && props.openItems && props.openItems.includes(z.title)}
                                onOpenChange={o => {
                                    if (props.onOpenItemsChange && props.openItems) {
                                        let newList = o ? [...props.openItems, z.title] : props.openItems.filter(x => x !== z.title)
                                        props.onOpenItemsChange(newList)
                                    }
                                }}
                                onClickIntercepted={() => {
                                    if (props.onDrawerClose) props.onDrawerClose()
                                }}
                            />
                        })
                    }
                </Flex>

                <Flex direction="column">
                    {
                        (props.bottomItems || []).map(z => {
                            return <NavDrawerItem
                                key={z.title}
                                item={z}
                                paddingLeft={props.itemPaddingLeft}
                                onClickIntercepted={() => {
                                    if (props.onDrawerClose) props.onDrawerClose()
                                }}
                            />
                        })
                    }
                    {
                        props.footPrint && props.footPrint
                    }
                </Flex>

            </Flex>
        </div>
        <div className="vieolo-nav-drawer__outer-area">
            <div
                className={`vieolo-nav-drawer__outer-area__${props.state}`}
                onClick={() => {
                    if (props.state === 'open' && props.onDrawerClose) props.onDrawerClose()
                }}
            >

            </div>
        </div>
    </div>
}


function NavDrawerItem(props: {
    item: DrawerItem,
    paddingLeft?: 'none' | 'half' | 'one' | 'two',
    onClickIntercepted: () => void,
    open?: boolean,
    onOpenChange?: (o: boolean) => void,
}) {
    
    
    let t = <Flex alignItems="center" columnGap="one">
        {
            props.item.icon && props.item.icon
        }
        <Typography text={props.item.title} fontWeight='bold' />
    </Flex>


    let c = `vieolo-nav-drawer__item vieolo-nav-drawer__item--${props.item.selected ? "selected" : "not-selected"}`

    c += ` vieolo-nav-drawer__item--${props.item.height || 'medium'}`

    c += ` padding-left--${props.paddingLeft || 'two'}`

    if (props.item.newGroup) {
        c += ` margin-top--two `
    }

    if (props.item.href && (!props.item.children || props.item.children.length === 0)) {
        return <a
            href={props.item.href}
            className={c}
            onClick={e => {
                if (props.item.onClick) {
                    // Preventing the default when clicked
                    // The on click functionality will be handled by the implementor to prevent unnecessary reload of the page
                    e.preventDefault();
                    props.item.onClick();
                    props.onClickIntercepted();
                }
            }}
        >
            {t}
        </a>
    } else if (props.item.children && props.item.children.length > 0) {
        return <Flex direction="column">
            <div
                className={c}
                onClick={() => {
                    if (props.onOpenChange) props.onOpenChange(!(props.open || false))
                }}
            >
                <Flex alignItems="center" justifyContent="space-between" className="width--pc-100 padding-right--one">
                    <Flex alignItems="center" columnGap="one">
                        {
                            props.item.icon && props.item.icon
                        }
                        <Typography text={props.item.title} fontWeight='bold' />
                    </Flex>

                    {
                        props.open
                            ? <ArrowUp />
                            : <ArrowDown />
                    }
                </Flex>

            </div>
            {
                props.open &&
                <Flex direction="column" className="margin-bottom--half">
                    {
                        props.item.children.map(child => {
                            let childClass = `vieolo-nav-drawer__item__child`
                            if (child.selected) childClass = `${childClass} ${childClass}--selected`

                            let content = <>
                                <Flex alignItems="center" columnGap="half">
                                    {
                                        child.icon 
                                            ? child.icon
                                            : <Spacer width="half" />
                                    }
                                    <p>{child.title}</p>
                                </Flex>
                            </>
                            
                            if (child.href) {
                                return <a 
                                    key={child.title} 
                                    href={child.href}
                                    className={childClass}
                                    onClick={e => {
                                        if (child.onClick) {
                                            // Preventing the default when clicked
                                            // The on click functionality will be handled by the implementor to prevent unnecessary reload of the page
                                            e.preventDefault();
                                            child.onClick();
                                        }
                                    }}
                                >
                                    {content}
                                </a>
                            }

                            return <div 
                                key={child.title}
                                className={childClass}
                                onClick={child.onClick}
                            >
                                {content}
                            </div>

                            
                        })
                    }
                </Flex>
            }
        </Flex>
    } else {
        return <div
            className={c}
            onClick={props.item.onClick}
        >
            {t}
        </div>
    }
}