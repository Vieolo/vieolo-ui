// React
import React, { useState } from 'react';

// Vieolo UI
import FormDialog from '../FormDialog';
import FileInput from '../FileInput';

// Installed Packages
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";



export default function ImagePicker(props: {
    existingImage?: string | File,
    alt?: string,
    onChange: (f: File) => void,
    className?: string,
    pickerIcon?: React.ReactNode,
    cropperSetting: {
        /** default: 1:1 */
        aspectRatio?: number | "1:1" | "16:9" | "4:3" | "2:3",
        /** default: 1 */
        quality?: number
        /** 
         * default 600 
         * By Inceasing the max height or max width, the resolution and size of the image increases
         */
        maxHeight?: number
        /** 
         * default: 600 
         * By Inceasing the max height or max width, the resolution and size of the image increases
         */
        maxWidth?: number,
        /** default: "Crop Your Image" */
        title?: string,
        /** default: "Cancel" */
        cancelText?: string,
        /** default: "Done" */
        doneText?: string
    },
    imageDisplay: {
        width: number,
        height: number,
        boarderRadius: string,
    }
}) {

    let [croppingFile, setCroppingFile] = useState<{ file: File, base: string } | undefined>(undefined);

    let ar = 1;

    if (props.cropperSetting.aspectRatio) {
        if (typeof props.cropperSetting.aspectRatio === 'number') ar = props.cropperSetting.aspectRatio
        // Calculating the predefined aspect ratios
        else {
            let s = props.cropperSetting.aspectRatio.split(":").map(z => +z)
            ar = s[0] / s[1]
        }
    }

    return <>
        <div className={`vieolo-image-picker vieolo-image-picker--${props.existingImage ? "full" : "empty"} ${props.className || ''}`} style={{height: props.imageDisplay.height, width: props.imageDisplay.width}}>
            {
                props.existingImage &&
                <img
                    src={typeof props.existingImage === 'string' ? props.existingImage : URL.createObjectURL(props.existingImage)}
                    alt={props.alt}
                    width={props.imageDisplay.width}
                    height={props.imageDisplay.height}
                    style={{ borderRadius: props.imageDisplay.boarderRadius }}
                />
            }

            <FileInput
                style={{ height: props.imageDisplay.height, width: props.imageDisplay.width, borderRadius: props.imageDisplay.boarderRadius }}
                onChange={async f => {
                    let fz = f.item(0)
                    let fileToBase64 = (await import("@vieolo/file-management/convertors")).fileToBase64
                    let u = await fileToBase64(fz!)
                    setCroppingFile({ file: fz!, base: u })
                }}
                onError={e => { }}
                // accept={"image/*"}
                icon={props.pickerIcon}
            />
        </div>

        {
            croppingFile &&
            <ImageCropper
                image={croppingFile.base}
                onCrop={b => {
                    props.onChange(new File([b as Blob], croppingFile!.file.name.toLowerCase().replace(".png", ".jpg")))
                    setCroppingFile(undefined)
                }}
                onCancel={() => setCroppingFile(undefined)}
                returnType='blob'
                aspectRatio={ar}
                quality={props.cropperSetting.quality === undefined ? 1 : props.cropperSetting.quality}
                maxHeight={props.cropperSetting.maxHeight === undefined ? 600 : props.cropperSetting.maxHeight}
                maxWidth={props.cropperSetting.maxWidth === undefined ? 600 : props.cropperSetting.maxWidth}
                cancelText={props.cropperSetting.cancelText}
                doneText={props.cropperSetting.doneText}
                title={props.cropperSetting.title}
            />
        }
    </>
}



function ImageCropper(props: {
    onCancel: () => void,
    onCrop: (img: string | Blob) => void,
    image: string,
    quality: number,
    returnType: 'base64' | 'blob',
    maxWidth: number,
    maxHeight: number,
    aspectRatio?: number,
    title?: string,
    cancelText?: string,
    doneText?: string
}) {

    let [cropper, setCropper] = useState<Cropper | null>(null);

    return <FormDialog
        headerTitle={props.title || 'Crop your image'}
        onCancel={props.onCancel}
        className='width--vw-90 max-width--px-500'
        onSave={() => {
            let canvas = cropper!.getCroppedCanvas({
                maxWidth: props.maxWidth,
                maxHeight: props.maxHeight
            });
            if (props.returnType === 'base64') {
                props.onCrop(canvas.toDataURL('image/jpeg', props.quality).replace('data:image/jpeg;base64,', ''));
            } else {
                canvas.toBlob(
                    b => {
                        if (b) props.onCrop(b);
                    },
                    'image/jpeg',
                    props.quality
                )
            }
        }}
        saveButtonDisabled={!cropper}
        saveButtonConfig={{
            ariaLabel: "cropper done button",
            text: props.doneText || "Done"
        }}
        cancelButtonConfig={{
            ariaLabel: "cropper cancel button",
            text: props.cancelText || "Cancel"
        }}
    >
        <Cropper
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            preview=".img-preview"
            src={props.image}
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={true}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            aspectRatio={props.aspectRatio}
            onInitialized={(instance) => {
                setCropper(instance);
            }}
        />

    </FormDialog>

} 