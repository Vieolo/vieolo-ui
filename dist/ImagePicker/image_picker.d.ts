import React from 'react';
import "cropperjs/dist/cropper.css";
export default function ImagePicker(props: {
    existingImage?: string | File;
    alt?: string;
    onChange: (f: File) => void;
    className?: string;
    pickerIcon?: React.ReactNode;
    cropperSetting: {
        /** default: 1:1 */
        aspectRatio?: number | "1:1" | "16:9" | "4:3" | "2:3";
        /** default: 1 */
        quality?: number;
        /**
         * default 600
         * By Inceasing the max height or max width, the resolution and size of the image increases
         */
        maxHeight?: number;
        /**
         * default: 600
         * By Inceasing the max height or max width, the resolution and size of the image increases
         */
        maxWidth?: number;
        /** default: "Crop Your Image" */
        title?: string;
        /** default: "Cancel" */
        cancelText?: string;
        /** default: "Done" */
        doneText?: string;
    };
    imageDisplay: {
        width: number;
        height: number;
        boarderRadius: string;
    };
}): JSX.Element;
