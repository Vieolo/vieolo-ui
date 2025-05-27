/// <reference types="react" />
export default function Anchor(props: {
    href: string;
    children?: React.ReactNode;
    className?: string;
    /**
     * If this value is true, the link is opened in a new tab.
     * If the value is false or omitted, the `onClick` function of `a` is manually controlled and the `href` will be
     * pushed to the history stack
     */
    openInNewTab?: boolean;
    ariaLabel?: string;
    /**
     * The aria role of the element.
     * This type is fixed and taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
     * The default value is `link`
     */
    ariaRole?: 'button' | 'checkbox' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option' | 'radio' | 'switch' | 'tab' | 'treeitem' | 'link';
}): JSX.Element;
