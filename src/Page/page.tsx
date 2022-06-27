// Vieolo UI
import SubNavbarRow from "../SubNavbarRow"

type SubNavbarRowPropsType = React.ComponentProps<typeof SubNavbarRow>;

export default function Page(props: {
    hasSubNavbarRow?: boolean,
    children?: React.ReactNode,
    className?: string,
    subNavbarOptions?: SubNavbarRowPropsType
}) {
    return <div className="vieolo-page">
        {
            props.hasSubNavbarRow &&
            <SubNavbarRow  {...(props.subNavbarOptions || {})} />
        }

        <div className={`vieolo-page__content ${props.className || ""}`}>
            {props.children}
        </div>
    </div> 
}