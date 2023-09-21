// Vieolo UI
import Flex from "../Flex"
import Spacer from "../Spacer"
import Typography from "../Typography"

export type DrawerItem = {
    /** The title of the item. If custom component is also provided, the title acts as key */
    title: string,
    icon?: React.ReactNode,
    selected?: boolean,
    href?: string,
    onClick?: () => void,
    height?: 'medium' | 'large' | 'small',
    newGroup?: boolean,
    customComponent?: React.ReactNode
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
    itemPaddingLeft?: 'none' | 'half' | 'one' | 'two'
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


function NavDrawerItem(props: { item: DrawerItem, paddingLeft?: 'none' | 'half' | 'one' | 'two', onClickIntercepted: () => void }) {
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

    if (props.item.href) {
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
    } else {
        return <div className={c} onClick={props.item.onClick}>
            {t}
        </div>
    }
}