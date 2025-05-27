/// <reference types="react" />
export declare function handleOnKeyDown(e: React.KeyboardEvent<HTMLDivElement>, options: {
    onEnter?: (k: 'Space' | 'Enter') => void;
    onArrowDown?: () => void;
    onArrowUp?: () => void;
    onEscape?: () => void;
    onTab?: () => void;
    onBackspace?: () => void;
    onAlphaNumeric?: () => void;
}): void;
