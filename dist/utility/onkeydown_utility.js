export function handleOnKeyDown(e, options) {
    if (e.code === "Enter" || e.code === "Space") {
        if (options.onEnter)
            options.onEnter();
    }
    if (e.code === "ArrowDown") {
        if (options.onArrowDown)
            options.onArrowDown();
    }
    if (e.code === "ArrowUp") {
        if (options.onArrowUp)
            options.onArrowUp();
    }
    if (e.code === "Escape") {
        if (options.onEscape)
            options.onEscape();
    }
    if (e.code === "Tab") {
        if (options.onTab)
            options.onTab();
    }
    if (e.code === "Backspace") {
        if (options.onBackspace)
            options.onBackspace();
    }
}