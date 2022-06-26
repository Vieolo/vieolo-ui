// Vieolo UI
import Navbar from '../NavBar';


type NavbarPropsType = React.ComponentProps<typeof Navbar>;

export default function PageFrame(props: {
    children?: React.ReactNode,
    navbar?: NavbarPropsType,
    drawer?: {

    },
}) {
    return <div className="vieolo-page-frame">
        {
            props.navbar &&
            <Navbar {...props.navbar} />
        }
        {props.children}
    </div>
}