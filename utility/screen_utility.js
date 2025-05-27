export function getNextScreenSize(currentSize) {
    let sizes = ['xl', 'lg', 'md', 'sm'];
    let index = sizes.indexOf(currentSize);
    if (index === 0)
        return 'xl';
    return sizes[index - 1];
}
