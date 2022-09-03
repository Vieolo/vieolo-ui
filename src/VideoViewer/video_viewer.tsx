import Modal from "../Modal"

export default function VideoViewer(props: {
    file: string | File,
    context: 'embedded' | 'full screen',
    onClose?: () => void
}) {

    let video = <video 
        src={typeof props.file === 'string' ? props.file : window.URL.createObjectURL(props.file)} 
        controls
    />

    if (props.context === 'full screen') return <Modal onClose={() => {if (props.onClose) props.onClose()}}>
        {video}
    </Modal>
    
    return <div className={`vieolo-video-viewer vieolo-video-viewer--${props.context}`}>
        {video}
    </div>
}