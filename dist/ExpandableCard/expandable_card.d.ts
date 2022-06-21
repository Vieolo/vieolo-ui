/// <reference types="react" />
import { RowStyleType } from "../types/types";
export default function ExpandableCard(props: {
    /**
     * The expandable card is stateful. Meaning that it will control it's collapse or expansion
     * This prop sets the initial state
     */
    initialState?: 'expanded' | 'collapsed';
    /**
     * The optional callback when the card is expanded.
     * Implementing this callback is not necessary for the actual expansion of the card
     */
    onStateChange?: (s: 'expanded' | 'collapsed') => void;
    state?: "expanded" | "collapsed";
    /** The title displayed in the header of the card */
    title: string;
    /** The style of the card when collapsed */
    collapsedCardStyle?: RowStyleType;
    /** The style of the card when expanded */
    expandedCardStyle?: RowStyleType;
    /**
     * The components appearing on the right side of the card when collapsed
     */
    actions?: React.ReactNode;
    children?: React.ReactNode;
    ariaLabel?: string;
}): JSX.Element;
