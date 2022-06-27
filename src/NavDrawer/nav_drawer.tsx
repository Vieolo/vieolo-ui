// Vieolo UI
import Flex from "../Flex"
import Spacer from "../Spacer"
import Typography from "../Typography"

export type DrawerItem = {
    title: string,
    icon?: React.ReactNode,
    selected?: boolean,
    href?: string,
    onClick?: () => void
}

export default function NavDrawer(props: {
    state: 'open' | 'closed',
    topContent?: React.ReactNode,
    mainItems: DrawerItem[],
    bottomItems?: DrawerItem[],
    onDrawerClose: () => void
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
                            return <NavDrawerItem item={z} key={z.title} />
                        })
                    }
                </Flex>

                <Flex direction="column">
                    {
                        (props.bottomItems || []).map(z => {
                            return <NavDrawerItem item={z} key={z.title} />
                        })
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


function NavDrawerItem(props: { item: DrawerItem }) {
    let t = <Flex alignItems="center" columnGap="one">
        {
            props.item.icon && props.item.icon
        }
        <Typography text={props.item.title} fontWeight='bold' />
    </Flex>
    let c = `vieolo-nav-drawer__item vieolo-nav-drawer__item--${props.item.selected ? "selected" : "not-selected"}`

    if (props.item.href) {
        return <a href={props.item.href} className={c}>
            {t}
        </a>
    } else {
        return <div className={c} onClick={props.item.onClick}>
            {t}
        </div>
    }
}