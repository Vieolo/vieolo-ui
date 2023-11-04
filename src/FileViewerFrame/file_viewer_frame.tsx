// Material UI
import ZoomInIcon from '@mui/icons-material/AddRounded';
import ZoomOutIcon from '@mui/icons-material/RemoveRounded';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import RotateLeft from '@mui/icons-material/RotateLeftRounded';
import RotateRight from '@mui/icons-material/RotateRightRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ExpandIcon from '@mui/icons-material/FullscreenRounded';

// Icons
import { ShareIcon } from '../icons/icons';

// Vieolo UI
import IconButton from "../IconButton";
import Typography from '../Typography'
import Flex from '../Flex'


type FileViewerMode = "full screen" | "embedded"


export default function FileViewerFrame(props: {
    onClose?: () => void,
    mode: FileViewerMode,
    context: FileViewerMode,
    onModeChange: (m: FileViewerMode) => void,
    page?: string,
    isLoading?: boolean,
    onZoomChange?: (c: "+" | "-") => void,
    onRotationChange?: (c: "+" | "-") => void,
    onShare: () => void,
    onDownload: () => void,
    disableDownload?: boolean,
    expandable: boolean
}) {
    

    return <div className={`vieolo-file-viewer-frame vieolo-file-viewer-frame--${props.mode.replace(" ", "-")}`}>

        <Flex>
            {
                (props.onClose || props.mode === 'full screen') &&
                <IconButton
                    size="extra-small"
                    icon={<CloseIcon />}
                    color="error"
                    disabled={!props.onClose}
                    onClick={() => {
                        if (props.context === 'embedded' && props.mode === 'full screen') {
                            props.onModeChange('embedded');
                        } else {
                            if (props.onClose) props.onClose();
                        }
                    }}
                />
            }
        </Flex>

        {
            props.page &&
            <div>
                <Typography text={props.page} />
            </div>
        }

        {
            props.onZoomChange &&
            <Flex columnGap='half'>
                <IconButton
                    size="extra-small"
                    icon={<ZoomOutIcon />}
                    onClick={() => props.onZoomChange!("-")}
                    disabled={props.isLoading}
                />

                <IconButton
                    size="extra-small"
                    icon={<ZoomInIcon />}
                    onClick={() => props.onZoomChange!("+")}
                    disabled={props.isLoading}
                />
            </Flex>
        }

        <Flex columnGap='half'>
            {
                ("share" in window.navigator) &&
                <IconButton
                    size="extra-small"
                    icon={<ShareIcon />}
                    disabled={props.isLoading}
                    onClick={async () => props.onShare()}
                />
            }

            {
                !props.disableDownload &&
                <IconButton
                    size="extra-small"
                    icon={<DownloadIcon />}
                    disabled={props.isLoading}
                    onClick={props.onDownload}
                />
            }

            {
                props.onRotationChange &&
                <>
                    <IconButton
                        size="extra-small"
                        icon={<RotateLeft />}
                        disabled={props.isLoading}
                        onClick={() => props.onRotationChange!("-")}
                    />

                    <IconButton
                        size="extra-small"
                        icon={<RotateRight />}
                        disabled={props.isLoading}
                        onClick={() => props.onRotationChange!("+")}
                    />
                </>
            }

            {
                (props.expandable && props.context === 'embedded') &&
                <IconButton
                    size="extra-small"
                    icon={<ExpandIcon />}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (props.mode === 'embedded') {
                            props.onModeChange("full screen");
                        }
                        else {
                            props.onModeChange('embedded');
                        }
                    }}
                />
            }
        </Flex>


    </div>
}
