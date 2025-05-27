import { jsx as _jsx } from "react/jsx-runtime";
// React
import { useHistory } from "react-router-dom";
export default function Anchor(props) {
    let history = useHistory();
    let finalLink = props.href;
    // If the `href` is a relative path
    if (!finalLink.toLowerCase().startsWith("http")) {
        // If the relative path does not start with a slash, it will be added
        if (finalLink[0] !== "/" && finalLink[0] !== "#")
            finalLink = `/${finalLink}`;
    }
    // If the link is to be opened in a new tab, the target should be set to `_blank`
    // By doing so, you also need to set the `rel` to `noreferrer`
    // However, setting these values conditionally, will not remove the react's alert
    // So, they are returned separately
    if (props.openInNewTab) {
        return _jsx("a", { className: props.className, href: finalLink, target: '_blank', rel: 'noreferrer', "aria-label": props.ariaLabel, role: props.ariaRole, children: props.children });
    }
    return _jsx("a", { className: props.className, href: finalLink, "aria-label": props.ariaLabel, role: props.ariaRole, onClick: e => {
            if (!props.openInNewTab) {
                e.stopPropagation();
                e.preventDefault();
                history.push(finalLink);
            }
        }, children: props.children });
}
