import { ScreenSizeType } from "../types/types";

export function getNextScreenSize(currentSize: ScreenSizeType) : ScreenSizeType {
    let sizes: ScreenSizeType[] = ['xl', 'lg', 'md', 'sm'] 
    let index = sizes.indexOf(currentSize)
    if (index === 0) return 'xl' 
    return sizes[index - 1]
}