// React
import { useEffect, useState } from "react";

// Installed packages
import Device, { DeviceSizeCategory } from "@vieolo/device-js";

// Types
import { ScreenSizeType } from "../types/types";


export function useScreenSize() {

    let allSizes: { [size in DeviceSizeCategory]: ScreenSizeType } = {
        [DeviceSizeCategory.mobile]: 'sm',
        [DeviceSizeCategory.tablet]: 'md',
        [DeviceSizeCategory.laptop]: 'lg',
        [DeviceSizeCategory.desktop]: 'xl'
    }

    let [size, setSize] = useState<ScreenSizeType>(allSizes[Device.sizeCategory()])

    useEffect(() => {
        function handleResize() {
            setSize(allSizes[Device.sizeCategory()])
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return size
}