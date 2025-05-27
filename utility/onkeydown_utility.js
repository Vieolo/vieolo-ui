export function handleOnKeyDown(e, options) {
    if (e.code === "Enter" || e.code === "Space") {
        if (options.onEnter)
            options.onEnter(e.code);
    }
    else if (e.code === "ArrowDown") {
        if (options.onArrowDown)
            options.onArrowDown();
    }
    else if (e.code === "ArrowUp") {
        if (options.onArrowUp)
            options.onArrowUp();
    }
    else if (e.code === "Escape") {
        if (options.onEscape)
            options.onEscape();
    }
    else if (e.code === "Tab") {
        if (options.onTab)
            options.onTab();
    }
    else if (e.code === "Backspace") {
        if (options.onBackspace)
            options.onBackspace();
    }
    else {
        let key = e.key.trim().toLowerCase();
        const isLetter = (key.length === 1 && key >= 'a' && key <= 'z');
        const isNumber = (key.length === 1 && key >= '0' && key <= '9');
        if (isLetter || isNumber) {
            if (options.onAlphaNumeric)
                options.onAlphaNumeric();
        }
    }
}
