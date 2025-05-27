import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Vieolo UI
import FormDialog from '../FormDialog';
import FileInput from '../FileInput';
// Installed Packages
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";
export default function ImagePicker(props) {
    let [croppingFile, setCroppingFile] = useState(undefined);
    let ar = 1;
    if (props.cropperSetting.aspectRatio) {
        if (typeof props.cropperSetting.aspectRatio === 'number')
            ar = props.cropperSetting.aspectRatio;
        // Calculating the predefined aspect ratios
        else {
            let s = props.cropperSetting.aspectRatio.split(":").map(z => +z);
            ar = s[0] / s[1];
        }
    }
    return _jsxs(_Fragment, { children: [_jsxs("div", { className: `vieolo-image-picker vieolo-image-picker--${props.existingImage ? "full" : "empty"} ${props.className || ''}`, style: { height: props.imageDisplay.height, width: props.imageDisplay.width }, children: [props.existingImage &&
                        _jsx("img", { src: typeof props.existingImage === 'string' ? props.existingImage : URL.createObjectURL(props.existingImage), alt: props.alt, width: props.imageDisplay.width, height: props.imageDisplay.height, style: { borderRadius: props.imageDisplay.boarderRadius } }), _jsx(FileInput, { style: { height: props.imageDisplay.height, width: props.imageDisplay.width, borderRadius: props.imageDisplay.boarderRadius }, onChange: async (f) => {
                            let fz = f.item(0);
                            let fileToBase64 = (await import("@vieolo/file-management/convertors")).fileToBase64;
                            let u = await fileToBase64(fz);
                            setCroppingFile({ file: fz, base: u });
                        }, onError: e => { }, 
                        // accept={"image/*"}
                        icon: props.pickerIcon })] }), croppingFile &&
                _jsx(ImageCropper, { image: croppingFile.base, onCrop: b => {
                        props.onChange(new File([b], croppingFile.file.name.toLowerCase().replace(".png", ".jpg")));
                        setCroppingFile(undefined);
                    }, onCancel: () => setCroppingFile(undefined), returnType: 'blob', aspectRatio: ar, quality: props.cropperSetting.quality === undefined ? 1 : props.cropperSetting.quality, maxHeight: props.cropperSetting.maxHeight === undefined ? 600 : props.cropperSetting.maxHeight, maxWidth: props.cropperSetting.maxWidth === undefined ? 600 : props.cropperSetting.maxWidth, cancelText: props.cropperSetting.cancelText, doneText: props.cropperSetting.doneText, title: props.cropperSetting.title })] });
}
function ImageCropper(props) {
    let [cropper, setCropper] = useState(null);
    return _jsx(FormDialog, { headerTitle: props.title || 'Crop your image', onCancel: props.onCancel, className: 'width--vw-90 max-width--px-500', onSave: () => {
            let canvas = cropper.getCroppedCanvas({
                maxWidth: props.maxWidth,
                maxHeight: props.maxHeight
            });
            if (props.returnType === 'base64') {
                props.onCrop(canvas.toDataURL('image/jpeg', props.quality).replace('data:image/jpeg;base64,', ''));
            }
            else {
                canvas.toBlob(b => {
                    if (b)
                        props.onCrop(b);
                }, 'image/jpeg', props.quality);
            }
        }, saveButtonDisabled: !cropper, saveButtonConfig: {
            ariaLabel: "cropper done button",
            text: props.doneText || "Done"
        }, cancelButtonConfig: {
            ariaLabel: "cropper cancel button",
            text: props.cancelText || "Cancel"
        }, children: _jsx(Cropper, { style: { height: 400, width: "100%" }, initialAspectRatio: 1, preview: ".img-preview", src: props.image, viewMode: 1, guides: true, minCropBoxHeight: 10, minCropBoxWidth: 10, background: true, responsive: true, autoCropArea: 1, checkOrientation: false, aspectRatio: props.aspectRatio, onInitialized: (instance) => {
                setCropper(instance);
            } }) });
}
