// React
import { useHistory } from "react-router-dom"

export default function Anchor(props: {
    href: string,
    children?: React.ReactNode,
    className?: string,
    /**
     * If this value is true, the link is opened in a new tab.
     * If the value is false or omitted, the `onClick` function of `a` is manually controlled and the `href` will be
     * pushed to the history stack
     */
    openInNewTab?: boolean,
    ariaLabel?: string,
    /** 
     * The aria role of the element.
     * This type is fixed and taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
     * The default value is `link`
     */
    ariaRole?: 'button' | 'checkbox' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option' | 'radio' | 'switch' | 'tab' | 'treeitem' | 'link'
}) {

    let history = useHistory();

    let finalLink = props.href;

    // If the `href` is a relative path
    if (!finalLink.toLowerCase().startsWith("http")) {
        // If the relative path does not start with a slash, it will be added
        if (finalLink[0] !== "/" && finalLink[0] !== "#") finalLink = `/${finalLink}`
    }

    // If the link is to be opened in a new tab, the target should be set to `_blank`
    // By doing so, you also need to set the `rel` to `noreferrer`
    // However, setting these values conditionally, will not remove the react's alert
    // So, they are returned separately
    if (props.openInNewTab) {
        return <a
            className={props.className}
            href={finalLink}
            target={'_blank'}
            rel={'noreferrer'}
            aria-label={props.ariaLabel}
            role={props.ariaRole}
        >
            {props.children}
        </a>
    }

    return <a
        className={props.className}
        href={finalLink}
        aria-label={props.ariaLabel}
        role={props.ariaRole}
        onClick={e => {
            if (!props.openInNewTab) {
                e.stopPropagation();
                e.preventDefault();
                history.push(finalLink)
            }
        }}
    >
        {props.children}
    </a>
}
