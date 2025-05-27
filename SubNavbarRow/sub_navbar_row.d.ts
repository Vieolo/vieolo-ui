/// <reference types="react" />
import { ElevationType } from '../types';
export default function SubNavbarRow(props: {
    /**
     * The span of the middle column of the grid
     * The total span of the column is 12
     * This value represents the span of the middle value and remainder of 12 is divided to two for left and right cols
     * This value should be a multiplication of 2
     */
    midColumnSize?: number;
    elevation?: ElevationType;
    removeBackButton?: boolean;
    icon?: React.ReactNode;
    backButtonText?: string;
    onBack?: () => void;
    actions?: any[];
    center?: React.ReactNode;
}): JSX.Element;
