// Vieolo UI
import Flex from "../Flex"
import Spacer from "../Spacer"
import Typography from "../Typography"

export type DrawerItem = {
    title: string,
    icon?: React.ReactNode,
    selected?: boolean,
    href?: string,
    onClick?: () => void,
    height?: 'medium' | 'large' | 'small',
    newGroup?: boolean
}

export default function NavDrawer(props: {
    state: 'open' | 'closed',
    topContent?: React.ReactNode,
    mainItems: DrawerItem[],
    bottomItems?: DrawerItem[],
    onDrawerClose: () => void,
    footPrint?: React.ReactNode,
    /** Defaults to two */
    itemPaddingLeft?: 'none' | 'half' | 'one' | 'two'
}) {
    return <div className={`vieolo-nav-drawer`}>
        <div className={`vieolo-nav-drawer__drawer vieolo-nav-drawer__drawer--${props.state}`}>
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
                            return <NavDrawerItem item={z} key={z.title} paddingLeft={props.itemPaddingLeft} />
                        })
                    }
                </Flex>

                <Flex direction="column">
                    {
                        (props.bottomItems || []).map(z => {
                            return <NavDrawerItem item={z} key={z.title} />
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
                    if (props.state === 'open') props.onDrawerClose()
                }}
            >

            </div>
        </div>
    </div>
}


function NavDrawerItem(props: { item: DrawerItem, paddingLeft?: 'none' | 'half' | 'one' | 'two' }) {
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