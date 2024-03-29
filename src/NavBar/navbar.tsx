// React
import { useState } from "react";

// Vieolo UI
import Card from "../Card"
import Flex from "../Flex"
import IconButton from "../IconButton"
import Typography from "../Typography";
import Input from "../Input";

// Material UI
import MenuIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';

// Types
import { ElevationType } from "../types"

export default function Navbar(props: {
    elevation?: ElevationType,
    logo?: React.ReactNode,
    title?: string,
    /** The URL that the user is redirected to when clicked on the logo */
    logoRedirectURL?: string,
    hasDrawerButton?: boolean,
    drawerButton?: React.ReactNode,
    onDrawerButtonClicked?: () => void,
    onSearchSubmit?: (query: string) => void,
    rightComponents?: React.ReactNode[],
    searchPlaceholder?: string,
    drawerState?: 'open' | 'close',
    alwaysOpen?: {
        responsiveBreakpoint: 'xl' | 'lg' | 'md' | 'sm'
    }
}) {

    let [query, setQuery] = useState<string>("");

    let logo;

    if (props.logo && props.logoRedirectURL) {
        logo = <a href={props.logoRedirectURL}>{props.logo}</a>
    } else if (props.logo) {
        logo = props.logo
    }
    
    let c = 'vieolo-navbar';

    if (props.alwaysOpen) {
        c += ` vieolo-navbar--with-always-open-drawer vieolo-navbar--with-always-open-drawer--responsive-${props.alwaysOpen.responsiveBreakpoint}`
    }

    return <Card elevation={props.elevation} className={c} borderRadius="none">
        <Flex justifyContent="space-between" alignItems="center" className="height--pc-100">
            <Flex alignItems="center" columnGap="one">
                {
                    (props.hasDrawerButton) &&
                    <div className="vieolo-navbar__drawer-button">
                        {
                            props.drawerButton ||
                            <IconButton
                                icon={props.drawerState === 'open' ? <CloseIcon /> : <MenuIcon />}
                                color='primary'
                                emphasis="none"
                                onClick={() => {
                                    if (props.onDrawerButtonClicked) props.onDrawerButtonClicked();
                                }}
                            />
                        }
                    </div>
                }

                {
                    logo && logo
                }

                {
                    props.title &&
                    <Typography text={props.title} type='title-medium' />
                }
            </Flex>

            <Flex direction="row-reverse" alignItems="center" columnGap="one">
                {
                    props.rightComponents
                }

                {
                    props.onSearchSubmit &&
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            if (query.trim()) {
                                props.onSearchSubmit!(query)
                            }
                        }}
                    >
                        <Input
                            error={false}
                            value={query}
                            onChange={v => setQuery(v)}
                            size={"medium"}
                            placeholder={props.searchPlaceholder || 'Search...'}
                        />
                    </form>
                }
            </Flex>
        </Flex>
    </Card >
}