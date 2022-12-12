
// React
import React, { useState } from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';

// Vieolo UI
import ImagePicker from './image_picker';

// Types
import { ViewData } from '../view/main/main';
import Spacer from '../Spacer';
import Button from '../Button';
import { downloadBlob } from '@vieolo/file-management';

type ImagePickerPropsType = React.ComponentProps<typeof ImagePicker>;

export function imagePickerOptions(): ViewData {

    return {
        constants: {

        } as Partial<ImagePickerPropsType>,
        variables: {
            cropperAspectRatio: {
                default: "1:1",
                options: ["1:1", "16:9", "4:3", "2:3"],
            }
        }
    }
}


export function ImagePickerCreator(props: { p: ImagePickerPropsType }) {
    let [file, setFile] = useState<File | undefined>(undefined)

    let car = (props.p as any).cropperAspectRatio
    let ar = car.split(":").map((z: string) => +z)
    let cof = 200

    if (car === "16:9") cof = 20
    else if (car === "4:3") cof = 80
    else if (car === "2:3") cof = 100

    return <div>
        <ImagePicker
            cropperSetting={{
                aspectRatio: car,
                title: "Custom Title",
                cancelText: "Custom Cancel",
                doneText: "Custom Done"
            }}
            existingImage={file}
            imageDisplay={{
                boarderRadius: car === "1:1" ? "50%" : "10px",
                height: ar[1] * cof,
                width: ar[0] * cof
            }}
            onChange={v => setFile(v)}
            pickerIcon={<IconOne />}
        />

        <Spacer height='two' />
        <Button
            text='Download'
            disabled={file === undefined}
            onClick={() => {
                downloadBlob(file!, file!.name)
            }}
        />
    </div>
}
